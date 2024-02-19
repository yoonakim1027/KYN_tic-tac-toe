import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Typography, Container, Box } from "@mui/material";
import MainTitle from "../../components/MainTitle";

const Home: React.FC = () => {
  return (
    <Container maxWidth="xs" sx={{ marginTop: 10 }}>
      <Box textAlign="center" mt={5}>
        <MainTitle children={"틱택토 게임"} />
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
