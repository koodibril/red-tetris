import React, { useEffect } from "react";
import { useTetris, useTetrisActions } from "../../../ducks/tetris/actions/tetris";
import { Cell } from "../Grid/Grid.d";
import { fallDown, moveDown, moveLeft, moveRight, rotate } from "./TetraminosActions";

const Actions: React.FC<{
  grid: Cell[][];
}> = (props) => {
  const { tetra, gameStatus } = useTetris();
  const { setTetra } = useTetrisActions();
  const handleKeyPress = (e: KeyboardEvent) => {
    e.preventDefault();
    const key = e.key;
    let newTetra;
    if (gameStatus === "Playing" && tetra) {
      switch (key) {
        case " ":
          newTetra = moveDown(tetra, props.grid);
          setTetra(newTetra);
          break;
        case "ArrowUp":
          if (
            tetra.shape[0][2] === 1 &&
            tetra.shape[0][1] === 1 &&
            tetra.shape[1][2] === 1 &&
            tetra.shape[1][1] === 1
          ) {
            break;
          } else {
            newTetra = rotate(tetra, props.grid);
            setTetra(newTetra);
          }
          break;
        case "ArrowLeft":
          newTetra = moveLeft(tetra, props.grid);
          setTetra(newTetra);
          break;
        case "ArrowRight":
          newTetra = moveRight(tetra, props.grid);
          setTetra(newTetra);
          break;
        case "ArrowDown":
          newTetra = fallDown(tetra, props.grid);
          setTetra(newTetra);
          break;
      }
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  });

  return <></>;
};

export default Actions;
