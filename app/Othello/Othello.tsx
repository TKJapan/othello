'use client';
import React, {useState} from 'react';
import MatrixDisplay from './MatrixDisplay';

export default function Othello() {

  const initialArray = [    
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
]

  const [squares, setSquares] = useState(initialArray);

  const ganeStart = () => {
    console.log("start")
  }


  const upsideDown = () => {
    console.log("excute upsidedown")
    // const updatedArray = myArray.map((element) => element + '（編集済み）');
    // setMyArray(updatedArray);

    const updateArray = squares.map((value) => 
        value[0] + 2
    )
    setSquares(updateArray);
    }
    const buttonStyle = {"backgroundColor":"pink","fontColor":"black","height":"2em","width":"10em","borderWidth":"2px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'};

  return (
    <>
    
    <button onClick={ganeStart}style={buttonStyle}>ゲーム開始</button>
    <button onClick={upsideDown} style={buttonStyle}>置く</button>
    
    </>
  );
}