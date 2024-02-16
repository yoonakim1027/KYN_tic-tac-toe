import React from "react";
import { Link } from "react-router-dom";

const GameBoard: React.FC = () => {
  return (
    <div>
      <h1>Game Board</h1>
      {/* 게임 보드 로직 */}
      <Link to="/">홈으로</Link>
    </div>
  );
};

export default GameBoard;
