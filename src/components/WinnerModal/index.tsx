import React from "react";
import { Button, Box, Typography, Modal, styled } from "@mui/material";

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ModalBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
  maxWidth: 400,
  textAlign: "center",
}));

interface WinnerModalProps {
  open: boolean;
  onClose: () => void;
  onRefresh: () => void;

  winner: string;
}

const WinnerModal: React.FC<WinnerModalProps> = ({
  open,
  onClose,
  onRefresh,
  winner,
}) => {
  return (
    <StyledModal
      open={open}
      onClose={onClose}
      aria-labelledby="winner-modal-title"
      aria-describedby="winner-modal-description">
      <ModalBox>
        <Typography id="winner-modal-title" variant="h6" component="h2">
          축하합니다!
        </Typography>
        <Typography id="winner-modal-description" sx={{ mt: 2 }}>
          {winner === "Draw" ? "무승부 입니다." : `승자: ${winner}`}
        </Typography>
        <Box>
          <Button onClick={onRefresh} sx={{ mt: 2 }}>
            다시하기
          </Button>
          <Button onClick={onClose} sx={{ mt: 2 }}>
            닫기
          </Button>
        </Box>
      </ModalBox>
    </StyledModal>
  );
};

export default WinnerModal;
