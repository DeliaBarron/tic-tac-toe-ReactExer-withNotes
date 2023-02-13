import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Square extends React.Component {
   
    render() {
      return (
        <button
        className="square"
        onClick={() => this.props.onClick()}
      >
          {this.props.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    constructor(props){
      super(props)
      this.state={
        squares:Array(9).fill(null),
      }
    }

    handleClick(i){
      const squares=this.state.squares.slice()
      squares[i]='X'
      this.setState({squares:squares})
      console.table(squares)
      console.log('setting "X" to the state "squares" which defined as an array and indicatin its index to which the value will be set. this value is sent by the renderSquare(i) function in every square element that is rendered.This way every time the state squares in Board updates, the component Square within rerenders with the updated state. Square is a controlled component, Board has full controll over them')
    }
    renderSquare(i) {
      return (
      <Square 
      value={this.state.squares[i]} 
      onClick={()=>{this.handleClick(i)}} 
      />
      );
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">
            {status}
          </div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  