import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GameSetup: React.FC = () => {
  const navigate = useNavigate();

  // 게임판 크기
  const [boardSize, setBoardSize] = useState(3);
  // 승리 조건
  const [winCondition, setWinCondition] = useState(3);

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
    navigate("/game", { state: { boardSize, winCondition } });
  };

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
        Win Condition:
        <select value={winCondition} onChange={handleWinConditionChange}>
          {[...Array(boardSize - 2).keys()].map((i) => (
            <option key={i + 3} value={i + 3}>
              {i + 3}
            </option>
          ))}
        </select>
      </label>
      <button onClick={startGame}>게임 시작</button>
    </div>
  );
};

export default GameSetup;
