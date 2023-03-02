import React, { useEffect, useState } from 'react'
import { Square } from './Square';

//-->   FOR MOR INFO  ABOUT THIS FUNCTION GO TO README.md
export const Board = ({ xIsNext, currentSquares, onPlay }) => {
  const [highlight, setHighlight]=useState('')
  useEffect(()=>{
    setHighlight(winner)
    console.log(winner)
  })
  //---> FOR MOR INFO  ABOUT THIS FUNCTION GO TO README.md
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
switch (winner) {
  case 'X':
  case 'O':
    status='WINNER: '+ winner
    break;
  case `CAT'S GAME`:
    status=winner
    break;
  default:
    status='NEXT PLAYER: '+ (xIsNext? 'X': 'O')
    break;
}
      return (
        <>
          <div className="status ps-2">{status}</div>
         <div className='board-row'>
          < Square value={currentSquares[0]} highlight={highlight} onSquareClick={()=>handleSquareClick(0)}/>
          < Square value={currentSquares[1]} highlight={highlight} onSquareClick={()=>handleSquareClick(1)}/>
          < Square value={currentSquares[2]} highlight={highlight} onSquareClick={()=>handleSquareClick(2)}/>
         </div>
         <div className='board-row'>
          < Square value={currentSquares[3]} highlight={highlight} onSquareClick={()=>handleSquareClick(3)}/>
          < Square value={currentSquares[4]} highlight={highlight} onSquareClick={()=>handleSquareClick(4)}/>
          < Square value={currentSquares[5]} highlight={highlight} onSquareClick={()=>handleSquareClick(5)}/>
         </div>
         <div className='board-row'>
          < Square value={currentSquares[6]} highlight={highlight} onSquareClick={()=>handleSquareClick(6)}/>
          < Square value={currentSquares[7]} highlight={highlight} onSquareClick={()=>handleSquareClick(7)}/>
          < Square value={currentSquares[8]} highlight={highlight} onSquareClick={()=>handleSquareClick(8)}/>
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
      //console.log('a, b, c current squares @ calculateWinner: ',currentSquares[a], currentSquares[b], currentSquares[c])
      return currentSquares[a]
    }else if(currentSquares.every((square)=>square!== null)){
      return `CAT'S GAME`
    }
    
  }
}
