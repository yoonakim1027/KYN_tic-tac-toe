import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    <div>
      <h1>Game Record</h1>
      {gameRecords.length > 0 ? (
        <ul>
          {gameRecords.map((record, index) => (
            <li key={index}>
              Board Size: {record.boardSize}, Win Condition:{" "}
              {record.winCondition}, Winner: {record.winner}
              {record.moveHistory && (
                <div>
                  Move History:
                  <ul>
                    {record.moveHistory.map((move, moveIndex) => (
                      <li key={moveIndex}>{`Player ${
                        moveIndex % 2 === 0 ? 1 : 2
                      }: Row ${move[0]}, Column ${move[1]}`}</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No game records found.</p>
      )}
      <Link to="/">Home</Link>
    </div>
  );
};

export default GameRecordComponent;
