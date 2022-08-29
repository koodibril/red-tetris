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
  const [score, setScore] = useState(0);
  // value: 0 => Empty
  // value: 1 => Block
  // value: 2 => Moving tetra
  // value: 3 => Played tetra
  // value: 4 => Shadow

  const checkMerge = (tetra: Tetraminos, grid: Cell[][]) => {
    let touch = false;
    tetra.shape.map((row: number[], rIndex: number) => {
      row.map((cell: number, cIndex: number) => {
        if (
          cell === 1 &&
          tetra.x + rIndex !== 0 &&
          grid &&
          grid[tetra.x + rIndex][tetra.y + cIndex].value !== 0 &&
          grid[tetra.x + rIndex][tetra.y + cIndex].value !== 2 &&
          grid[tetra.x + rIndex][tetra.y + cIndex].value !== 4
        ) {
          touch = true;
        }
      });
    });
    return touch;
  };
  const createShadow = (tetra: Tetraminos, grid: Cell[][]) => {
    const newTetra = { ...tetra };
    while (!checkMerge(newTetra, grid)) {
      newTetra.x = newTetra.x + 1;
    }
    newTetra.x = newTetra.x - 1;
    return newTetra;
  };
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
      const shadow = createShadow(tetra, grid);
      tetra.shape.map((row: number[], rIndex: number) => {
        row.map((cell: number, cIndex: number) => {
          if (
            cell === 1 &&
            shadow.x + rIndex > 0 &&
            shadow.x + rIndex < 21 &&
            shadow.y + cIndex > 0 &&
            shadow.y + cIndex < 11
          ) {
            grid[shadow.x + rIndex][shadow.y + cIndex].color = tetra.color;
            grid[shadow.x + rIndex][shadow.y + cIndex].value = 4;
          }
          if (
            cell === 1 &&
            tetra.x + rIndex > 0 &&
            tetra.x + rIndex < 21 &&
            tetra.y + cIndex > 0 &&
            tetra.y + cIndex < 11
          ) {
            grid[tetra.x + rIndex][tetra.y + cIndex].color = tetra.color;
            grid[tetra.x + rIndex][tetra.y + cIndex].value = 2;
          }
        });
      });
    }
    return grid;
  }, [tetra, merge]);
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
    switch (lines) {
      case 1:
        setScore(score + 40);
        break;
      case 2:
        setScore(score + 100);
        break;
      case 3:
        setScore(score + 300);
        break;
      case 4:
        setScore(score + 1200);
        break;
    }
    if (lines > 0) socket.emit("order:newLine", lines);
    setMerge(newMerge);
    if (newMerge[1].find((cell) => cell.value === 3)) {
      setGameStatus("Game Over");
      socket.emit("order:gameover", {
        room: window.location.href.split("/")[3].split("[")[0],
        name: window.location.href.split("/")[3].split("[")[1].slice(0, -1),
        tetraminos: tetra,
      });
    } else {
      socket.emit("endTetra", {
        room: window.location.href.split("/")[3].split("[")[0],
        name: window.location.href.split("/")[3].split("[")[1].slice(0, -1),
        tetraminos: tetra,
      });
      setTetra(undefined);
    }
  };
  useEffect(() => {
    socket.on("newTetra", (tetra: Tetraminos) => {
      if (
        gameStatus === "Waiting" ||
        gameStatus === "Winner" ||
        gameStatus === "Game Over"
      ) {
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
        if (checkMerge(oldTetra, grid)) {
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
    <Row justify="space-around">
      <Col span={4}></Col>
      <Col span={12}>
        <Row style={{ width: "600px" }}>
          <GridComponent grid={grid}></GridComponent>
          {tetra ? (
            <ActionsComponent
              tetra={tetra}
              control={setTetra}
              grid={grid}
              gameStatus={gameStatus}
            ></ActionsComponent>
          ) : null}
          <ScoreComponent
            gameStatus={gameStatus}
            score={score}
            reset={setMerge}
          ></ScoreComponent>
        </Row>
      </Col>
      <Col span={4}></Col>
    </Row>
  );
};

export default Home;
