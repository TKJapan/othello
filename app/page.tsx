import MatrixDisplay from "./Othello/MatrixDisplay";


export default function App() {
  

 
  return (
    <>
    <h1>オセロゲーム</h1>
    <br /><br />
    <MatrixDisplay />
    {/* <table>
      <tr>
        <td>
          
        </td>
      </tr>
    </table> */}
    {/* <table>
        <tbody>
          {squares.map((row:any, rowIndex:any) => (
            <tr key={rowIndex}>
              {row.map((cell:any, cellIndex:any) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}

    {/* <table style={tableStyle}>
        {squares.map((row1:any, index:any) =>
          <tr key={index}>
            {row1.map((row2:any, index:any) =>
              <td key={index} style={tdStyle}>{row2}</td>
              )}
              </tr>
              )}
    </table> */}
    
    </>
  )
}