import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    
    for (let row = 0; row < nrows; row++) {
      let row =[];
      for (let col=0; col < ncols; col++) {
        //initially I thought it could be initialBoard.push(false) so all cells would be off 
        initialBoard.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    // TODO: create array-of-arrays of true/false values
    return initialBoard;
  }
  //So for each row there will be columns of cells that will be by chance(Math.random) lit or unlit.

  
  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    //The puzzle is won when when all of the lights are turned off.
    //meanning to win all lights need to be false. 
    //const[board,setBoard] = useState((createBoard())); the initial value of the state will be randomly 
    //lit and unlit board --- createBoard is giving us this. 
    //So we need to check if all of the lights are off.
    if (board.every(row => row.every(cell => cell === false))) {
      return true;
    } //.every() method return a boolean value. If all of the elements in the array are true, it will return true.
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      // TODO: in the copy, flip this cell and the cells around it

      // TODO: return the copy
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO
}

export default Board;
