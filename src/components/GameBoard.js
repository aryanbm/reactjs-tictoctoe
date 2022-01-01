import React, { useState } from "react";
import { Button } from "@material-ui/core";

function GameBoard() {
  const [isGameActive, setGameActive] = useState(true);
  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(Array(9).fill(""));

  const winningCodes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function winnerCheck(tiles) {
    let hasWinner = false;
    for (let i = 0; i <= 7; i++) {
      const winCode = winningCodes[i];
      let a = tiles[winCode[0]];
      let b = tiles[winCode[1]];
      let c = tiles[winCode[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        hasWinner = true;
        break;
      }
    }
    if (hasWinner) {
      alert(`Player "${turn}" has won`);
      setGameActive(false);
      return;
    }
  }

  function gameCheck(tiles) {
    for (let i = 0; i <= tiles.length; i++) {
      if (tiles[i] === "") {
        setGameActive(true);
        return;
      }
    }

    setGameActive(false);
  }

  const handleClick = (num) => {
    if (!isGameActive) {
      return;
    }
    let tiles = [...cells];
    if (turn === "X") {
      if (tiles[num] === "") {
        tiles[num] = "X";
        setTurn("O");
      }
    } else {
      if (tiles[num] === "") {
        tiles[num] = "O";
        setTurn("X");
      }
    }

    setCells(tiles);
    gameCheck(tiles);
    winnerCheck(tiles);
  };

  function refreshPage() {
    window.location.reload(false);
  }

  const Tile = ({ num }) => {
    return (
      <td className="tile" onClick={() => handleClick(num)}>
        {cells[num]}
      </td>
    );
  };

  return (
    <div
      style={{ background: "#FF4C4B", height: "100vh" }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      {!isGameActive ? (
        <div className="replay">
          <Button onClick={refreshPage}>REPLAY</Button>
        </div>
      ) : (
        ""
      )}
      <div className="turn">TURN: {turn}</div>
      <table>
        <tbody>
          <tr>
            <Tile num={0} />
            <Tile num={1} />
            <Tile num={2} />
          </tr>
          <tr>
            <Tile num={3} />
            <Tile num={4} />
            <Tile num={5} />
          </tr>
          <tr>
            <Tile num={6} />
            <Tile num={7} />
            <Tile num={8} />
          </tr>
        </tbody>
      </table>
      <div className="footer">ARYAN BAHMANI (960122680124)</div>
    </div>
  );
}

export default GameBoard;
