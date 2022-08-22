import React, { useEffect, useMemo, useState } from "react";
import ScoreComponent from "./components/Score/Score";
import GridComponent from "./components/Grid/Grid";
import ActionsComponent from "./components/Tetraminos/Tetraminos";
import { useInterval } from "src/hooks/useInterval";
import { Tetraminos } from "./components/Tetraminos/Tetraminos.d";
import { Cell } from "./components/Grid/Grid.d";
import { Col, Row } from "antd";

const tetraminos = [
  {
    x: 0,
    y: 5,
    value: 2,
    color: "cyan",
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  },
  {
    x: 0,
    y: 5,
    value: 2,
    color: "blue",
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
  },
  {
    x: 0,
    y: 5,
    value: 2,
    color: "orange",
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
  },
  {
    x: 0,
    y: 5,
    value: 2,
    color: "yellow",
    shape: [
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  },
  {
    x: 0,
    y: 5,
    value: 2,
    color: "green",
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
  },
  {
    x: 0,
    y: 5,
    value: 2,
    color: "purple",
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
  },
  {
    x: 0,
    y: 5,
    value: 2,
    color: "red",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
  },
];

const Home: React.FC = () => {
  const [tetra, setTetra] = useState<Tetraminos>();
  const [merge, setMerge] = useState<Cell[][]>();
  const [gameStatus, setGameStatus] = useState<string>("Playing");
  // value: 0 => Empty
  // value: 1 => Block
  // value: 2 => Moving tetra
  // value: 3 => Played tetra

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
    newMerge.map((row, index) => {
      if (
        !row.find((cell) => cell.value === 0) &&
        index !== 0 &&
        index !== 21
      ) {
        const newLine = [];
        for (let j = 0; j < 12; j++) {
          if (index === 0 || j === 0 || index === 21 || j === 11) {
            newLine.push({ value: 1, color: "grey" });
          } else {
            newLine.push({ value: 0, color: "lightgrey" });
          }
        }
        newMerge.splice(index, 1);
        newMerge.splice(1, 0, newLine);
      }
    });
    setMerge(newMerge);
    if (newMerge[1].find((cell) => cell.value === 3)) {
      setGameStatus("Game Over");
    } else {
      setTetra(undefined);
    }
  };
  useEffect(() => {
    if (tetra === undefined) {
      const falseTetra = tetraminos[
        Math.floor(Math.random() * (6 - 0)) + 0
      ] as Tetraminos;
      setTetra(falseTetra);
    }
  });
  const tick = () => {
    if (gameStatus !== "Game Over") {
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
