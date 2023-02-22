import { useEffect, useState } from "react"

export const History = ({currentMove, jumpToMove, history}) => {
 const [historyOrder, setHistoryOrder]=useState(true)//asc
 const [listOrder, setListOrder]=useState([])

// useEffect(()=>{

// },[historyOrder])

  const moves=history.map((squares, moveIndex) => {
    let description
    console.log('history MAP ele/squares',squares, 'moveIndex: '+moveIndex)
    if(moveIndex > 0){
      description='Go to move: '+moveIndex
    } else if(moveIndex===0){
      description='Go to start game'
    }
    return (
      <li key={moveIndex}>{
        currentMove===moveIndex?
          <span className="actual-move">{'You are at move: '+currentMove}</span>
          :
         <button className="jump-btn" onClick={() => jumpToMove(moveIndex)}>{description}</button>
      }
      </li>
    )
})


    function handleOrderToggle(){
        let sortedMoves=moves
        sortedMoves.reverse()
        //LISTORDER ARRA
        setListOrder(sortedMoves)
        //SET TO ASC OR DESC
        setHistoryOrder(!historyOrder)
     }

    
  return (
    <>
    <button onClick={()=>{handleOrderToggle()}}>toggleOrder</button>
    {/*
     {
        historyOrder ?
        <ol> {moves}</ol>:
        <ol>{listOrder}</ol>
        } */}

     <ol> {moves}</ol>
    </>
  )
}
