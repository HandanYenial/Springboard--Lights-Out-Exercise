import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 * Properties:
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 * State:
 * - board: array-of-arrays of true/false
 *    For this board:
         .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 * This would be: [[f, f, f], [t, t, f], [f, f, f]]
 * This should render an HTML table of individual <Cell /> components.
 * This doesn't handle any clicks --- clicks are on individual cells
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.25}) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  // TODO: create array-of-arrays of true/false values
  function createBoard() {
    let initialBoard = [];

    for (let y = 0; y < nrows ; y++){
      let row =[];
      for (let x = 0; x < ncols ; x++){
      //initially I thought it could be initialBoard.push(false) so all cells would be off 
      row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
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
      // A deep copy means that all values of the new variable are copied and disconnected
      // from the old/original variable. So if you make any cahnges in the new or old copy they will not affect each other.
      //One way to make a deep copy of a JavaScript object, if it can be serialized, 
      //is to use JSON.stringify() to convert the object to a JSON string, and then JSON.parse()
      // to convert the string back into a (completely new) JavaScript object(mdn)
      const boardCopy = JSON.parse(JSON.stringify(oldBoard));


      // TODO: in the copy, flip this cell and the cells around it
      
        flipCell(y, x, boardCopy); //flips the cell itself
        flipCell(y - 1, x, boardCopy); //flips the cell above
        flipCell(y + 1, x, boardCopy); //flips the cell below
        flipCell(y, x - 1, boardCopy); //flips the cell to the left
        flipCell(y, x + 1, boardCopy); //flips the cell to the right

         // TODO: return the copy
        return boardCopy;
      });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return (
    <div className="win">
      You win!
    </div>
    );
  }

  // TODO

  // make table board
  let tableBoard =[]; //empty array, we'll push rows and columns into this
  //better to push row and for each row push column into the row
  for( let y = 0 ; y < nrows ; y++){
    let row = [];
    for(let x = 0 ; x < ncols ; x++){
      let coord = `${y} - ${x}`;
      row.push(
        <Cell 
              key ={ coord }
              isLit = { board[y][x] }
              flipCellsAroundMe = { () => flipCellsAround( coord ) }
        />
      ) ;
    }
    //I tried tableBoard.push(row) but it didn't make columns, it only made rows.
    tableBoard.push( <tr key={y}>{row}</tr> );
  }
  
  return (
    <div>
      <div className = "board-title">
        <div>
          Lights Out!
        </div>
      </div>
      <table>
        <tbody className = "Board-table">
          {tableBoard}
        </tbody>
      </table>
    </div>
  );
}


export default Board;
