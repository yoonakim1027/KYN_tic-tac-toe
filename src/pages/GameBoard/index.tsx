import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Box, Typography, Grid, Paper, Container } from "@mui/material";
import GoBackButton from "../../components/GoBackButton";
import WinnerModal from "../../components/WinnerModal";
import CommonContainer from "../../components/CommonContainer";
import MainTitle from "../../components/MainTitle";
import MiddleTitle from "../../components/MiddleTitle";

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

    const checkLine = (
      startRow: number,
      startCol: number,
      deltaRow: number,
      deltaCol: number
    ) => {
      let mark = board[startRow][startCol];
      let count = 1;

      for (let step = 1; step < winCondition; step++) {
        const newRow = startRow + step * deltaRow;
        const newCol = startCol + step * deltaCol;
        if (
          newRow < 0 ||
          newRow >= size ||
          newCol < 0 ||
          newCol >= size ||
          board[newRow][newCol] !== mark
        ) {
          return null;
        }
        count++;
      }

      return count === winCondition ? mark : null;
    };

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (board[i][j]) {
          if (j <= size - winCondition && checkLine(i, j, 0, 1))
            return board[i][j];
          if (i <= size - winCondition && checkLine(i, j, 1, 0))
            return board[i][j];
          if (
            i <= size - winCondition &&
            j <= size - winCondition &&
            checkLine(i, j, 1, 1)
          )
            return board[i][j];
          if (
            i <= size - winCondition &&
            j >= winCondition - 1 &&
            checkLine(i, j, 1, -1)
          )
            return board[i][j];
        }
      }
    }

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
    if (gameState.history.length <= 1 || gameState.moveHistory.length < 1)
      return;

    const newHistory = gameState.history.slice(0, -1);
    const newMoveHistory = gameState.moveHistory.slice(0, -1);
    const previousBoard = newHistory[newHistory.length - 1];

    const nextPlayer =
      gameState.moveHistory.length % 2 === 0 ? player2 : player1;

    setBoard(previousBoard);
    setCurrentPlayer(nextPlayer);
    setGameState((prevState) => ({
      ...prevState,
      board: previousBoard,
      currentPlayer: nextPlayer,
      winner: null,
      history: newHistory,
      moveHistory: newMoveHistory,
    }));
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
    if (gameState.winner) {
      saveGameRecord();
      setModalVisible(true);
    }
  }, [gameState.winner]);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <CommonContainer>
      <WinnerModal
        open={modalVisible}
        onRefresh={() => (handleRefresh(), setModalVisible(false))}
        onClose={() => setModalVisible(false)}
        winner={gameState.winner ? gameState.winner : ""}
      />
      <GoBackButton />
      <MainTitle children={"게임 보드판"} color={"#000000"} />

      <Box textAlign="right" marginBottom={4}>
        {currentPlayer && (
          <MiddleTitle>
            현재 플레이어 :{" "}
            <span style={{ color: currentPlayer.color }}>
              {currentPlayer.mark}
            </span>
          </MiddleTitle>
        )}
        {gameState.winner && (
          <Typography variant="h6" color="success.main">
            승자 : {gameState.winner}
          </Typography>
        )}
      </Box>
      <Grid container spacing={2} justifyContent="center">
        {board.map((row, rowIndex) => (
          <Grid
            key={rowIndex}
            item
            container
            spacing={1}
            justifyContent="center">
            {row.map((cell, colIndex) => (
              <Grid key={colIndex} item>
                <Paper
                  elevation={3}
                  sx={{
                    height: 80,
                    width: 80,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: cell
                      ? cell === player1.mark
                        ? player1.color
                        : player2.color
                      : "#e0e0e0",
                  }}
                  onClick={() => handleCellClick(rowIndex, colIndex)}>
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{ color: "text.primary" }}>
                    {cell}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
      <Box textAlign="center" marginTop={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUndo}
          sx={{ marginRight: 2 }}>
          무르기
        </Button>
        <Button variant="contained" color="secondary" onClick={handleRefresh}>
          재시작
        </Button>
      </Box>
    </CommonContainer>
  );
};

export default GameBoard;
