import React, { useEffect } from "react";
import { useTetris, useTetrisActions } from "../../../ducks/tetris/actions/tetris";
import { Cell } from "../Grid/Grid.d";
import { keyControls } from "./TetraminosActions";

const Actions: React.FC<{
  grid: Cell[][];
}> = (props) => {
  const { tetra, gameStatus } = useTetris();
  const { setTetra } = useTetrisActions();
  const handleKeyPress = (e: KeyboardEvent) => {
    e.preventDefault();
    const key = e.key;
    const newTetra = keyControls(key, tetra, props.grid, gameStatus);
    setTetra(newTetra);
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  });

  return <></>;
};

export default Actions;
