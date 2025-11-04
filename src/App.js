import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import "./App.css";
import { useState } from "react";
import Log from "./Components/Log";
import GameOver from "./Components/GameOver";
import { generateWinningCombinations } from "./winning-combinations.js";


const BOARD_SIZE = 5;
const WINNING_COMBINATIONS = generateWinningCombinations(BOARD_SIZE);

const initialGameBoard = Array.from({ length: BOARD_SIZE }, () =>
  Array(BOARD_SIZE).fill(null)
);

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "x";
  if (gameTurns.length > 0 && gameTurns[0].player === "x") {
    currentPlayer = "o";
  }
  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState({ x: "Player 1", o: "Player 2" });
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(row => [...row])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
  const firstSymbol = gameBoard[combination[0].row][combination[0].column];
  if (!firstSymbol) continue;

  let isWinningCombo = true;
  for (let i = 1; i < combination.length; i++) {
    const { row, column } = combination[i];
    if (gameBoard[row][column] !== firstSymbol) {
      isWinningCombo = false;
      break;
    }
  }

  if (isWinningCombo) {
    winner = players[firstSymbol];
    break;
  }
}


  

const hasDraw = gameTurns.length === BOARD_SIZE * BOARD_SIZE && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      if (prevTurns.some(turn => turn.square.row === rowIndex && turn.square.col === colIndex)) {
        return prevTurns;
      }
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: newName };
    });
  }

  return (
    <main>
      <div id="game-container">
        <h2 class="mb-5">XOX Game</h2>
        <ol id="players" className="highlight-container">
          <Player
            initialName="Player 1 "
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2 "
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
