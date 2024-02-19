import React from "react";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";

interface CommonContainerProps {
  children: React.ReactNode;
}

const CommonContainer: React.FC<CommonContainerProps> = ({ children }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        "--swiper-theme-color": "#007aff",
        "--swiper-navigation-size": "44px",
        listStyle: "none",
        width: "100%",
        ml: "auto",
        mr: "auto",
        p: "50px 0",
        fontFamily: "NanumSquareNeo-Bd, sans-serif;",
      }}>
      <Paper sx={{ padding: 5, borderRadius: "20px" }}>{children}</Paper>
    </Container>
  );
};

export default CommonContainer;
