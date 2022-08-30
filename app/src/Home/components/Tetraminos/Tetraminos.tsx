import React, { useEffect } from "react";
import { useTetris, useTetrisActions } from "../../../ducks/tetris/actions/tetris";
import {
  matrixSizeBottom,
  matrixSizeLeft,
  matrixSizeRight,
  rotateClockwise,
  rotateCounterClockwise,
} from "../../../utils/utils";
import { Cell } from "../Grid/Grid.d";
import { Tetraminos } from "./Tetraminos.d";

const Actions: React.FC<{
  grid: Cell[][];
}> = (props) => {
  const { tetra, gameStatus } = useTetris();
  const { setTetra } = useTetrisActions();
  const checkMerge = (tetra: Tetraminos) => {
    let touch = false;
    tetra.shape.map((row: number[], rIndex: number) => {
      row.map((cell: number, cIndex: number) => {
        if (
          cell === 1 &&
          tetra.x + rIndex !== 0 &&
          props.grid &&
          props.grid[tetra.x + rIndex][tetra.y + cIndex].value !== 0 &&
          props.grid[tetra.x + rIndex][tetra.y + cIndex].value !== 2 &&
          props.grid[tetra.x + rIndex][tetra.y + cIndex].value !== 4
        ) {
          touch = true;
        }
      });
    });
    return touch;
  };
  const moveDown = (tetra: Tetraminos) => {
    const newTetra = { ...tetra };
    if (newTetra.x + matrixSizeBottom(tetra.shape) + 1 < 21) {
      newTetra.x = newTetra.x + 1;
      if (checkMerge(newTetra)) {
        newTetra.x = newTetra.x - 1;
      }
    }
    return newTetra;
  };
  const rotate = (tetra: Tetraminos) => {
    const oldTetra = { ...tetra };
    oldTetra.shape = rotateClockwise(tetra.shape);
    const sizeLeft = matrixSizeLeft(oldTetra.shape);
    const sizeRight = matrixSizeRight(oldTetra.shape);
    const sizeBottom = matrixSizeBottom(tetra.shape);
    if (oldTetra.y < 5 && oldTetra.y + sizeLeft - 1 < 0) {
      oldTetra.shape = rotateCounterClockwise(tetra.shape);
    } else if (oldTetra.y > 5 && oldTetra.y + sizeRight + 1 > 11) {
      oldTetra.shape = rotateCounterClockwise(tetra.shape);
    }
    if (oldTetra.x > 18 && oldTetra.x + sizeBottom + 1 > 21) {
      oldTetra.shape = rotateCounterClockwise(tetra.shape);
    }
    if (checkMerge(oldTetra)) {
      oldTetra.shape = rotateCounterClockwise(tetra.shape);
    }
    return oldTetra;
  };
  const moveLeft = (tetra: Tetraminos) => {
    const newTetra = { ...tetra };
    if (newTetra.y + matrixSizeLeft(tetra.shape) - 1 > 0) {
      newTetra.y = newTetra.y - 1;
      if (checkMerge(newTetra)) {
        newTetra.y = newTetra.y + 1;
      }
    }
    return newTetra;
  };
  const moveRight = (tetra: Tetraminos) => {
    const newTetra = { ...tetra };
    if (newTetra.y + matrixSizeRight(tetra.shape) + 1 < 11) {
      newTetra.y = newTetra.y + 1;
      if (checkMerge(newTetra)) {
        newTetra.y = newTetra.y - 1;
      }
    }
    return newTetra;
  };
  const fallDown = (tetra: Tetraminos) => {
    const newTetra = { ...tetra };
    while (!checkMerge(newTetra)) {
      newTetra.x = newTetra.x + 1;
    }
    newTetra.x = newTetra.x - 1;
    setTetra(newTetra);
  };
  const handleKeyPress = (e: KeyboardEvent) => {
    e.preventDefault();
    const key = e.key;
    let newTetra;
    if (gameStatus === "Playing" && tetra) {
      switch (key) {
        case " ":
          newTetra = moveDown(tetra);
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
            newTetra = rotate(tetra);
            setTetra(newTetra);
          }
          break;
        case "ArrowLeft":
          newTetra = moveLeft(tetra);
          setTetra(newTetra);
          break;
        case "ArrowRight":
          newTetra = moveRight(tetra);
          setTetra(newTetra);
          break;
        case "ArrowDown":
          fallDown(tetra);
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
