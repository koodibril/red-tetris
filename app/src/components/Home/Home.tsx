import React, { useEffect, useState } from "react";
import ScoreComponent from "./components/Score/Score";
import GridComponent from "./components/Grid/Grid";
import TetraminosComponent from "./components/Tetraminos/Tetraminos";

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
        shape: [
          [1, 0, 0, 0],
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
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
