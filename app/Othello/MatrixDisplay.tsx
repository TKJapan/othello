'use client';
import React, {useState} from 'react';

const MatrixDisplay = () => {
    // 0は何も置いていない状態
    // 2は黒が置かれている状態
    // 1は白が置かれている状態
    const matrix = [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,1,2,0,0,0],
        [0,0,0,2,1,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
    ]

    const [squares, setSquares] = useState(matrix);

    const [count, setCount] = useState(0);

    const [player, setPlayer] = useState("black");

    const [message, setMessage] = useState("");

    const tableStyle = {"backgroundColor":"green","borderWidth":"2px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'};

    const tdStyle = {"textAlign": "center" as "center","height":"4em","width":"4em","borderWidth":"2px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'};
  
    const buttonStyle = {"backgroundColor":"pink","fontColor":"black","height":"2em","width":"10em","borderWidth":"2px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'};

    const pStyle = {}

    const whiteStyle: { [key: string]: any } = {"borderRadius":"50px","backgroundColor":"white"}

    const blackStyle: { [key: string]: any } = {"borderRadius":"50px","backgroundColor":"black"}

    const ganeStart = () => {
        console.log("start")
      }

      // 白だったら配列に１を保存、黒だったら２を保存
      //黒と白を交互に変更
      const changePiece = (cell:any,tateIndex:any,yokoIndex:any) => {
        setMessage("");
        // すでに置いてあるマスには置けない
        if(cell != 0){
          setMessage("すでに置かれています。")
          console.log("message",message)
          console.log("player",player)
          return;
        }

        // checkBoardSituation の結果を受け取る
        const canFlip = checkBoardSituation(cell, squares, tateIndex, yokoIndex);

        if (player === "black" && canFlip) {
          setCount(count + 1);
          setPlayer("white");
        } else if (player === "white" && canFlip) {
          setCount(count + 1);
          setPlayer("black");
        } else {
          setMessage("その場所には置けません.");
        }
      };      

      const checkBoardSituation = (cell:any, squares:any, tateIndex:any, yokoIndex:any) => {
        console.log("checkBoardSituationの現在のプレイヤーは、",player)
        
        if(player == "black"){
          const opponent = 1; // 白石
          const currentPlayer = 2; // 黒石
          let canFlip = false;
          

          // 相手の下にコマを置いて、上方向を確認
          const oneUpPosition = -1;
          const upSideLimit = 0;

          // 置いた位置の上が0以下の場合
          // if(squares[tateIndex + oneUpPosition][yokoIndex] <= 0){
          //   return
          // }
            // 置いた縦の位置が0より大きくて、相手のコマが上にある場合
          if (tateIndex > upSideLimit && squares[tateIndex + oneUpPosition][yokoIndex] === opponent) {
            // tateWayに相手の位置を代入
            let tateWay = tateIndex + oneUpPosition;
            // 相手の位置が0より大きい間
            while (tateWay >= 0) {
              if (squares[tateWay][yokoIndex] === currentPlayer) {
                console.log("挟めるのを確認")

                // ２次元配列を更新
                squares[tateIndex][yokoIndex] = currentPlayer;
                setSquares([...squares]);
                

                // flipPieceに、相手の位置を渡す
                console.log("tateWayは、自分のコマの位置",tateWay)
                upFlipPiece(tateWay,yokoIndex,opponent,currentPlayer);

                canFlip = true;
                break;
              } else if (squares[tateWay][yokoIndex] === 0) {
                break;
              }
              tateWay--;
            }
          }
          
          
          // 相手の上にコマを置いて、下方向を確認
          const oneDownPosition = +1;
          const downSideLimit = 7;
          // 置いた縦の位置が7より小さくて、相手のコマが下にある場合
          if (tateIndex < downSideLimit && squares[tateIndex + 1][yokoIndex] === opponent) {
            // tateWayに相手の位置を代入
            let tateWay = tateIndex + oneDownPosition;
            // 相手の位置が7より小さい間
            while (tateWay <=  7) {
              if (squares[tateWay][yokoIndex] === currentPlayer) {
                console.log("挟めるのを確認")

                // ２次元配列を更新
                squares[tateIndex][yokoIndex] = currentPlayer;
                setSquares([...squares]);

                // flipPieceに、相手の位置を渡す
                console.log("tateWayは、自分のコマの位置",tateWay)
                downFlipPiece(tateWay,yokoIndex,opponent,currentPlayer);

                canFlip = true;
                break;
              } else if (squares[tateWay][yokoIndex] === 0) {
                break;
              }
              tateWay++;
            }
          }
          // 相手の右にコマを置いて、左方向を確認
          // 置いた横の位置が1より大きくて、相手のコマが左にある場合
          if (yokoIndex > 1 && squares[tateIndex][yokoIndex - 1] === opponent) {
            // yokoWayに相手の位置を代入
            let yokoWay = yokoIndex - 1;
            while (yokoWay >= 0) {
              if (squares[tateIndex][yokoWay] === currentPlayer) {
                console.log("挟めるのを確認")

                // ２次元配列を更新
                squares[tateIndex][yokoIndex] = currentPlayer;
                setSquares([...squares]);

                // flipPieceに、上方向の相手の位置を渡す
                leftFlipPiece(tateIndex,yokoWay,opponent,currentPlayer);

                canFlip = true;
                break;
              } else if (squares[tateIndex][yokoWay] === 0) {
                break;
              }
              yokoWay--;
            }
          }
          // 相手の左にコマを置いて、右方向を確認
          // 置いた横の位置が7より小さくて、相手のコマが右にある場合
          if (yokoIndex < 7 && squares[tateIndex][yokoIndex + 1] === opponent) {
            let yokoWay = yokoIndex + 1;
            while (yokoWay <= 7) {
              if (squares[tateIndex][yokoWay] === currentPlayer) {
                console.log("挟めるのを確認")

                // ２次元配列を更新
                squares[tateIndex][yokoIndex] = currentPlayer;
                setSquares([...squares]);

                // flipPieceに、上方向の相手の位置を渡す
                rightFlipPiece(tateIndex,yokoWay,opponent,currentPlayer);

                canFlip = true;
                break;
              } else if (squares[tateIndex][yokoWay] === 0) {
                break;
              }
              yokoWay++;
            }
          }
          // 他の方向に対しても同様に判定を行う（下、左、右、左上、右上、左下、右下）

          return canFlip;
          }
          else if(player == "white"){
            const opponent = 2; // 黒石
            const currentPlayer = 1; // 白石
            let canFlip = false;
  
            // 相手の下にコマを置いて、上方向を確認
            // 置いた縦の位置が0より大きくて、相手のコマが上にある場合
            if (tateIndex > 0 && squares[tateIndex - 1][yokoIndex] === opponent) {
              let tateWay = tateIndex - 1;
              while (tateWay >= 0) {
                if (squares[tateWay][yokoIndex] === currentPlayer) {
                  console.log("挟めるのを確認")

                  // ２次元配列を更新
                squares[tateIndex][yokoIndex] = currentPlayer;
                setSquares([...squares]);

                  // flipPieceに、上方向の相手の位置を渡す
                  upFlipPiece(tateWay,yokoIndex,opponent,currentPlayer);

                  canFlip = true;
                  break;
                } else if (squares[tateWay][yokoIndex] === 0) {
                  break;
                }
                tateWay--;
              }
            }
  
            // 相手の上にコマを置いて、下方向を確認
            // 置いた縦の位置が7より小さくて、相手のコマが下にある場合
            if (tateIndex < 7 && squares[tateIndex + 1][yokoIndex] === opponent) {
              let tateWay = tateIndex + 1;
              while (tateWay <= 7) {
                if (squares[tateWay][yokoIndex] === currentPlayer) {
                  console.log("挟めるのを確認")

                  // ２次元配列を更新
                  squares[tateIndex][yokoIndex] = currentPlayer;
                  setSquares([...squares]);

                  // flipPieceに、上方向の相手の位置を渡す
                  downFlipPiece(tateWay,yokoIndex,opponent,currentPlayer);

                  canFlip = true;
                  break;
                } else if (squares[tateWay][yokoIndex] === 0) {
                  break;
                }
                tateWay++;
              }
            }
            // 相手の右にコマを置いて、左方向を確認
            // 置いた横の位置が1より大きくて、相手のコマが左にある場合
            if (yokoIndex > 1 && squares[tateIndex][yokoIndex - 1] === opponent) {
              let yokoWay = yokoIndex - 1;
              while (yokoWay >= 0) {
                if (squares[tateIndex][yokoWay] === currentPlayer) {
                  console.log("挟めるのを確認")

                  // ２次元配列を更新
                  squares[tateIndex][yokoIndex] = currentPlayer;
                  setSquares([...squares]);

                  // flipPieceに、相手の位置を渡す
                  leftFlipPiece(tateIndex,yokoWay,opponent,currentPlayer);

                  canFlip = true;
                  break;
                } else if (squares[tateIndex][yokoWay] === 0) {
                  break;
                }
                yokoWay--;
              }
            }
            // 相手の左にコマを置いて、右方向を確認
            // 置いた横の位置が7より小さくて、相手のコマが右にある場合
            if (yokoIndex < 7 && squares[tateIndex][yokoIndex + 1] === opponent) {
              let yokoWay = yokoIndex + 1;
              while (yokoWay <= 7) {
                if (squares[tateIndex][yokoWay] === currentPlayer) {
                  console.log("挟めるのを確認")

                  // ２次元配列を更新
                  squares[tateIndex][yokoIndex] = currentPlayer;
                  setSquares([...squares]);

                  // flipPieceに相手の位置を渡す
                  rightFlipPiece(tateIndex,yokoWay,opponent,currentPlayer);

                  canFlip = true;
                  break;
                } else if (squares[tateIndex][yokoWay] === 0) {
                  break;
                }
                yokoWay++;
              }
            }
          return canFlip;
        }

      }
      // 相手の下にコマを置いて、上方向を確認して、ひっくり返る時の関数
      const upFlipPiece = (myTatePosition:any, myYokoPosition:any, opponent:any, currentPlayer:any) => {
        console.log("upFlipPiece開始")
        console.log("changeするポジションは、",myTatePosition - 1,":",myYokoPosition)

          // squares[tatePosition][yokoPosition]は、自分のコマの位置なので、１つ戻すため、縦にプラス１する。
          // squares[myTatePosition + 1][myYokoPosition] = currentPlayer;
          

          // 見つかった自分は、一番上の自分のコマなので、上から下に見ていく必要がある。
          const flipDownWay = 7;
          console.log("myTatePosition:",myTatePosition)
          for(let i = myTatePosition + 1; myTatePosition < flipDownWay; i++){
            console.log("for文: i:",i,":myYokoPosition:",myYokoPosition)
            console.log("ループ:",squares[i][myYokoPosition])
            if(squares[i][myYokoPosition] === opponent){
              
              squares[i][myYokoPosition] = currentPlayer;
              console.log("ひっくり返る場所",squares[i][myYokoPosition])
              
            }
            else{
              break;
            }
          }
          setSquares([...squares]);
        }
        
      
      // 下方向を確認して、ひっくり返る時の関数
      const downFlipPiece = (myTatePosition:any, myYokoPosition:any, opponent:any, currentPlayer:any) => {
        console.log("downFlipPiece開始")
        console.log("changeするポジションは、",myTatePosition - 1,":",myYokoPosition)
        // squares[tatePosition][yokoPosition]は、自分のコマの位置なので、１つ戻すため、縦-１する。
          

          // 見つかった自分は、一番下の自分のコマなので、下から上に見ていく必要がある。
          const flipUpWay = 0;
          for(let i = myTatePosition - 1; myTatePosition > flipUpWay; i--){
            console.log("for文: i:",i,":myYokoPosition:",myYokoPosition)
            if(squares[i][myYokoPosition] === opponent){
              console.log("ループ:",i)
              squares[i][myYokoPosition] = currentPlayer;
              setSquares([...squares]);
            }
            else{
              break;
            }
          }
          setSquares([...squares]);
      }
      // 相手の左にコマを置いて、右方向を確認して、ひっくり返る時の関数
      const rightFlipPiece = (myTatePosition:any, myYokoPosition:any, opponent:any, currentPlayer:any) => {
        console.log("rightFlipPiece開始")
        console.log("changeするポジションは、",myTatePosition,":",myYokoPosition - 1)
        // squares[tatePosition][yokoPosition]は、自分のコマの位置なので、１つ戻すため、横に-１する。
          

          // 見つかった自分は、一番右の自分のコマなので、右から左に見ていく必要がある。
          const flipRightWay = 0;
          for(let i = myYokoPosition - 1; myYokoPosition > flipRightWay; i--){
            console.log("for文: myTatePosition:", myTatePosition," :i: ",i)
            if(squares[myTatePosition][i] === opponent){
              console.log("ループ:",i)
              squares[myTatePosition][i] = currentPlayer;
              setSquares([...squares]);
            }
            else{
              break;
            }
          }
          setSquares([...squares]);
      }
      // 左方向を確認して、ひっくり返る時の関数
      const leftFlipPiece = (myTatePosition:any, myYokoPosition:any, opponent:any, currentPlayer:any) => {
        console.log("leftFlipPiece開始")
        console.log("changeするポジションは、",myTatePosition,":",myYokoPosition + 1)
        // squares[tatePosition][yokoPosition]は、自分のコマの位置なので、１つ戻すため、横に+１する。
          

          // 見つかった自分は、一番左の自分のコマなので、左から右に見ていく必要がある。
          const flipLeftWay = 7;
          for(let i = myYokoPosition + 1; myYokoPosition < flipLeftWay; i++){
            console.log("for文: myTatePosition:", myTatePosition," :i: ",i)
            if(squares[myTatePosition][i] === opponent){
              console.log("ループ:",i)
              squares[myTatePosition][i] = currentPlayer;
              setSquares([...squares]);
            }
            else{
              break;
            }
          }
          setSquares([...squares]);
      }
        
  return (
    <div>
    <button onClick={ganeStart}style={buttonStyle}>ゲーム開始</button>
    <p style={pStyle}>現在のプレイヤー：{player}</p>
    <p style={pStyle}>メッセージ：{message}</p>
    <br /><br />
      <table style={tableStyle}>
        <tbody>
          {squares.map((row: any, tateIndex: any) => (
            <tr key={tateIndex}>
              {row.map((cell: any, yokoIndex: any) => (
                <td style={tdStyle} key={yokoIndex} onClick={() => {
                  changePiece(cell,tateIndex,yokoIndex); console.log("clicked",tateIndex,yokoIndex,"cellは",cell)} }>
                    <span>{cell}</span></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatrixDisplay;
