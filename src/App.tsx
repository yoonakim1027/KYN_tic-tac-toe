import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import GameSetup from "./pages/GameSetup";
import GameBoard from "./pages/GameBoard";
import GameRecord from "./pages/GameRecord";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./Theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setup" element={<GameSetup />} />
          <Route path="/game" element={<GameBoard />} />
          <Route path="/records" element={<GameRecord />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
