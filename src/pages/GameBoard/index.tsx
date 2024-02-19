import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type Mark = "X" | "O" | null;
type Board = Mark[][];

interface Player {
  mark: Mark;
  color: string;
}
interface GameState {
  boardSize: number;
  board: Board;
  currentPlayer: Player;
  winner: Mark | "Draw" | null;
  history: Board[];
  moveHistory: number[][];
}

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
  const [currentPlayer, setCurrentPlayer] = useState<Player>(() => {
    return Math.random() < 0.5 ? player1 : player2;
  });
  const [gameState, setGameState] = useState<GameState>({
    boardSize: boardSize,
    board: createInitialBoard(boardSize),
    currentPlayer: startingPlayer === player1.mark ? player1 : player2,
    winner: null,
    history: [createInitialBoard(boardSize)],
    moveHistory: [],
  });

  const checkWinner = (
    board: Board,
    winCondition: number
  ): Mark | "Draw" | null => {
    const size = board.length;
    let maxInRow,
      maxInColumn,
      maxDiag1 = 0,
      maxDiag2 = 0;
    let prevDiag1Mark = null,
      prevDiag2Mark = null;

    for (let i = 0; i < size; i++) {
      maxInRow = 0;
      maxInColumn = 0;
      let prevRowMark = null;
      let prevColumnMark = null;

      for (let j = 0; j < size; j++) {
        // 가로 방향 검사
        if (board[i][j] === prevRowMark && board[i][j] !== null) {
          maxInRow++;
        } else {
          maxInRow = 1;
          prevRowMark = board[i][j];
        }

        // 세로 방향 검사
        if (board[j][i] === prevColumnMark && board[j][i] !== null) {
          maxInColumn++;
        } else {
          maxInColumn = 1;
          prevColumnMark = board[j][i];
        }

        // 승리 조건 만족 검사
        if (maxInRow >= winCondition || maxInColumn >= winCondition) {
          return prevRowMark;
        }
      }

      // 대각선 1 방향 검사 (\ 방향)
      const diag1Cell = board[i][i];
      if (diag1Cell === prevDiag1Mark && diag1Cell !== null) {
        maxDiag1++;
      } else {
        maxDiag1 = 1;
        prevDiag1Mark = diag1Cell;
      }

      // 대각선 2 방향 검사 (/ 방향)
      const diag2Cell = board[i][size - i - 1];
      if (diag2Cell === prevDiag2Mark && diag2Cell !== null) {
        maxDiag2++;
      } else {
        maxDiag2 = 1;
        prevDiag2Mark = diag2Cell;
      }

      // 대각선 승리 조건 검사
      if (maxDiag1 >= winCondition || maxDiag2 >= winCondition) {
        return prevDiag1Mark;
      }
    }

    // 무승부 검사
    const isDraw = board.every((row) => row.every((cell) => cell !== null));
    return isDraw ? "Draw" : null;
  };

  // 셀 클릭
  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (!currentPlayer || board[rowIndex][colIndex] || gameState.winner) return;

    const updatedBoard = board.map((row, rIdx) =>
      row.map((cell, cIdx) =>
        cIdx === colIndex && rIdx === rowIndex ? currentPlayer.mark : cell
      )
    );
    const updatedMoveHistory = [...gameState.moveHistory, [rowIndex, colIndex]];

    const winner = checkWinner(updatedBoard, winCondition);
    setBoard(updatedBoard);
    setGameState((prevState) => ({
      ...prevState,
      board: updatedBoard,
      winner: winner,
      history: [...prevState.history, updatedBoard],
      moveHistory: updatedMoveHistory,
    }));
    setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
  };

  // 한칸 지우기 - 되돌리기
  const handleUndo = () => {
    if (gameState.history.length < 2) return;
    const newHistory = gameState.history.slice(0, -1);
    const previousBoard = newHistory[newHistory.length - 1];

    const lastPlayerMark =
      newHistory.length > 1
        ? gameState.history[gameState.history.length - 2][0][0]
        : null;

    let nextPlayer;
    if (lastPlayerMark === player1.mark) {
      nextPlayer = player2;
    } else {
      nextPlayer = player1;
    }

    setGameState({
      ...gameState,
      board: previousBoard,
      currentPlayer: nextPlayer,
      winner: null,
      history: newHistory,
    });
  };

  // 전체 리프레시
  const handleRefresh = () => {
    const newBoard = createInitialBoard(boardSize);
    setBoard(newBoard);
    setGameState({
      boardSize: boardSize,
      board: newBoard,
      currentPlayer: startingPlayer === player1.mark ? player1 : player2,
      winner: null,
      history: [newBoard],
      moveHistory: [],
    });
  };

  const saveGameRecord = () => {
    const { winCondition } = location.state as {
      winCondition: number;
    };

    const newRecord = {
      boardSize: gameState.boardSize,
      winCondition,
      winner: gameState.winner,
      moveHistory: gameState.moveHistory,
    };

    const gameRecords = JSON.parse(localStorage.getItem("gameRecords") || "[]");
    gameRecords.push(newRecord);
    localStorage.setItem("gameRecords", JSON.stringify(gameRecords));
  };

  useEffect(() => {
    // 게임 종료 조건 확인 후 기록 저장
    if (gameState.winner) {
      saveGameRecord();
    }
  }, [gameState.winner]);

  return (
    <div>
      <div>
        {currentPlayer && <div>현재 플레이어: {currentPlayer.mark}</div>}
      </div>

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
