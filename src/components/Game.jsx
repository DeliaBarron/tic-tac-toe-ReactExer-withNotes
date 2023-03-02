//HOOKS
import { useState } from "react"
//COMPONENTS
import { Board } from "./Board.jsx"
import {History} from "./History.jsx"

export default function Game(){
    const [history, setHistory]=useState([Array(9).fill(null)])
    const [currentMove, setCurrentMove]= useState(0)
    const xIsNext= currentMove % 2 === 0
    // const [movesHistory, setMovesHistory]=useState([])
 
    // const currentSquares = history[history.length-1];
    const currentSquares = history[currentMove]
    console.log(currentSquares,'current squares')

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
      console.log(history)
      /*0 % 2 =0 true xIsNext
        1 % 2 =1 false !xIsNext
        2 % 2 =0 true xIsNext
      */
    } 

    return (
      <div className="game container-fluid text-center">
        <div className="game-board">
          <Board xIsNext={xIsNext} currentSquares={currentSquares} onPlay={handlePlay}></Board>
        </div>
        <div className="game-history">
            <History currentMove={currentMove} history={history} jumpToMove={jumpToMove} onClick></History>
        </div>
        
       
      </div>
    )
}