import React, { useState } from "react";
import { useLocation } from "react-router-dom";

type Mark = "X" | "O" | null;
type Board = Mark[][];

interface GameState {
  boardSize: number;
  board: Board;
  currentPlayer: Mark;
  winner: Mark | "Draw" | null;
  history: Board[];
}
interface Player {
  mark: Mark;
  color: string;
}

const initialBoard: Board = Array(3)
  .fill(null)
  .map(() => Array(3).fill(null));

const createInitialBoard = (size: number): Board =>
  Array(size)
    .fill(null)
    .map(() => Array(size).fill(null));

const GameBoard: React.FC = () => {
  const location = useLocation();
  const { boardSize, winCondition, player1, player2, startingPlayer } =
    location.state as {
      boardSize: number;
      winCondition: number;
      player1: Player;
      player2: Player;
      startingPlayer: Mark;
    };

  const [board, setBoard] = useState(
    Array(boardSize)
      .fill(null)
      .map(() => Array(boardSize).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState(player1);

  const [gameState, setGameState] = useState<GameState>({
    boardSize: boardSize,
    board: createInitialBoard(boardSize),
    currentPlayer: "X",
    winner: null,
    history: [createInitialBoard(boardSize)],
  });

  // 위너 체크
  const checkWinner = (board: Board): Mark | "Draw" | null => {
    const size = board.length;
    let diagonal1: (Mark | "Draw" | null)[] = [],
      diagonal2: (Mark | "Draw" | null)[] = [];

    for (let i = 0; i < size; i++) {
      if (board[i].every((cell) => cell === board[i][0] && cell !== null)) {
        return board[i][0];
      }

      let column = board.map((row) => row[i]);
      if (column.every((cell) => cell === column[0] && cell !== null)) {
        return column[0];
      }

      diagonal1.push(board[i][i]);
      diagonal2.push(board[i][size - i - 1]);
    }

    if (diagonal1.every((cell) => cell === diagonal1[0] && cell !== null)) {
      return diagonal1[0];
    }
    if (diagonal2.every((cell) => cell === diagonal2[0] && cell !== null)) {
      return diagonal2[0];
    }

    const isDraw = board.every((row) => row.every((cell) => cell !== null));
    return isDraw ? "Draw" : null;
  };

  // 셀 클릭
  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (board[rowIndex][colIndex] || checkWinner(board)) return;

    const updatedBoard = board.map((row, rIdx) =>
      row.map((cell, cIdx) => {
        if (rIdx === rowIndex && cIdx === colIndex) return currentPlayer.mark;
        return cell;
      })
    );

    setBoard(updatedBoard);
    setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
  };

  // 한칸 지우기 - 되돌리기
  const handleUndo = () => {
    if (gameState.history.length < 2) return;
    const newHistory = gameState.history.slice(0, -1);
    const previousBoard = newHistory[newHistory.length - 1];
    setGameState({
      board: previousBoard,
      currentPlayer: gameState.currentPlayer === "X" ? "O" : "X",
      winner: null, // 승리 상태 초기화
      history: newHistory,
      boardSize: gameState.boardSize,
    });
  };

  // 전체 리프레시
  const handleRefresh = () => {
    setGameState({
      board: initialBoard,
      currentPlayer: "X",
      winner: null,
      history: [initialBoard],
      boardSize: gameState.boardSize,
    });
  };

  return (
    <div>
      {gameState.currentPlayer && (
        <div>현재 플레이어: {gameState.currentPlayer}</div>
      )}

      {board.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((cell, colIndex) => (
            <button
              key={colIndex}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              style={{
                color: cell === player1.mark ? player1.color : player2.color,
              }}>
              {cell}
            </button>
          ))}
        </div>
      ))}
      {gameState.winner && <div>Winner: {gameState.winner}</div>}
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
};

export default GameBoard;
