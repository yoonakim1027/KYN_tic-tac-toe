import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Tic tac toe game</h1>
      <Link to="/setup">게임 시작</Link>
      <Link to="/records">기록된 게임 보기</Link>
    </div>
  );
};

export default Home;
