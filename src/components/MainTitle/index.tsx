import React from "react";
import { Typography, TypographyProps } from "@mui/material";

interface MainTitleProps extends TypographyProps {
  children: React.ReactNode;
  color?: string;
}

const MainTitle: React.FC<MainTitleProps> = ({
  children,
  color = "#3A58FF",
}) => {
  return (
    <Typography
      variant="h1"
      gutterBottom
      sx={{
        fontWeight: "500",
        textAlign: "center",
        fontSize: "64px",
        fontFamily: "NanumSquareNeo-Bd, sans-serif",
        color: color,
      }}>
      {children}
    </Typography>
  );
};

export default MainTitle;
