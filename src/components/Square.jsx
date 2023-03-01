import React from 'react'

export const Square = ({value, onSquareClick,highlight}) => {

  return (
    value===highlight?
    <button
    className="square highlight"
    onClick={onSquareClick}
    >
     {value}
     </button>
     :
     <button
    className="square"
    onClick={onSquareClick}
    >
     {value}
     </button>
  )
}
