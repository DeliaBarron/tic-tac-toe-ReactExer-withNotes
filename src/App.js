import { useState } from "react"

function Square({value, onSquareClick}){
  return (
   <button
   className="square"
   onClick={onSquareClick}
   >
    {value}
    </button>
  )
}

//-->   FOR MOR INFO  ABOUT THIS FUNCTION GO TO README.md
function Board({ xIsNext, currentSquares, onPlay }) {
  // --> FOR MOR INFO  ABOUT THIS FUNCTION GO TO README.md
  function handleSquareClick(i){
    if(currentSquares[i] || calculateWinner(currentSquares)){
      return;
    }
    const nextSquares=currentSquares.slice()
    if(xIsNext){
      nextSquares[i]='X'
    }else {
      nextSquares[i]= 'O'
    }onPlay(nextSquares)
  }
  //WINNER STATUS
  const winner= calculateWinner(currentSquares)
  let status
  if (winner){
    status='Winner: '+ winner 
  }else{
    status='Next player:'+ (xIsNext? 'X': 'O')
  }
    return (
      <>
      <div className="status">{status}</div>
       <div className='board-row'>
        < Square value={currentSquares[0]} onSquareClick={()=>handleSquareClick(0)}  />
        < Square value={currentSquares[1]} onSquareClick={()=>handleSquareClick(1)}/>
        < Square value={currentSquares[2]} onSquareClick={()=>handleSquareClick(2)}/>
       </div>
       <div className='board-row'>
        < Square value={currentSquares[3]} onSquareClick={()=>handleSquareClick(3)}/>
        < Square value={currentSquares[4]} onSquareClick={()=>handleSquareClick(4)}/>
        < Square value={currentSquares[5]} onSquareClick={()=>handleSquareClick(5)}/>
       </div>
       <div className='board-row'>
        < Square value={currentSquares[6]} onSquareClick={()=>handleSquareClick(6)}/>
        < Square value={currentSquares[7]} onSquareClick={()=>handleSquareClick(7)}/>
        < Square value={currentSquares[8]} onSquareClick={()=>handleSquareClick(8)}/>
       </div>
      </>
      ) 
  }

  //---> FOR MOR INFO  ABOUT THIS FUNCTION GO TO README.md
  function calculateWinner(currentSquares){
    const lines=[
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ] 
    for(let i=0; i<lines.length; i++){
      const [a,b,c]=lines[i]
      if(currentSquares[a] && currentSquares[a]=== currentSquares[b] && currentSquares[a]=== currentSquares[c]){
        console.log('a, b, c current squares @ calculateWinner: ',currentSquares[a], currentSquares[b], currentSquares[c])
        return currentSquares[a]
      }
    }
  }
  
  export default function Game(){
    const [history, setHistory]=useState([Array(9).fill(null)])
    const [currentMove, setCurrentMove]= useState(0)
    const xIsNext= currentMove % 2 === 0
    // const currentSquares = history[history.length-1];
    const currentSquares = history[currentMove]

    function handlePlay(nextSquares){
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
      // setHistory([...history, nextSquares])
      setHistory(nextHistory)
      setCurrentMove(nextHistory.length -1)
      // console.log('history:(history OG arr)+nextSq:',history)
      // console.log('currentSq (history-1):',currentSquares) 
    }

    function jumpToMove(moveIndex){
      setCurrentMove(moveIndex)
      /*0 % 2 =0 true xIsNext
        1 % 2 =1 false !xIsNext
        2 % 2 =0 true xIsNext
      */
    }
    const moves = history.map((squares, moveIndex) => {
      let description
      console.log(squares)
      if(moveIndex > 0){
        description ='Go to move #'+ moveIndex
      }
      else{
        description= 'Go to game start'
      }
      return (
        <li key={moveIndex}>
          <button onClick={() => jumpToMove(moveIndex)}>{description}</button>
        </li>
      )
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} currentSquares={currentSquares} onPlay={handlePlay}></Board>
        </div>
        <div className="game-history">
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }