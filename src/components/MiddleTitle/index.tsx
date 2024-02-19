import React from "react";
import { Typography, TypographyProps } from "@mui/material";

interface SecondaryTextProps extends TypographyProps {
  children: React.ReactNode;
}

const MiddleTitle: React.FC<SecondaryTextProps> = ({
  color = "#7c7c7c",
  children,
  ...props
}) => {
  return (
    <Typography
      variant="body1"
      sx={{
        textAlign: "left",
        fontSize: "18px",
        marginTop: "20px",
        lineHeight: "24px",
        fontFamily: "NanumSquareNeo-Rg, sans-serif",
        color: color,
        ...props.sx,
      }}
      {...props}>
      {children}
    </Typography>
  );
};

export default MiddleTitle;
