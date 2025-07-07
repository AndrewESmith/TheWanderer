/* import React from "react";
import "./maze.css";

const CELL_TYPES = {
  EMPTY: "empty",
  PLAYER: "player",
  ROCK: "rock",
  SOIL: "soil",
  DIAMOND: "diamond",
  BOULDER: "boulder",
  BOMB: "bomb",
  EXIT: "exit",
};

const sampleMaze = [
  ["rock", "rock", "rock", "rock", "rock", "rock", "rock", "rock"],
  ["rock", "soil", "diamond", "empty", "boulder", "soil", "bomb", "rock"],
  ["rock", "empty", "rock", "empty", "rock", "empty", "empty", "rock"],
  ["rock", "player", "empty", "diamond", "empty", "soil", "exit", "rock"],
  ["rock", "rock", "rock", "rock", "rock", "rock", "rock", "rock"],
];

export default function maze() {
  return (
    <div className="maze-grid">
      {sampleMaze.map((row, y) =>
        row.map((cell, x) => (
          <div key={`${y}-${x}`} className={`cell ${cell}`}></div>
        ))
      )}
    </div>
  );
} */