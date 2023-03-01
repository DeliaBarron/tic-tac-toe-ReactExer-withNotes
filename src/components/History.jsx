import { useEffect, useState } from "react"

export const History = ({currentMove, jumpToMove, history}) => {
 const [order, setOrder]=useState(true)//asc
 const [list, setList]=useState()
let listArr

useEffect(()=>{
  renderList(history)
  if(order){
   setList(listArr)
  // console.log(listArr)
  } else if(order===false){
    let sortedList=listArr.slice()
    sortedList.reverse()
    setList(sortedList)
    console.log('sortedList key: ',sortedList[0].key)
  }
  console.log('list at uE call: ',list)
  console.log('order at uE call:',order)
},[order, history, currentMove])

  /*
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
*/
function renderList(history){
   listArr=history.map((squares, moveIndex)=>{
    let description
    console.log('history MAP ele/squares',squares, 'moveIndex: '+moveIndex)
    if(moveIndex > 0){
      description='GO TO MOVE: '+moveIndex
    } else if(moveIndex===0){
      description='GO TO GAME START '
    }
    return (
      <li className="mt-1" key={moveIndex}>{
        currentMove===moveIndex?
          <button className="actual-move px-2" onClick={() => jumpToMove(moveIndex)}>{'YOU ARE AT MOVE: '+ currentMove}</button>
          :
         <button className="jump-btn px-2" onClick={() => jumpToMove(moveIndex)}>{description}</button>
      }
      </li>
    )
  })
}

    function handleOrderToggle(){
        setOrder(!order)
    }
    
  return (
    <>
        <div>
      {
        order?
   <button className="toggle-btn mb-2 py-2 px-3" onClick={()=>{handleOrderToggle()}}>TOGGLE MOVES ORDER <i className="bi bi-arrow-up-short"></i></button>
    :
    <button className="toggle-btn mb-2 py-2 px-3" onClick={()=>{handleOrderToggle()}}>TOGGLE MOVES ORDER <i className="bi bi-arrow-down-short"></i></button>
      }
   </div>
    <div>
      <ul>{list}</ul> 
    </div>
    <div>
      <button onClick={()=>{window.location.reload()}} className="start-btn py-3 px-3">START</button>
    </div>
    </>
  )
}
