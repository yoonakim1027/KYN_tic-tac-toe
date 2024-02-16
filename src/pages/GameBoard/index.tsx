import React, { useState } from "react";

type Mark = "X" | "O" | null;
type Board = Mark[][];

interface GameState {
  boardSize: number;
  board: Board;
  currentPlayer: Mark;
  winner: Mark | "Draw" | null;
  history: Board[];
}

const initialBoard: Board = Array(3)
  .fill(null)
  .map(() => Array(3).fill(null));

const createInitialBoard = (size: number): Board =>
  Array(size)
    .fill(null)
    .map(() => Array(size).fill(null));

const GameBoard: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    boardSize: 3, // 초기 보드 크기는 3x3
    board: createInitialBoard(3),
    currentPlayer: "X",
    winner: null,
    history: [createInitialBoard(3)],
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
    if (gameState.board[rowIndex][colIndex] || gameState.winner) return;

    const newBoard = gameState.board.map((row, rIndex) =>
      row.map((cell, cIndex) => {
        if (rIndex === rowIndex && cIndex === colIndex)
          return gameState.currentPlayer;
        return cell;
      })
    );

    const newHistory = [...gameState.history, newBoard];
    const winner = checkWinner(newBoard);

    setGameState({
      board: newBoard,
      currentPlayer: gameState.currentPlayer === "X" ? "O" : "X",
      winner: winner,
      history: newHistory,
      boardSize: 3,
    });
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

  // 보드 크기 변경 핸들러 -> 3x3 / 4x4 / 5x5
  const handleBoardSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSize = parseInt(event.target.value);
    setGameState({
      ...gameState,
      boardSize: newSize,
      board: createInitialBoard(newSize),
      winner: null,
      history: [createInitialBoard(newSize)],
    });
  };

  return (
    <div>
      <select value={gameState.boardSize} onChange={handleBoardSizeChange}>
        <option value="3">3 x 3</option>
        <option value="4">4 x 4</option>
        <option value="5">5 x 5</option>
      </select>
      {gameState.currentPlayer && (
        <div>현재 플레이어: {gameState.currentPlayer}</div>
      )}

      <div>
        {gameState.board.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((cell, colIndex) => (
              <button
                key={colIndex}
                onClick={() => handleCellClick(rowIndex, colIndex)}>
                {cell}
              </button>
            ))}
          </div>
        ))}
      </div>
      {gameState.winner && <div>Winner: {gameState.winner}</div>}
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
};

export default GameBoard;
