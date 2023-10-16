'use client';
import React, {useState} from 'react';

const MatrixDisplay = () => {
    // 8は壁
    // 0は何も置いていない状態
    // 2は黒が置かれている状態
    // 1は白が置かれている状態
    const matrix = [
        [8,8,8,8,8,8,8,8,8,8,],
        [8,0,0,0,0,0,0,0,0,8],
        [8,0,0,0,0,0,0,0,0,8],
        [8,0,0,0,0,0,0,0,0,8],
        [8,0,0,0,1,2,0,0,0,8],
        [8,0,0,0,2,1,0,0,0,8],
        [8,0,0,0,0,0,0,0,0,8],
        [8,0,0,0,0,0,0,0,0,8],
        [8,0,0,0,0,0,0,0,0,8],
        [8,8,8,8,8,8,8,8,8,8,]
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
        // 盤外には置けない
        if(cell == 8){
          setMessage("そこには置けません。")
          console.log("message",message)
          console.log("player",player)
          return;
        }
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

          // ２次元配列を更新
          squares[tateIndex][yokoIndex] = 2;
          setCount(count + 1);
          setPlayer("white");
          
        } else if (player === "white" && canFlip) {

          // ２次元配列を更新
          squares[tateIndex][yokoIndex] = 1;
          setCount(count + 1);
          setPlayer("black");
        } else {
          setMessage("その場所には置けません.");
        }
        setSquares([...squares]);
      };      

      const checkBoardSituation = (cell:any, squares:any, tateIndex:any, yokoIndex:any) => {
        console.log("checkBoardSituationの現在のプレイヤーは、",player)
        
        if(player == "black"){
          const opponent = 1; // 白石
          const currentPlayer = 2; // 黒石
          let canFlip = false;

          // 上方向
          console.log("上方向のプレイヤーは、",squares[tateIndex - 1][yokoIndex])
          if (tateIndex > 1 && squares[tateIndex - 1][yokoIndex] === opponent) {
            let tate = tateIndex - 1;
            while (tate >= 0) {
              if (squares[tate][yokoIndex] === currentPlayer) {
                console.log("挟めるのを確認")
                // flipPieceに、上方向の相手の位置を渡す
                console.log("tate",tate)
                upFlipPiece(tate,yokoIndex,opponent,currentPlayer);

                canFlip = true;
                break;
              } else if (squares[tate][yokoIndex] === 0) {
                break;
              }
              tate--;
            }
          }
          // 下方向
          if (tateIndex > 1 && squares[tateIndex + 1][yokoIndex] === opponent) {
            let tate = tateIndex + 1;
            while (tate <= 9) {
              if (squares[tate][yokoIndex] === currentPlayer) {
                console.log("挟めるのを確認")
                // flipPieceに、上方向の相手の位置を渡す
                downFlipPiece(tate,yokoIndex,opponent,currentPlayer);

                canFlip = true;
                break;
              } else if (squares[tate][yokoIndex] === 0) {
                break;
              }
              tate++;
            }
          }
          // 左方向
          if (yokoIndex > 1 && squares[tateIndex][yokoIndex - 1] === opponent) {
            let yoko = yokoIndex - 1;
            while (yoko >= 0) {
              if (squares[tateIndex][yoko] === currentPlayer) {
                console.log("挟めるのを確認")
                // flipPieceに、上方向の相手の位置を渡す
                leftFlipPiece(tateIndex,yoko,opponent,currentPlayer);

                canFlip = true;
                break;
              } else if (squares[tateIndex][yoko] === 0) {
                break;
              }
              yoko--;
            }
          }
          // 右方向
          if (yokoIndex < 9 && squares[tateIndex][yokoIndex + 1] === opponent) {
            let yoko = yokoIndex + 1;
            while (yoko <= 9) {
              if (squares[tateIndex][yoko] === currentPlayer) {
                console.log("挟めるのを確認")
                // flipPieceに、上方向の相手の位置を渡す
                rightFlipPiece(tateIndex,yoko,opponent,currentPlayer);

                canFlip = true;
                break;
              } else if (squares[tateIndex][yoko] === 0) {
                break;
              }
              yoko++;
            }
          }
          // 他の方向に対しても同様に判定を行う（下、左、右、左上、右上、左下、右下）

          return canFlip;
          }
          else if(player == "white"){
            const opponent = 2; // 黒石
            const currentPlayer = 1; // 白石
            let canFlip = false;
  
            // 上方向
            if (tateIndex > 1 && squares[tateIndex - 1][yokoIndex] === opponent) {
              let tate = tateIndex - 1;
              while (tate >= 0) {
                if (squares[tate][yokoIndex] === currentPlayer) {
                  console.log("挟めるのを確認")
                  // flipPieceに、上方向の相手の位置を渡す
                  upFlipPiece(tate,yokoIndex,opponent,currentPlayer);

                  canFlip = true;
                  break;
                } else if (squares[tate][yokoIndex] === 0) {
                  break;
                }
                tate--;
              }
            }
  
            // 下方向
            if (tateIndex > 1 && squares[tateIndex + 1][yokoIndex] === opponent) {
              let tate = tateIndex + 1;
              while (tate <= 9) {
                if (squares[tate][yokoIndex] === currentPlayer) {
                  console.log("挟めるのを確認")
                  // flipPieceに、上方向の相手の位置を渡す
                  downFlipPiece(tate,yokoIndex,opponent,currentPlayer);

                  canFlip = true;
                  break;
                } else if (squares[tate][yokoIndex] === 0) {
                  break;
                }
                tate++;
              }
            }
            // 左方向
            if (yokoIndex > 1 && squares[tateIndex][yokoIndex - 1] === opponent) {
              let yoko = yokoIndex - 1;
              while (yoko >= 0) {
                if (squares[tateIndex][yoko] === currentPlayer) {
                  console.log("挟めるのを確認")
                  // flipPieceに、上方向の相手の位置を渡す
                  leftFlipPiece(tateIndex,yoko,opponent,currentPlayer);

                  canFlip = true;
                  break;
                } else if (squares[tateIndex][yoko] === 0) {
                  break;
                }
                yoko--;
              }
            }
            // 右方向
            if (yokoIndex < 9 && squares[tateIndex][yokoIndex + 1] === opponent) {
              let yoko = yokoIndex + 1;
              while (yoko <= 9) {
                if (squares[tateIndex][yoko] === currentPlayer) {
                  console.log("挟めるのを確認")
                  // flipPieceに、上方向の相手の位置を渡す
                  rightFlipPiece(tateIndex,yoko,opponent,currentPlayer);

                  canFlip = true;
                  break;
                } else if (squares[tateIndex][yoko] === 0) {
                  break;
                }
                yoko++;
              }
            }
          return canFlip;
        }

      }
      // 上方向を確認して、ひっくり返る時の関数
      const upFlipPiece = (tatePosition:any, yokoPosition:any, opponent:any, currentPlayer:any) => {
        console.log("changeするポジションは、",tatePosition + 1,":",yokoPosition)
        console.log("currentPlayerは、",currentPlayer)
        console.log("opponentは、",opponent)
          // squares[tatePosition][yokoPosition]は、自分のコマの位置なので、１つ戻すため、縦にプラス１する。
          console.log("squares[tatePosition + 1][yokoPosition]に位置するのは、currentPlayer",squares[tatePosition + 1][yokoPosition])
          squares[tatePosition + 1][yokoPosition] = currentPlayer;
          for(let i = tatePosition; tatePosition > 0; i--){
            // ここでエラーが発生する
            if(squares[i][yokoPosition] === opponent){
              squares[i][yokoPosition] = currentPlayer;
            }
          }
          setSquares([...squares]);
        }
        
      
      // 下方向を確認して、ひっくり返る時の関数
      const downFlipPiece = (tatePosition:any, yokoPosition:any, opponent:any, currentPlayer:any) => {
        console.log("changeするポジションは、",tatePosition - 1,":",yokoPosition)
          squares[tatePosition - 1][yokoPosition] = currentPlayer;
          // for(let i = tatePosition - 1; tatePosition < 7; i++){
          //   if(squares[i][yokoPosition] === opponent){
          //     squares[i][yokoPosition] = currentPlayer;
          //   }
          // }
        setSquares([...squares]);
      }
      // 右方向を確認して、ひっくり返る時の関数
      const rightFlipPiece = (tatePosition:any, yokoPosition:any, opponent:any, currentPlayer:any) => {
        console.log("changeするポジションは、",tatePosition,":",yokoPosition - 1)
          squares[tatePosition][yokoPosition - 1] =  currentPlayer;
          // for(let i = yokoPosition - 1; yokoPosition < 7; i++){
          //   if(squares[i][yokoPosition] === opponent){
          //     squares[i][yokoPosition] = currentPlayer;
          //   }
          // }

        setSquares([...squares]);
      }
      // 左方向を確認して、ひっくり返る時の関数
      const leftFlipPiece = (tatePosition:any, yokoPosition:any, opponent:any, currentPlayer:any) => {
        console.log("changeするポジションは、",tatePosition,":",yokoPosition + 1)
          squares[tatePosition][yokoPosition + 1] = currentPlayer;
          // for(let i = yokoPosition + 1; yokoPosition > 1; i--){
          //   if(squares[i][yokoPosition] === opponent){
          //     squares[i][yokoPosition] = currentPlayer;
          //   }
          // }
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
