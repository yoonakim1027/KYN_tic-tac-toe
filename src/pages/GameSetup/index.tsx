import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GameSetup: React.FC = () => {
  const navigate = useNavigate();

  // 게임판 크기와 승리 조건 상태
  const [boardSize, setBoardSize] = useState(3);
  const [winCondition, setWinCondition] = useState(3);

  // 게임을 시작할 플레이어 랜덤 설정
  const [startingPlayer, setStartingPlayer] = useState("");

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

  // 게임 설정 변경 핸들러
  const handleBoardSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSize = parseInt(event.target.value);
    setBoardSize(newSize);
    setWinCondition(Math.min(winCondition, newSize));
  };

  // 게임 승리 조건 변경 핸들러
  const handleWinConditionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setWinCondition(parseInt(event.target.value));
  };

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
    <div>
      <h1>Game Setup</h1>
      <label>
        Board Size:
        <select value={boardSize} onChange={handleBoardSizeChange}>
          <option value="3">3 x 3</option>
          <option value="4">4 x 4</option>
          <option value="5">5 x 5</option>
          <option value="6">6 x 6</option>
          <option value="7">7 x 7</option>
        </select>
      </label>
      <label>
        Starting Player:
        <select value={startingPlayer} onChange={handleStartingPlayerChange}>
          <option value="Random">Random</option>
          <option value="X">Player 1 (X)</option>
          <option value="O">Player 2 (O)</option>
        </select>
      </label>
      <label>
        Win Condition:
        <select value={winCondition} onChange={handleWinConditionChange}>
          {[...Array(boardSize - 2).keys()].map((i) => (
            <option key={i + 3} value={i + 3}>
              {i + 3}
            </option>
          ))}
        </select>
      </label>
      <div>
        <label>
          Player 1 Mark:
          <input
            type="text"
            value={player1Mark}
            onChange={(e) => setPlayer1Mark(e.target.value)}
          />
        </label>
        <label>
          Player 1 Color:
          <input
            type="color"
            value={player1Color}
            onChange={(e) => setPlayer1Color(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Player 2 Mark:
          <input
            type="text"
            value={player2Mark}
            onChange={(e) => setPlayer2Mark(e.target.value)}
          />
        </label>
        <label>
          Player 2 Color:
          <input
            type="color"
            value={player2Color}
            onChange={(e) => setPlayer2Color(e.target.value)}
          />
        </label>
      </div>
      <button onClick={startGame}>게임 시작</button>
    </div>
  );
};

export default GameSetup;
