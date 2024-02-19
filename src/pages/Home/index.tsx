import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Typography, Container, Box } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={5}>
        <Typography variant="h2" gutterBottom>
          Tic Tac Toe Game
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/setup"
          sx={{ margin: 1 }}>
          게임 시작
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={RouterLink}
          to="/records"
          sx={{ margin: 1 }}>
          기록된 게임 보기
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
