import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";
import GoBackButton from "../../components/GoBackButton";
import CommonContainer from "../../components/CommonContainer";

const GameSetup: React.FC = () => {
  const navigate = useNavigate();

  // 게임판 크기와 승리 조건 상태
  const [boardSize, setBoardSize] = useState(3);
  const [winCondition, setWinCondition] = useState(3);

  // 게임을 시작할 플레이어 랜덤 설정
  const [startingPlayer, setStartingPlayer] = useState("");

  const goBack = () => {
    navigate(-1);
  };

  const handleStartingPlayerChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStartingPlayer(event.target.value);
  };

  // 플레이어 마크와 색상 상태
  const [player1Mark, setPlayer1Mark] = useState("X");
  const [player1Color, setPlayer1Color] = useState("#0000ff");
  const [player2Color, setPlayer2Color] = useState("#ff0000");
  const [player2Mark, setPlayer2Mark] = useState("O");

  const startGame = () => {
    navigate("/game", {
      state: {
        boardSize,
        winCondition,
        player1: { mark: player1Mark, color: player1Color },
        player2: { mark: player2Mark, color: player2Color },
        startingPlayer:
          startingPlayer === "Random"
            ? Math.random() < 0.5
              ? "X"
              : "O"
            : startingPlayer,
      },
    });
  };

  // 랜덤으로 시작 플레이어 설정
  useEffect(() => {
    const randomPlayer = Math.random() < 0.5 ? "X" : "O";
    setStartingPlayer(randomPlayer);
  }, []);
  // 로컬 스토리지에서 게임 설정 불러오기
  useEffect(() => {
    const savedBoardSize = parseInt(localStorage.getItem("boardSize") || "3");
    const savedWinCondition = parseInt(
      localStorage.getItem("winCondition") || "3"
    );
    setBoardSize(savedBoardSize);
    // 승리 조건은 게임판 크기를 넘을 수 없음 + 최소 3개 이상
    setWinCondition(Math.min(savedWinCondition, savedBoardSize));
  }, []);

  // 게임 설정 저장 - 로컬 스토리지
  useEffect(() => {
    localStorage.setItem("boardSize", boardSize.toString());
    localStorage.setItem("winCondition", winCondition.toString());
  }, [boardSize, winCondition]);

  return (
    <CommonContainer>
      <GoBackButton />
      <Typography variant="h4" gutterBottom>
        게임 설정
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>보드 크기</InputLabel>
        <Select
          value={boardSize}
          label="Board Size"
          onChange={(e) =>
            setBoardSize(parseInt(e.target.value as string, 10))
          }>
          <MenuItem value={3}>3 x 3</MenuItem>
          <MenuItem value={4}>4 x 4</MenuItem>
          <MenuItem value={5}>5 x 5</MenuItem>
          <MenuItem value={6}>6 x 6</MenuItem>
          <MenuItem value={7}>7 x 7</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>플레이어 정보</InputLabel>
        <Select
          value={startingPlayer}
          label="Starting Player"
          onChange={(e) => setStartingPlayer(e.target.value)}>
          <MenuItem value="Random">랜덤</MenuItem>
          <MenuItem value="X">플레이어 1 (X)</MenuItem>
          <MenuItem value="O">플레이어 2 (O)</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>우승 조건</InputLabel>
        <Select
          value={winCondition}
          label="우승 조건"
          onChange={(e) =>
            setWinCondition(parseInt(e.target.value as string, 10))
          }>
          {[...Array(boardSize - 2).keys()].map((i) => (
            <MenuItem key={i + 3} value={i + 3}>
              {i + 3}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box display="flex" justifyContent="space-between" marginTop={2}>
        <TextField
          label="플레이어 1의 마크"
          variant="outlined"
          value={player1Mark}
          onChange={(e) => setPlayer1Mark(e.target.value)}
        />
        <input
          type="color"
          value={player1Color}
          onChange={(e) => setPlayer1Color(e.target.value)}
          style={{ height: 56, border: "1px solid #ced4da", borderRadius: 4 }}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" marginTop={2}>
        <TextField
          label="플레이어 2의 마크"
          variant="outlined"
          value={player2Mark}
          onChange={(e) => setPlayer2Mark(e.target.value)}
        />
        <input
          type="color"
          value={player2Color}
          onChange={(e) => setPlayer2Color(e.target.value)}
          style={{ height: 56, border: "1px solid #ced4da", borderRadius: 4 }}
        />
      </Box>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={startGame}
        sx={{ mt: 3 }}>
        게임 시작
      </Button>
    </CommonContainer>
  );
};

export default GameSetup;
