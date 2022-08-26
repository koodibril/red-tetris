import React, { useEffect, useMemo, useState } from "react";
import ScoreComponent from "./components/Score/Score";
import GridComponent from "./components/Grid/Grid";
import ActionsComponent from "./components/Tetraminos/Tetraminos";
import { useInterval } from "src/hooks/useInterval";
import { Tetraminos } from "./components/Tetraminos/Tetraminos.d";
import { Cell } from "./components/Grid/Grid.d";
import { Col, Row } from "antd";
import { socket } from "src/hooks/useSocket";

const Home: React.FC = () => {
  const generateGrid = () => {
    const grid: Cell[][] = [];
    for (let i = 0; i < 22; i++) {
      const newCol = [];
      for (let j = 0; j < 12; j++) {
        if (i === 0 || j === 0 || i === 21 || j === 11) {
          newCol.push({ value: 1, color: "grey" });
        } else {
          newCol.push({ value: 0, color: "lightgrey" });
        }
      }
      grid.push(newCol);
    }
    return grid;
  };
  const [tetra, setTetra] = useState<Tetraminos>();
  const [merge, setMerge] = useState<Cell[][]>(generateGrid());
  const [gameStatus, setGameStatus] = useState<string>("Waiting");
  // value: 0 => Empty
  // value: 1 => Block
  // value: 2 => Moving tetra
  // value: 3 => Played tetra

  const grid = useMemo(() => {
    const grid: Cell[][] = generateGrid();
    if (merge) {
      for (let i = 0; i < 22; i++) {
        for (let j = 0; j < 12; j++) {
          grid[i][j] = { ...merge[i][j] };
        }
      }
    }
    if (tetra) {
      tetra.shape.map((row: number[], rIndex: number) => {
        row.map((cell: number, cIndex: number) => {
          if (cell === 1) {
            grid[tetra.x + rIndex][tetra.y + cIndex].color = tetra.color;
            grid[tetra.x + rIndex][tetra.y + cIndex].value = 2;
          }
        });
      });
    }
    return grid;
  }, [tetra, merge]);
  const checkMerge = (tetra: Tetraminos) => {
    let touch = false;
    tetra.shape.map((row: number[], rIndex: number) => {
      row.map((cell: number, cIndex: number) => {
        if (
          cell === 1 &&
          grid &&
          grid[tetra.x + rIndex][tetra.y + cIndex].value !== 0 &&
          grid[tetra.x + rIndex][tetra.y + cIndex].value !== 2
        ) {
          touch = true;
        }
      });
    });
    return touch;
  };
  const mergeBoard = (tetra: Tetraminos) => {
    const newMerge = grid;
    tetra.shape.map((row: number[], rIndex: number) => {
      row.map((cell: number, cIndex: number) => {
        if (cell === 1 || cell === 3) {
          newMerge[tetra.x + rIndex][tetra.y + cIndex].value = 3;
        }
      });
    });
    let lines = 0;
    newMerge.map((row, index) => {
      let blocks = 0;
      row.forEach((cell) => {
        if (cell.value === 1) {
          blocks++;
        }
      });
      if (
        !row.find(
          (cell, index) => cell.value === 0 && index !== 0 && index !== 11
        ) &&
        blocks !== 12
      ) {
        const newLine = [];
        for (let j = 0; j < 12; j++) {
          if (index === 0 || j === 0 || index === 21 || j === 11) {
            newLine.push({ value: 1, color: "grey" });
          } else {
            newLine.push({ value: 0, color: "lightgrey" });
          }
        }
        lines++;
        newMerge.splice(index, 1);
        newMerge.splice(1, 0, newLine);
      }
    });
    if (lines > 1) socket.emit("order:newLine", lines - 1);
    setMerge(newMerge);
    if (newMerge[1].find((cell) => cell.value === 3)) {
      setGameStatus("Game Over");
      socket.emit("order:gameover", {
        room: window.location.href.split("/")[3].split("[")[0].slice(1),
        name: window.location.href.split("/")[3].split("[")[1].slice(0, -1),
        tetraminos: tetra,
      });
    } else {
      socket.emit("endTetra", {
        room: window.location.href.split("/")[3].split("[")[0].slice(1),
        name: window.location.href.split("/")[3].split("[")[1].slice(0, -1),
        tetraminos: tetra,
      });
      setTetra(undefined);
    }
  };
  useEffect(() => {
    socket.on("newTetra", (tetra: Tetraminos) => {
      if (gameStatus === "Waiting") {
        setGameStatus("Playing");
      }
      setTetra(tetra);
    });
    socket.on("winner", () => {
      setGameStatus("Winner");
    });
    socket.on("newline", (lines: number) => {
      for (let i = 0; i < lines; i++) {
        const newLine = [];
        for (let j = 0; j < 12; j++) {
          newLine.push({ value: 1, color: "grey" });
        }
        merge.push(newLine);
        merge.splice(1, 1);
        setMerge(merge);
      }
    });
    return () => {
      socket.off("newTetra");
      socket.off("winner");
      socket.off("newline");
    };
  }, [merge]);
  const tick = () => {
    if (gameStatus === "Playing") {
      if (tetra && tetra.value === 2) {
        const oldTetra = { ...tetra };
        oldTetra.x = oldTetra.x + 1;
        if (checkMerge(oldTetra)) {
          oldTetra.value = 2;
          oldTetra.x = oldTetra.x - 1;
          mergeBoard(oldTetra);
        } else {
          setTetra(oldTetra);
        }
      }
    }
  };
  useInterval(tick, 600);
  return (
    <Row>
      <Col span={8} offset={4}>
        <GridComponent grid={grid}></GridComponent>
        {tetra ? (
          <ActionsComponent
            tetra={tetra}
            control={setTetra}
            grid={grid}
            gameStatus={gameStatus}
          ></ActionsComponent>
        ) : null}
      </Col>
      <Col span={8} offset={4}>
        <ScoreComponent gameStatus={gameStatus}></ScoreComponent>
      </Col>
    </Row>
  );
};

export default Home;
