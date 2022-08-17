import React, { useEffect, useState } from "react";
import ScoreComponent from "./components/Score/Score";
import GridComponent from "./components/Grid/Grid";
import TetraminosComponent from "./components/Tetraminos/Tetraminos";

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
  // value: 0 => Empty
  // value: 1 => Moving tetra
  // value: 2 => Played tetra

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

  return (
    <>
      {tetra ? <GridComponent tetra={tetra}></GridComponent> : null}
      <TetraminosComponent
        tetra={tetra}
        control={setTetra}
      ></TetraminosComponent>
    </>
  );
};

export default Home;
