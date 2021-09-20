import React from "react";
import Square from "./square";

const style = {
  border: "4px solid darkblue",
  borderRadius: "10px",
  width: "250px",
  height: "250px",
  margin: "0 auto",
  display: "grid",
  gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
};

const Board = ({ value, squares, onClick }) => (
  <div style={style}>
    {squares.map((val, i) => {
      return <Square key={i} value={val} onClick={() => onClick(i)} />;
    })}
  </div>
);
export default Board;
