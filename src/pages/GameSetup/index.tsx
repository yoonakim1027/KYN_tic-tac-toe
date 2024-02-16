import React from "react";
import { Link } from "react-router-dom";

const GameSetup: React.FC = () => {
  return (
    <div>
      <h1>Game Setup</h1>
      {/* 게임 설정 로직 */}
      <Link to="/game">게임 시작</Link>
    </div>
  );
};

export default GameSetup;
