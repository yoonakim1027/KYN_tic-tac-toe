import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import GameSetup from "./pages/GameSetup";
import GameBoard from "./pages/GameBoard";
import GameRecord from "./pages/GameRecord";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setup" element={<GameSetup />} />
        <Route path="/game" element={<GameBoard />} />
        <Route path="/records" element={<GameRecord />} />
      </Routes>
    </Router>
  );
};

export default App;
