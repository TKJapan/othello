'use client';
import React, {useState, useEffect} from 'react';

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
    
    
      const upsideDown = () => {
        console.log("excute upsidedown")
        const upsideDown =  squares.map((row: any, tateIndex: any) => (
              row.map((cell: any, yokoIndex: any) => (
                [row][cell] = 0
              ))
          ))
          // squares[1][3] = 20
        setSquares(upsideDown);
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

        if(player=="black"){
          // 同じ色で挟めているか確認
          if(checkBoardSituation(cell, squares, tateIndex, yokoIndex) == true) {
                          
              // 配列に保存
              squares[tateIndex][yokoIndex] = 2;
              // 置いたらプレイヤーを入れ替える
              setCount(count + 1);
              console.log("countは、",count)
              if(count % 2 == 0){
                setPlayer("white")
              } 
              else{
                setPlayer("black")
              }
              console.log("次のplayer",player)
            }
          }

        
        if(player=="white"){
           // 同じ色で挟めているか確認
          if(checkBoardSituation(cell, squares, tateIndex, yokoIndex) == true){
            // 配列に保存
            squares[tateIndex][yokoIndex] = 1
            setCount(count + 1);
            // 置いたらプレイヤーを入れ替える
            console.log("countは、",count)
            if(count % 2 == 0){
              setPlayer("white")  
            } 
            else{
              setPlayer("black")
            }
            console.log("次のplayer",player)
          }
          }
          setSquares(
            [...squares]    
          )
          console.log("squares",squares)
          return;  
      }

      const checkBoardSituation = (cell:any, squares:any, tateIndex:any, yokoIndex:any) => {
        // 横列に自分の色があるか
        console.log("checkBoardSituationの現在のプレイヤーは、",player)
        
        if(player == "black"){
          let tatePosition = 0;
          let yokoPosition = 0;
            for(let tate=0; tate <= 7; tate++){
              
              for(let yoko=0; yoko <= 7; yoko++){
                console.log("[tate][yoko]は、 ",[tate][yoko])
                // 調べるマスが白ならループ
                while(squares[tate][yoko]==1)
                {
                  tatePosition += tate;
                  yokoPosition += yoko;
                  if([tate][yoko]==2){
                    console.log("挟める");
                    return true   
                  }    
                }
              }
            }
          }
          if(player == "white"){
            let tatePosition = 0;
            let yokoPosition = 0;
              for(let tate=0; tate <= 7; tate++){
                for(let yoko=0; yoko <= 7; yoko++){
                  console.log("[tate][yoko]は、 ",[tate][yoko])
                  // 調べるマスが黒ならループ
                  while(squares[tate][yoko]==2)
                  {
                    if([tate][yoko]==1){
                      console.log("挟める");
                      return true
                      
                    }
                }
              }
            }
          }
      }
        
  return (
    <div>
    <button onClick={ganeStart}style={buttonStyle}>ゲーム開始</button>
    <button onClick={upsideDown} style={buttonStyle}>置く</button>
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
