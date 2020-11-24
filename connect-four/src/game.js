import React, { Component } from 'react';
import './game.css';

function Square(props){
  return <div className="Square"><div className={props.value}></div></div>
}

function Column(props){
    return <div className="Column" onClick={() => props.handleClick()}>
      {[...Array(props.squares.length)].map((x, j) => 
        <Square key={j} value={props.squares[j]}></Square>)}
      </div>
 }

class Board extends Component {

  constructor() {
    super();
    this.state = {
      boardState: new Array(7).fill(new Array(6).fill(null)),
      playerTurn: 'Red',
      winner: ''
    }
  }

  selectedGame(){
    this.setState({
       boardState: new Array(7).fill(new Array(6).fill(null))
    })
  }

  makeMove(columnID){
    const boardCopy = this.state.boardState.map(function(arr) {
      return arr.slice();
    });
    if( boardCopy[columnID].indexOf(null) !== -1 ){
      let newColumn = boardCopy[columnID].reverse()
      newColumn[newColumn.indexOf(null)] = this.state.playerTurn
      newColumn.reverse()
      this.setState({
        playerTurn: (this.state.playerTurn === 'Red') ? 'Blue' : 'Red',
        boardState: boardCopy
      })
    }
  }

  /*Only make moves if winner doesn't exist*/
  handleClick(columnID) {
    if(this.state.winner === ''){
      this.makeMove(columnID)
    }
  }
  
  /*check the winner*/
  componentDidUpdate(){
    let winner = checkWinner(this.state.boardState)
    console.log(this.state.boardState)
    if(this.state.winner !== winner){
      this.setState({winner: winner})
    }
  }

  render(){

    /*If a winner exists display the name*/
    let winnerMessageStyle
    if(this.state.winner !== ""){
      winnerMessageStyle = "winnerMessage appear"
    }else {
      winnerMessageStyle = "winnerMessage"
    }

    /*Contruct columns allocating column from board*/
    let columns = [...Array(this.state.boardState.length)].map((x, i) => 
      <Column 
          key={i}
          squares={this.state.boardState[i]}
          handleClick={() => this.handleClick(i)}
      ></Column>
    )

    return (
      <div>
        {
          <div className="Board">
            {columns}
          </div>
        }
        <div className={winnerMessageStyle}>{this.state.winner}</div>
      </div>
    )
  }
}


class App extends Component {
  render() {
    return (
      <div className="Game">
        <div className="Game-Board">
          <Board></Board>
        </div>
      </div>
    );
  }
}

function checkLine(a,b,c,d) {
  return ((a !== null) && (a === b) && (a === c) && (a === d));
}

function checkWinner(bs) {
  for (let c = 0; c < 7; c++)
    for (let r = 0; r < 4; r++)
      if (checkLine(bs[c][r], bs[c][r+1], bs[c][r+2], bs[c][r+3]))
        return bs[c][r] + ' wins!';

  for (let r = 0; r < 6; r++)
    for (let c = 0; c < 4; c++)
      if (checkLine(bs[c][r], bs[c+1][r], bs[c+2][r], bs[c+3][r]))
        return bs[c][r] + ' wins!';

  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 4; c++)
      if (checkLine(bs[c][r], bs[c+1][r+1], bs[c+2][r+2], bs[c+3][r+3]))
        return bs[c][r] + ' wins!';

  for (let r = 0; r < 4; r++)
    for (let c = 3; c < 6; c++)
      if (checkLine(bs[c][r], bs[c-1][r+1], bs[c-2][r+2], bs[c-3][r+3]))
        return bs[c][r] + ' wins!';

  for (let r = 0; r < 6; r++)
    for (let c = 0; c < 7; c++)
      if (bs[c][r] === null)
        return "";

  return "Draw";
}

export default App;