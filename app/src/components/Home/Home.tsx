import React, { useEffect, useMemo, useState } from "react";
import ScoreComponent from "./components/Score/Score";
import GridComponent from "./components/Grid/Grid";
import TetraminosComponent from "./components/Tetraminos/Tetraminos";
import { useInterval } from "src/hooks/useInterval";

const shape1 = [
  [0, 0, 0, 0],
  [1, 1, 1, 1],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
const shape2 = [
  [1, 0, 0],
  [1, 1, 1],
  [0, 0, 0],
];
const shape3 = [
  [0, 0, 1],
  [1, 1, 1],
  [0, 0, 0],
];
const shape4 = [
  [0, 1, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
const shape5 = [
  [0, 1, 1],
  [1, 1, 0],
  [0, 0, 0],
];
const shape6 = [
  [0, 1, 0],
  [1, 1, 1],
  [0, 0, 0],
];
const shape7 = [
  [1, 1, 0],
  [0, 1, 1],
  [0, 0, 0],
];

const Home: React.FC = () => {
  const [tetra, setTetra] = useState<{
    x: number;
    y: number;
    value: number;
    color: string;
    shape: number[][];
  }>();
  const [merge, setMerge] = useState<{ value: string }[][]>();
  // value: 0 => Empty
  // value: 1 => Moving tetra
  // value: 2 => Played tetra

  const grid = useMemo(() => {
    let grid: { value: string }[][] = [];
    if (merge) {
      grid = [...merge];
      console.log("grid copy merge");
    }
    for (let i = 0; i < 22; i++) {
      const newCol = [];
      for (let j = 0; j < 12; j++) {
        if (i === 0 || j === 0 || i === 21 || j === 11) {
          newCol.push({ x: i, y: j, value: "grey" });
        } else {
          newCol.push({ x: i, y: j, value: "lightgrey" });
        }
      }
      grid.push(newCol);
    }
    if (tetra) {
      tetra.shape.map((row: any, rIndex: number) => {
        row.map((cell: any, cIndex: number) => {
          if (cell === 1) {
            grid[tetra.x + rIndex][tetra.y + cIndex].value = tetra.color;
          }
        });
      });
    }
    return grid;
  }, [tetra, merge]);
  const checkMerge = (tetra: any) => {
    let touch = false;
    tetra.shape.map((row: any, rIndex: number) => {
      row.map((cell: any, cIndex: number) => {
        if (
          cell === 1 &&
          grid &&
          grid[tetra.x + rIndex][tetra.y + cIndex].value !== "lightgrey" &&
          grid[tetra.x + rIndex][tetra.y + cIndex].value !== tetra.color
        ) {
          touch = true;
        }
      });
    });
    return touch;
  };
  const mergeBoard = (tetra: any) => {
    const newMerge = grid;
    tetra.shape.map((row: any, rIndex: number) => {
      row.map((cell: any, cIndex: number) => {
        if (cell === 1) {
          newMerge[tetra.x + rIndex][tetra.y + cIndex].value =
            "light" + tetra.color;
        }
      });
    });
    setMerge(newMerge);
    setTetra(undefined);
  };
  useEffect(() => {
    if (tetra === undefined) {
      const falseTetra = {
        x: 4,
        y: 5,
        value: 1,
        color: "red",
        shape: shape3,
      };
      setTetra(falseTetra);
    }
  });
  const tick = () => {
    if (tetra && tetra.value === 1) {
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
  };
  useInterval(tick, 2000);
  return (
    <>
      {tetra ? <GridComponent grid={grid}></GridComponent> : null}
      <TetraminosComponent
        tetra={tetra}
        control={setTetra}
      ></TetraminosComponent>
    </>
  );
};

export default Home;
