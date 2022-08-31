import { matrixSizeBottom, matrixSizeLeft, matrixSizeRight, rotateClockwise, rotateCounterClockwise } from "../../../utils/utils";
import { Cell } from "../Grid/Grid.d";
import { Tetraminos } from "./Tetraminos.d";

export const checkMerge = (tetra: Tetraminos, grid: Cell[][]) => {
    let touch = false;
    tetra.shape.forEach((row: number[], rIndex: number) => {
      row.forEach((cell: number, cIndex: number) => {
        if (
          cell === 1 &&
          tetra.x + rIndex !== 0 &&
          grid &&
          grid[tetra.x + rIndex][tetra.y + cIndex].value !== undefined &&
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


export const moveDown = (tetra: Tetraminos, grid: Cell[][]) => {
    const newTetra = { ...tetra };
    if (newTetra.x + matrixSizeBottom(tetra.shape) < 21) {
      newTetra.x = newTetra.x + 1;
      if (checkMerge(newTetra, grid)) {
        newTetra.x = newTetra.x - 1;
      }
    }
    return newTetra;
  };

export const rotate = (tetra: Tetraminos, grid: Cell[][]) => {
  const oldTetra = { ...tetra };
  oldTetra.shape = rotateClockwise(tetra.shape);
  if (checkMerge(oldTetra, grid)) {
    oldTetra.shape = tetra.shape;
  }
  return oldTetra;
};

export const moveLeft = (tetra: Tetraminos, grid: Cell[][]) => {
  const newTetra = { ...tetra };
  if (newTetra.y + matrixSizeLeft(tetra.shape) - 1 > 0) {
    newTetra.y = newTetra.y - 1;
    if (checkMerge(newTetra, grid)) {
      newTetra.y = newTetra.y + 1;
    }
  }
  return newTetra;
};

export const moveRight = (tetra: Tetraminos, grid: Cell[][]) => {
    const newTetra = { ...tetra };
    if (newTetra.y + matrixSizeRight(tetra.shape) + 1 < 11) {
      newTetra.y = newTetra.y + 1;
      if (checkMerge(newTetra, grid)) {
        newTetra.y = newTetra.y - 1;
      }
    }
    return newTetra;
  };

export const fallDown = (tetra: Tetraminos, grid: Cell[][]) => {
  const newTetra = { ...tetra };
  while (!checkMerge(newTetra, grid)) {
    newTetra.x = newTetra.x + 1;
  }
  newTetra.x = newTetra.x - 1;
  return newTetra;
};

export const keyControls = (key: string, tetra: Tetraminos | undefined, grid: Cell[][], gameStatus: string) => {
  let newTetra;
  if (gameStatus === "Playing" && tetra) {
    switch (key) {
      case " ":
        newTetra = moveDown(tetra, grid);
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
          newTetra = rotate(tetra, grid);
        }
        break;
      case "ArrowLeft":
        newTetra = moveLeft(tetra, grid);
        break;
      case "ArrowRight":
        newTetra = moveRight(tetra, grid);
        break;
      case "ArrowDown":
        newTetra = fallDown(tetra, grid);
        break;
    }
  }
  return newTetra;
}