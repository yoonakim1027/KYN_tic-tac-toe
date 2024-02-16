import React from "react";
import { Link } from "react-router-dom";

const GameRecord: React.FC = () => {
  return (
    <div>
      <h1>Game Record</h1>
      {/* 게임 기록 로직 */}
      <Link to="/">홈으로</Link>
    </div>
  );
};

export default GameRecord;
