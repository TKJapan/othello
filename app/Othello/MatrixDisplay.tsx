'use client';
import React, {useState, useEffect} from 'react';

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

    const tableStyle = {backgroundColor:"#00BF64",borderWidth:"2px", borderColor:"#aaaaaa", borderStyle:'solid'};

    const tdStyle = {textAlign: "center" as "center",height:"4em",width:"4em",borderWidth:"2px", borderColor:"#aaaaaa", borderStyle:'solid'};
  
    const buttonStyle = {backgroundColor:"pink",fontColor:"black",height:"2em",width:"10em",borderWidth:"2px", borderColor:"#aaaaaa", borderStyle:'solid'};

    const pStyle = {}

    const imgStyle = { width:"60px", display:"flex", alignItems:"center", justifyContent:"center"}



    const pass = () => {
      if (player === "black") {

        setPlayer("white");
      } 
      else if (player === "white") {
        
        setPlayer("black");
      } 
      setCount(count + 1);
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
        const canFlip = checkBoardSituation(squares, tateIndex, yokoIndex);
        console.log("canFlip",canFlip)

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

      const checkBoardSituation = (squares:any, tateIndex:any, yokoIndex:any) => {
        console.log("checkBoardSituationの現在のプレイヤーは、",player)
        
        if(player == "black"){
          const opponent = 1; // 白石
          const currentPlayer = 2; // 黒石
          let canFlip = false;
          

          // 相手の下にコマを置いて、上方向を確認
          const oneUpPosition = -1;
          const upSideLimit = 0;

            // 置いた縦の位置が0より大きくて、相手のコマが上にある場合
          if(tateIndex != 0){
            console.log("相手の下にコマを置いて、上方向を確認")
            if (tateIndex > upSideLimit && squares[tateIndex + oneUpPosition][yokoIndex] === opponent) {
              // upperOpponentPositionに相手の位置を代入
              let upperOpponentPosition = tateIndex + oneUpPosition;
              // 相手の位置が0より大きい間
              while (upperOpponentPosition >= upSideLimit) {
                if (squares[upperOpponentPosition][yokoIndex] === currentPlayer) {
                  console.log("挟めるのを確認")

                  // ２次元配列を更新
                  squares[tateIndex][yokoIndex] = currentPlayer;
                  console.log("置いた位置　縦：",tateIndex,"横：",yokoIndex)
                  setSquares([...squares]);
                  

                  // flipPieceに、自分の位置を渡す
                  upFlipPiece(upperOpponentPosition,yokoIndex,opponent,currentPlayer,tateIndex);

                  canFlip = true;

                } else if (squares[upperOpponentPosition][yokoIndex] === 0) {
                  break;
                }
                upperOpponentPosition--;
              }
            }
          }
          
          
          // 相手の上にコマを置いて、下方向を確認
          const oneDownPosition = 1;
          const downSideLimit = 7;
          if(tateIndex != 7){
            console.log("相手の上にコマを置いて、下方向を確認")
            // 置いた縦の位置が7より小さくて、相手のコマが下にある場合
            if (tateIndex < downSideLimit && squares[tateIndex + oneDownPosition][yokoIndex] === opponent) {
              // downOpponentPositionに相手の位置を代入
              let downOpponentPosition = tateIndex + oneDownPosition;
              // 相手の位置が7より小さい間
              while (downOpponentPosition <=  downSideLimit) {
                if (squares[downOpponentPosition][yokoIndex] === currentPlayer) {
                  console.log("挟めるのを確認")

                  // ２次元配列を更新
                  squares[tateIndex][yokoIndex] = currentPlayer;
                  console.log("置いた位置　縦：",tateIndex,"横：",yokoIndex)
                  setSquares([...squares]);

                  // flipPieceに、自分の位置を渡す
                  downFlipPiece(downOpponentPosition,yokoIndex,opponent,currentPlayer,tateIndex);

                  canFlip = true;

                } else if (squares[downOpponentPosition][yokoIndex] === 0) {
                  break;
                }
                downOpponentPosition++;
              }
            }
          }
          // 相手の右にコマを置いて、左方向を確認
          const oneLeftPosition = -1;
          const leftSideLimit = 0;
          // 置いた横の位置が0より大きくて、相手のコマが左にある場合
          if(yokoIndex != 0){
            console.log("相手の右にコマを置いて、左方向を確認")
            if (yokoIndex > leftSideLimit && squares[tateIndex][yokoIndex + oneLeftPosition] === opponent) {
              // leftOpponentPositionに相手の位置を代入
              let leftOpponentPosition = yokoIndex + oneLeftPosition;
              while (leftOpponentPosition >= leftSideLimit) {
                // 左方向に自分のコマがあった場合
                if (squares[tateIndex][leftOpponentPosition] === currentPlayer) {
                  console.log("挟めるのを確認")

                  // ２次元配列を更新
                  squares[tateIndex][yokoIndex] = currentPlayer;
                  console.log("置いた位置　縦：",tateIndex,"横：",yokoIndex)
                  setSquares([...squares]);

                  // flipPieceに、自分の位置を渡す
                  leftFlipPiece(tateIndex,leftOpponentPosition,opponent,currentPlayer,yokoIndex);

                  canFlip = true;

                } else if (squares[tateIndex][leftOpponentPosition] === 0) {
                  break;
                }
                leftOpponentPosition--;
              }
            }
          }
          // 相手の左にコマを置いて、右方向を確認
          const oneRightPosition = 1;
          const rightSideLimit = 7;
          // 置いた横の位置が7より小さくて、相手のコマが右にある場合
          if(yokoIndex != 7){
            console.log("相手の左にコマを置いて、右方向を確認")
            if (yokoIndex < rightSideLimit && squares[tateIndex][yokoIndex + oneRightPosition] === opponent) {
              let rightOpponentPosition = yokoIndex + oneRightPosition;
              while (rightOpponentPosition <= rightSideLimit) {
                if (squares[tateIndex][rightOpponentPosition] === currentPlayer) {
                  console.log("挟めるのを確認")

                  // ２次元配列を更新
                  squares[tateIndex][yokoIndex] = currentPlayer;
                  console.log("置いた位置　縦：",tateIndex,"横：",yokoIndex)
                  setSquares([...squares]);

                  // flipPieceに、自分の位置を渡す
                  rightFlipPiece(tateIndex,rightOpponentPosition,opponent,currentPlayer,yokoIndex);

                  canFlip = true;

                } else if (squares[tateIndex][rightOpponentPosition] === 0) {
                  break;
                }
                rightOpponentPosition++;
              }
            }
          }
          // 相手の右下にコマを置いて、左上方向を確認
          const upperLeftPositionTate = - 1;
          const upperLeftPositionYoko = - 1;
          const upperLeftLimitTate = 0;
          const upperLeftLimitYoko = 0;

            // 相手のコマが左上にある場合
          if(!(tateIndex <= 0 || yokoIndex <= 0)){
            console.log("相手の右下にコマを置いて、左上方向を確認")
            if (squares[tateIndex + upperLeftPositionTate][yokoIndex + upperLeftPositionYoko] === opponent) {
              // 相手の位置を代入
              let upperLeftOpponentPositionTate = tateIndex + upperLeftPositionTate;
              let upperLeftOpponentPositionYoko = yokoIndex + upperLeftPositionYoko;
              // 相手の位置が縦列か横列の0より大きい間
              while (upperLeftOpponentPositionTate >= upperLeftLimitTate && upperLeftOpponentPositionYoko > upperLeftLimitYoko) {
                if (squares[upperLeftOpponentPositionTate][upperLeftOpponentPositionYoko] === currentPlayer) {
                  console.log("挟めるのを確認")

                  // ２次元配列を更新
                  squares[tateIndex][yokoIndex] = currentPlayer;
                  console.log("置いた位置　縦：",tateIndex,"横：",yokoIndex)
                  setSquares([...squares]);
                  

                  // flipPieceに、自分の位置を渡す
                  console.log("opponent",opponent)
                  upperLeftFlipPiece(upperLeftOpponentPositionTate,upperLeftOpponentPositionYoko,opponent,currentPlayer,tateIndex,yokoIndex);

                  canFlip = true;

                } else if (squares[upperLeftOpponentPositionTate][upperLeftOpponentPositionYoko] === 0) {
                  break;
                }
                upperLeftOpponentPositionTate--;
                upperLeftOpponentPositionYoko--
              }
            }
          }
          // 相手の左下にコマを置いて、右上方向を確認
          const upperRightPositionTate = - 1;
          const upperRightPositionYoko = + 1;
          const upperRightLimitTate = 0;
          const upperRightLimitYoko = 7;

            // 相手のコマが左上にある場合
          if(!(tateIndex <= 0 || yokoIndex >= 7)){
            console.log("相手の左下にコマを置いて、右上方向を確認")
            if (squares[tateIndex + upperRightPositionTate][yokoIndex + upperRightPositionYoko] === opponent) {
              // 相手の位置を代入
              let upperRightOpponentPositionTate = tateIndex + upperRightPositionTate;
              let upperRightOpponentPositionYoko = yokoIndex + upperRightPositionYoko;
              // 相手の位置が縦列か横列の0より大きい間
              while (upperRightOpponentPositionTate >= upperRightLimitTate && upperRightOpponentPositionYoko <= upperRightLimitYoko) {
                if (squares[upperRightOpponentPositionTate][upperRightOpponentPositionYoko] === currentPlayer) {
                  console.log("挟めるのを確認")

                  // ２次元配列を更新
                  squares[tateIndex][yokoIndex] = currentPlayer;
                  console.log("置いた位置　縦：",tateIndex,"横：",yokoIndex)
                  setSquares([...squares]);
                  

                  // flipPieceに、自分の位置を渡す
                  console.log("opponent",opponent)
                  upperRightFlipPiece(upperRightOpponentPositionTate,upperRightOpponentPositionYoko,opponent,currentPlayer,tateIndex,yokoIndex);

                  canFlip = true;

                } else if (squares[upperRightOpponentPositionTate][upperRightOpponentPositionYoko] === 0) {
                  break;
                }
                upperRightOpponentPositionTate--;
                upperRightOpponentPositionYoko++;
              }
            }
          }
          // 相手の右上にコマを置いて、左下方向を確認
          const downLeftPositionTate = 1;
          const downLeftPositionYoko = - 1;
          const downLeftLimitTate = 7;
          const downLeftLimitYoko = 0;

            // 相手のコマが左下にある場合
          if(!(tateIndex >= 7 || yokoIndex <= 0)){
            console.log("相手の右上にコマを置いて、左下方向を確認")
            if (squares[tateIndex + downLeftPositionTate][yokoIndex + downLeftPositionYoko] === opponent) {
              // 相手の位置を代入
              let downLeftOpponentPositionTate = tateIndex + downLeftPositionTate;
              let downLeftOpponentPositionYoko = yokoIndex + downLeftPositionYoko;
              
              while (downLeftOpponentPositionTate <= downLeftLimitTate && downLeftOpponentPositionYoko >= downLeftLimitYoko) {
                if (squares[downLeftOpponentPositionTate][downLeftOpponentPositionYoko] === currentPlayer) {
                  console.log("挟めるのを確認")

                  // ２次元配列を更新
                  squares[tateIndex][yokoIndex] = currentPlayer;
                  console.log("置いた位置　縦：",tateIndex,"横：",yokoIndex)
                  setSquares([...squares]);
                  

                  // flipPieceに、自分の位置を渡す
                  console.log("opponent",opponent)
                  
                  downLeftFlipPiece(downLeftOpponentPositionTate,downLeftOpponentPositionYoko,opponent,currentPlayer,tateIndex,yokoIndex);

                  canFlip = true;

                } else if (squares[downLeftOpponentPositionTate][downLeftOpponentPositionYoko] === 0) {
                  break;
                }
                downLeftOpponentPositionTate++;
                downLeftOpponentPositionYoko--
              }
            }
          }
          // 相手の左上にコマを置いて、右下方向を確認
          const downRightPositionTate = 1;
          const downRightPositionYoko = 1;
          const downRightLimitTate = 7;
          const downRightLimitYoko = 7;

          if(!(tateIndex >= 7 || yokoIndex >= 7)){
            console.log("相手の左上にコマを置いて、右下方向を確認")
            // 相手のコマが右下にある場合
            if (squares[tateIndex + downRightPositionTate][yokoIndex + downRightPositionYoko] === opponent) {
              // 相手の位置を代入
              let downRightOpponentPositionTate = tateIndex + downRightPositionTate;
              let downRightOpponentPositionYoko = yokoIndex + downRightPositionYoko;
              // 相手の位置が縦列か横列の0より大きい間
              while (downRightOpponentPositionTate <= downRightLimitTate && downRightOpponentPositionYoko <= downRightLimitYoko) {
                if (squares[downRightOpponentPositionTate][downRightOpponentPositionYoko] === currentPlayer) {
                  console.log("挟めるのを確認")

                  // ２次元配列を更新
                  squares[tateIndex][yokoIndex] = currentPlayer;
                  console.log("置いた位置　縦：",tateIndex,"横：",yokoIndex)
                  setSquares([...squares]);
                  

                  // flipPieceに、自分の位置を渡す
                  console.log("opponent",opponent)
                  downRightFlipPiece(downRightOpponentPositionTate,downRightOpponentPositionYoko,opponent,currentPlayer,tateIndex,yokoIndex);

                  canFlip = true;
 
                } else if (squares[downRightOpponentPositionTate][downRightOpponentPositionYoko] === 0) {
                  break;
                }
                downRightOpponentPositionTate++;
                downRightOpponentPositionYoko++;
              }
            }
          }
          return canFlip;
          }
          
          else if(player == "white"){
            const opponent = 2; // 黒石
            const currentPlayer = 1; // 白石
            let canFlip = false;
  
          // 相手の下にコマを置いて、上方向を確認
          const oneUpPosition = -1;
          const upSideLimit = 0;

            // 置いた縦の位置が0より大きくて、相手のコマが上にある場合
          if(tateIndex != 0){
            console.log("相手の下にコマを置いて、上方向を確認")
            if (tateIndex > upSideLimit && squares[tateIndex + oneUpPosition][yokoIndex] === opponent) {
              // upperOpponentPositionに相手の位置を代入
              let upperOpponentPosition = tateIndex + oneUpPosition;
              // 相手の位置が0より大きい間
              while (upperOpponentPosition >= upSideLimit) {
                if (squares[upperOpponentPosition][yokoIndex] === currentPlayer) {
                  console.log("挟めるのを確認")

                  // ２次元配列を更新
                  squares[tateIndex][yokoIndex] = currentPlayer;
                  console.log("置いた位置　縦：",tateIndex,"横：",yokoIndex)
                  setSquares([...squares]);
                  

                  // flipPieceに、自分の位置を渡す
                  upFlipPiece(upperOpponentPosition,yokoIndex,opponent,currentPlayer,tateIndex);

                  canFlip = true;

                } else if (squares[upperOpponentPosition][yokoIndex] === 0) {
                  break;
                }
                upperOpponentPosition--;
              }
            }
          }
          
          
          // 相手の上にコマを置いて、下方向を確認
          const oneDownPosition = 1;
          const downSideLimit = 7;
          if(tateIndex != 7){
            console.log("相手の上にコマを置いて、下方向を確認")
            // 置いた縦の位置が7より小さくて、相手のコマが下にある場合
            if (tateIndex < downSideLimit && squares[tateIndex + oneDownPosition][yokoIndex] === opponent) {
              // downOpponentPositionに相手の位置を代入
              let downOpponentPosition = tateIndex + oneDownPosition;
              // 相手の位置が7より小さい間
              while (downOpponentPosition <=  downSideLimit) {
                if (squares[downOpponentPosition][yokoIndex] === currentPlayer) {
                  console.log("挟めるのを確認")

                  // ２次元配列を更新
                  squares[tateIndex][yokoIndex] = currentPlayer;
                  console.log("置いた位置　縦：",tateIndex,"横：",yokoIndex)
                  setSquares([...squares]);

                  // flipPieceに、自分の位置を渡す
                  downFlipPiece(downOpponentPosition,yokoIndex,opponent,currentPlayer,tateIndex);

                  canFlip = true;

                } else if (squares[downOpponentPosition][yokoIndex] === 0) {
                  break;
                }
                downOpponentPosition++;
              }
            }
          }
          // 相手の右にコマを置いて、左方向を確認
          const oneLeftPosition = -1;
          const leftSideLimit = 0;
          // 置いた横の位置が0より大きくて、相手のコマが左にある場合
          if(yokoIndex != 0){
            console.log("相手の右にコマを置いて、左方向を確認")
            if (yokoIndex > leftSideLimit && squares[tateIndex][yokoIndex + oneLeftPosition] === opponent) {
              // leftOpponentPositionに相手の位置を代入
              let leftOpponentPosition = yokoIndex + oneLeftPosition;
              while (leftOpponentPosition >= leftSideLimit) {
                // 左方向に自分のコマがあった場合
                if (squares[tateIndex][leftOpponentPosition] === currentPlayer) {
                  console.log("挟めるのを確認")

                  // ２次元配列を更新
                  squares[tateIndex][yokoIndex] = currentPlayer;
                  console.log("置いた位置　縦：",tateIndex,"横：",yokoIndex)
                  setSquares([...squares]);

                  // flipPieceに、自分の位置を渡す
                  leftFlipPiece(tateIndex,leftOpponentPosition,opponent,currentPlayer,yokoIndex);

                  canFlip = true;

                } else if (squares[tateIndex][leftOpponentPosition] === 0) {
                  break;
                }
                leftOpponentPosition--;
              }
            }
          }
          // 相手の左にコマを置いて、右方向を確認
          const oneRightPosition = 1;
          const rightSideLimit = 7;
          // 置いた横の位置が7より小さくて、相手のコマが右にある場合
          if(yokoIndex != 7){
            console.log("相手の左にコマを置いて、右方向を確認")
            if (yokoIndex < rightSideLimit && squares[tateIndex][yokoIndex + oneRightPosition] === opponent) {
              let rightOpponentPosition = yokoIndex + oneRightPosition;
              while (rightOpponentPosition <= rightSideLimit) {
                if (squares[tateIndex][rightOpponentPosition] === currentPlayer) {
                  console.log("挟めるのを確認")

                  // ２次元配列を更新
                  squares[tateIndex][yokoIndex] = currentPlayer;
                  console.log("置いた位置　縦：",tateIndex,"横：",yokoIndex)
                  setSquares([...squares]);

                  // flipPieceに、自分の位置を渡す
                  rightFlipPiece(tateIndex,rightOpponentPosition,opponent,currentPlayer,yokoIndex);

                  canFlip = true;

                } else if (squares[tateIndex][rightOpponentPosition] === 0) {
                  break;
                }
                rightOpponentPosition++;
              }
            }
          }
          // 相手の右下にコマを置いて、左上方向を確認
          const upperLeftPositionTate = - 1;
          const upperLeftPositionYoko = - 1;
          const upperLeftLimitTate = 0;
          const upperLeftLimitYoko = 0;

            // 相手のコマが左上にある場合
          if(!(tateIndex <= 0 || yokoIndex <= 0)){
            console.log("相手の右下にコマを置いて、左上方向を確認")
            if (squares[tateIndex + upperLeftPositionTate][yokoIndex + upperLeftPositionYoko] === opponent) {
              // 相手の位置を代入
              let upperLeftOpponentPositionTate = tateIndex + upperLeftPositionTate;
              let upperLeftOpponentPositionYoko = yokoIndex + upperLeftPositionYoko;
              // 相手の位置が縦列か横列の0より大きい間
              while (upperLeftOpponentPositionTate >= upperLeftLimitTate && upperLeftOpponentPositionYoko >= upperLeftLimitYoko) {
                if (squares[upperLeftOpponentPositionTate][upperLeftOpponentPositionYoko] === currentPlayer) {
                  console.log("挟めるのを確認")

                  // ２次元配列を更新
                  squares[tateIndex][yokoIndex] = currentPlayer;
                  console.log("置いた位置　縦：",tateIndex,"横：",yokoIndex)
                  setSquares([...squares]);
                  

                  // flipPieceに、自分の位置を渡す
                  console.log("opponent",opponent)
                  upperLeftFlipPiece(upperLeftOpponentPositionTate,upperLeftOpponentPositionYoko,opponent,currentPlayer,tateIndex,yokoIndex);

                  canFlip = true;

                } else if (squares[upperLeftOpponentPositionTate][upperLeftOpponentPositionYoko] === 0) {
                  break;
                }
                upperLeftOpponentPositionTate--;
                upperLeftOpponentPositionYoko--
              }
            }
          }
          // 相手の左下にコマを置いて、右上方向を確認
          const upperRightPositionTate = - 1;
          const upperRightPositionYoko = + 1;
          const upperRightLimitTate = 0;
          const upperRightLimitYoko = 7;

            // 相手のコマが左上にある場合
          if(!(tateIndex <= 0 || yokoIndex >= 7)){
            console.log("相手の左下にコマを置いて、右上方向を確認")
            if (squares[tateIndex + upperRightPositionTate][yokoIndex + upperRightPositionYoko] === opponent) {
              // 相手の位置を代入
              let upperRightOpponentPositionTate = tateIndex + upperRightPositionTate;
              let upperRightOpponentPositionYoko = yokoIndex + upperRightPositionYoko;
              // 相手の位置が縦列か横列の0より大きい間
              while (upperRightOpponentPositionTate >= upperRightLimitTate && upperRightOpponentPositionYoko <= upperRightLimitYoko) {
                if (squares[upperRightOpponentPositionTate][upperRightOpponentPositionYoko] === currentPlayer) {
                  console.log("挟めるのを確認")

                  // ２次元配列を更新
                  squares[tateIndex][yokoIndex] = currentPlayer;
                  console.log("置いた位置　縦：",tateIndex,"横：",yokoIndex)
                  setSquares([...squares]);
                  

                  // flipPieceに、自分の位置を渡す
                  console.log("opponent",opponent)
                  upperRightFlipPiece(upperRightOpponentPositionTate,upperRightOpponentPositionYoko,opponent,currentPlayer,tateIndex,yokoIndex);

                  canFlip = true;

                } else if (squares[upperRightOpponentPositionTate][upperRightOpponentPositionYoko] === 0) {
                  break;
                }
                upperRightOpponentPositionTate--;
                upperRightOpponentPositionYoko++;
              }
            }
          }
          // 相手の右上にコマを置いて、左下方向を確認
          const downLeftPositionTate = 1;
          const downLeftPositionYoko = - 1;
          const downLeftLimitTate = 7;
          const downLeftLimitYoko = 0;

            // 相手のコマが左下にある場合
          if(!(tateIndex >= 7 || yokoIndex <= 0)){
            console.log("相手の右上にコマを置いて、左下方向を確認")
            if (squares[tateIndex + downLeftPositionTate][yokoIndex + downLeftPositionYoko] === opponent) {
              // 相手の位置を代入
              let downLeftOpponentPositionTate = tateIndex + downLeftPositionTate;
              let downLeftOpponentPositionYoko = yokoIndex + downLeftPositionYoko;
              
              while (downLeftOpponentPositionTate <= downLeftLimitTate && downLeftOpponentPositionYoko >= downLeftLimitYoko) {
                if (squares[downLeftOpponentPositionTate][downLeftOpponentPositionYoko] === currentPlayer) {
                  console.log("挟めるのを確認")

                  // ２次元配列を更新
                  squares[tateIndex][yokoIndex] = currentPlayer;
                  console.log("置いた位置　縦：",tateIndex,"横：",yokoIndex)
                  setSquares([...squares]);
                  

                  // flipPieceに、自分の位置を渡す
                  console.log("opponent",opponent)
                  downLeftFlipPiece(downLeftOpponentPositionTate,downLeftOpponentPositionYoko,opponent,currentPlayer,tateIndex,yokoIndex);

                  canFlip = true;

                } else if (squares[downLeftOpponentPositionTate][downLeftOpponentPositionYoko] === 0) {
                  break;
                }
                downLeftOpponentPositionTate++;
                downLeftOpponentPositionYoko--
              }
            }
          }
          // 相手の左上にコマを置いて、右下方向を確認
          const downRightPositionTate = 1;
          const downRightPositionYoko = 1;
          const downRightLimitTate = 7;
          const downRightLimitYoko = 7;

          if(!(tateIndex >= 7 || yokoIndex >= 7)){
            console.log("相手の左上にコマを置いて、右下方向を確認")
            // 相手のコマが右下にある場合
            if (squares[tateIndex + downRightPositionTate][yokoIndex + downRightPositionYoko] === opponent) {
              // 相手の位置を代入
              let downRightOpponentPositionTate = tateIndex + downRightPositionTate;
              let downRightOpponentPositionYoko = yokoIndex + downRightPositionYoko;
              // 相手の位置が縦列か横列の0より大きい間
              while (downRightOpponentPositionTate <= downRightLimitTate && downRightOpponentPositionYoko <= downRightLimitYoko) {
                if (squares[downRightOpponentPositionTate][downRightOpponentPositionYoko] === currentPlayer) {
                  console.log("挟めるのを確認")

                  // ２次元配列を更新
                  squares[tateIndex][yokoIndex] = currentPlayer;
                  console.log("置いた位置　縦：",tateIndex,"横：",yokoIndex)
                  setSquares([...squares]);
                  

                  // flipPieceに、自分の位置を渡す
                  console.log("opponent",opponent)
                  downRightFlipPiece(downRightOpponentPositionTate,downRightOpponentPositionYoko,opponent,currentPlayer,tateIndex,yokoIndex);

                  canFlip = true;
 
                } else if (squares[downRightOpponentPositionTate][downRightOpponentPositionYoko] === 0) {
                  break;
                }
                downRightOpponentPositionTate++;
                downRightOpponentPositionYoko++;
              }
            }
          }
          return canFlip;
          }
        }

      
      // 相手の下にコマを置いて、上方向を確認して、ひっくり返る時の関数
      const upFlipPiece = (myTatePosition:any, myYokoPosition:any, opponent:any, currentPlayer:any, tateIndex:any) => {
        console.log("upFlipPiece開始-------------------------------------")

          // 見つかった自分は、一番上の自分のコマなので、上から下に見ていく必要がある。
          if(myTatePosition == 7){return}
          for(let i = myTatePosition + 1; i <= tateIndex; i++){
            console.log("tateIndex:",tateIndex,"---myTatePosition:",myTatePosition)

            if(squares[i][myYokoPosition] === opponent){
              
              squares[i][myYokoPosition] = currentPlayer;
              console.log("ひっくり返る場所",i,"：",myYokoPosition)
            }
            else{
              break;
            }
          }
          setSquares([...squares]);
          return;
        
        }
        
      
      // 上方向を確認して、下方向へひっくり返る時の関数
      const downFlipPiece = (myTatePosition:any, myYokoPosition:any, opponent:any, currentPlayer:any, tateIndex:any) => {
        console.log("downFlipPiece開始-------------------------------------")

          // 見つかった自分は、一番下の自分のコマなので、下から上に見ていく必要がある。
          const flipUpWay = 0;
          if(myTatePosition == 0){return}
          for(let i = myTatePosition - 1; i >= tateIndex; i--){
            console.log("tateIndex:",tateIndex,"---myTatePosition:",myTatePosition)

            if(squares[i][myYokoPosition] === opponent){

              squares[i][myYokoPosition] = currentPlayer;
              console.log("ひっくり返る場所",i,"：",myYokoPosition)
            }
            else{
              break;
            }
          }
          setSquares([...squares]);
          return;
      
    }
      // 相手の左にコマを置いて、右方向を確認して、ひっくり返る時の関数
      const rightFlipPiece = (myTatePosition:any, myYokoPosition:any, opponent:any, currentPlayer:any, yokoIndex:any) => {
        console.log("rightFlipPiece開始-------------------------------------")

          // 見つかった自分は、一番右の自分のコマなので、右から左に見ていく必要がある。
          const flipRightWay = 0;
          if(myYokoPosition == 0){return}
          for(let i = myYokoPosition - 1; i >= yokoIndex; i--){
            console.log("yokoIndex:",yokoIndex,"---myYokoPosition:",myYokoPosition)

            if(squares[myTatePosition][i] === opponent){

              squares[myTatePosition][i] = currentPlayer;
              console.log("ひっくり返る場所",myTatePosition,"：",i)
            }
            else{
              break;
            }
          }
          setSquares([...squares]);
          return;
        
          
      }
      // 左方向を確認して、ひっくり返る時の関数
      const leftFlipPiece = (myTatePosition:any, myYokoPosition:any, opponent:any, currentPlayer:any, yokoIndex:any) => {
        console.log("leftFlipPiece開始-------------------------------------")

          // 見つかった自分は、一番左の自分のコマなので、左から右に見ていく必要がある。
          const flipLeftWay = 7;
          if(myYokoPosition == 7){return}
          for(let i = myYokoPosition + 1; i <= yokoIndex; i++){
            console.log("yokoIndex:",yokoIndex,"---myYokoPosition:",myYokoPosition)

            if(squares[myTatePosition][i] === opponent){

              squares[myTatePosition][i] = currentPlayer;
              console.log("ひっくり返る場所",myTatePosition,"：",i)
            }
            else{
              break;
            }
          }
          setSquares([...squares]);
          return;
      
    }
      // 相手の右下にコマを置いて、左上から右下方向を確認して、ひっくり返る時の関数
      const upperLeftFlipPiece = (myTatePosition:any, myYokoPosition:any, opponent:any, currentPlayer:any,tateIndex:any,yokoIndex:any) => {
        console.log("upperLeftFlipPiece開始-------------------------------------")

          const seven = 7;
          if(myTatePosition == 7 || myYokoPosition == 7){return}
          for (let i = myTatePosition + 1, j = myYokoPosition + 1; i <= tateIndex && j <= yokoIndex; i++, j++) {

              // 右下へ戻りながら、相手のコマをひっくり返していく
              if(squares[i][j] == opponent){
                let tateFlipPosition = i;
                let yokoFlipPosition = j;
                
                squares[tateFlipPosition][yokoFlipPosition] = currentPlayer;
                console.log("ひっくり返る場所",tateFlipPosition,"：",yokoFlipPosition)
              }
              else{
                break;
              }
            }
            setSquares([...squares]);
          return;
          
          
        }
      // 相手の左下にコマを置いて、右上から左下方向を確認して、ひっくり返る時の関数
      const upperRightFlipPiece = (myTatePosition:any, myYokoPosition:any, opponent:any, currentPlayer:any,tateIndex:any,yokoIndex:any) => {
        console.log("upperRightFlipPiece開始-------------------------------------")
          
          const seven = 7;
          const zero = 0;
          if(myTatePosition == 7 || myYokoPosition == 0){return}
          for (let i = myTatePosition + 1, j = myYokoPosition - 1; i <= tateIndex && j >= yokoIndex; i++, j--) {

              // 左下へ戻りながら、相手のコマをひっくり返していく
              if(squares[i][j] == opponent){
                let tateFlipPosition = i;
                let yokoFlipPosition = j;
                
                squares[tateFlipPosition][yokoFlipPosition] = currentPlayer;
                console.log("ひっくり返る場所",tateFlipPosition,"：",yokoFlipPosition)
              }
              else{
                break;
              }
            }
            setSquares([...squares]);
          return;
          
        }
        // 相手の右上にコマを置いて、左下から右上方向を確認して、ひっくり返る時の関数
      const downLeftFlipPiece = (myTatePosition:any, myYokoPosition:any, opponent:any, currentPlayer:any,tateIndex:any,yokoIndex:any) => {
        console.log("downLeftFlipPiece開始-------------------------------------")

          const seven = 7;
          const zero = 0;
          if(myTatePosition == 0 || myYokoPosition == 7){return}
          for (let i = myTatePosition - 1, j = myYokoPosition + 1; i >= tateIndex && j <= yokoIndex; i--, j++) {

              // 左下へ戻りながら、相手のコマをひっくり返していく
              if(squares[i][j] == opponent){
                let tateFlipPosition = i;
                let yokoFlipPosition = j;
                
                squares[tateFlipPosition][yokoFlipPosition] = currentPlayer;
                console.log("ひっくり返る場所",tateFlipPosition,"：",yokoFlipPosition)
              }
              else{
                break;
              }
            }
            setSquares([...squares]);
          return;
          
        }
      // 相手の左上にコマを置いて、右下から左上方向を確認して、ひっくり返る時の関数
      const downRightFlipPiece = (myTatePosition:any, myYokoPosition:any, opponent:any, currentPlayer:any,tateIndex:any,yokoIndex:any) => {
        console.log("downRightFlipPiece開始-------------------------------------")

          const zero = 0;
          if(myTatePosition == 0 || myYokoPosition == 0){return}
          for (let i = myTatePosition - 1, j = myYokoPosition - 1; i >= tateIndex && j >= yokoIndex; i--, j--) {

              if(squares[i][j] == opponent){
                let tateFlipPosition = i;
                let yokoFlipPosition = j;
                
                squares[tateFlipPosition][yokoFlipPosition] = currentPlayer;
                console.log("ひっくり返る場所",tateFlipPosition,"：",yokoFlipPosition)
              }
              else{
                break;
              }
            }
            setSquares([...squares]);
          return;
          
        }
        
  return (
    <div>
    <button onClick={pass}style={buttonStyle}>PASS</button>
    <p style={pStyle}>現在のプレイヤー：{player}</p>
    <p style={pStyle}>メッセージ：{message}</p>
    <br /><br />
      <table style={tableStyle}>
        <tbody>
          {squares.map((row: any, tateIndex: any) => (
            <tr key={tateIndex}>
              {row.map((cell: any, yokoIndex: any) => (
                <td style={tdStyle} key={yokoIndex} onClick={() => {
                  changePiece(cell,tateIndex,yokoIndex); console.log("clicked（縦・横）",tateIndex,yokoIndex,"cellは",cell)} }>
                    <span style={imgStyle}>{cell == 2 ? <img src="./images/black.png" alt="black"/> 
                    : cell == 1 ? <img src="./images/white.png" alt="white" /> 
                    : <img src=""/> 
                    }</span></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
    
  );
};

export default MatrixDisplay;
