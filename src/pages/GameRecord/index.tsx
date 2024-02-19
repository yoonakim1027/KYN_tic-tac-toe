import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  Box,
  Container,
} from "@mui/material";
import CommonContainer from "../../components/CommonContainer";

interface GameRecord {
  boardSize: number;
  winCondition: number;
  winner: string;
  moveHistory?: number[][];
}

const GameRecordComponent: React.FC = () => {
  const [gameRecords, setGameRecords] = useState<GameRecord[]>([]);

  useEffect(() => {
    const records = JSON.parse(localStorage.getItem("gameRecords") || "[]");
    setGameRecords(records);
  }, []);

  return (
    <CommonContainer>
      <Typography variant="h4" gutterBottom>
        Game Record
      </Typography>
      {gameRecords.length > 0 ? (
        gameRecords.map((record, index) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">Game {index + 1}</Typography>
              <Typography>
                Board Size: {record.boardSize}, Win Condition:{" "}
                {record.winCondition}, Winner: {record.winner}
              </Typography>
              {record.moveHistory && (
                <>
                  <Typography>Move History:</Typography>
                  <List dense>
                    {record.moveHistory.map((move, moveIndex) => (
                      <ListItem key={moveIndex}>
                        Player {moveIndex % 2 === 0 ? 1 : 2}: Row {move[0]},
                        Column {move[1]}
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No game records found.</Typography>
      )}
      <Box mt={2}>
        <Link to="/">Home</Link>
      </Box>
    </CommonContainer>
  );
};
export default GameRecordComponent;
