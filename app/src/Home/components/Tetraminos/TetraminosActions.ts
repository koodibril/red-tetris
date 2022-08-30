import { matrixSizeBottom, matrixSizeLeft, matrixSizeRight, rotateClockwise, rotateCounterClockwise } from "../../../utils/utils";
import { Cell } from "../Grid/Grid.d";
import { Tetraminos } from "./Tetraminos.d";

export const checkMerge = (tetra: Tetraminos, grid: Cell[][]) => {
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


export const moveDown = (tetra: Tetraminos, grid: Cell[][]) => {
    const newTetra = { ...tetra };
    if (newTetra.x + matrixSizeBottom(tetra.shape) + 1 < 21) {
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
  if (checkMerge(oldTetra, grid)) {
    oldTetra.shape = rotateCounterClockwise(tetra.shape);
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