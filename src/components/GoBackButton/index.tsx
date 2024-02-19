import React from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const GoBackButton: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <IconButton
      onClick={goBack}
      sx={{ position: "absolute", top: 10, left: 10 }}>
      <ArrowBackIcon />
    </IconButton>
  );
};

export default GoBackButton;
