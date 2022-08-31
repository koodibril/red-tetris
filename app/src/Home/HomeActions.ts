import { Cell } from "./components/Grid/Grid.d";
import { Tetraminos } from "./components/Tetraminos/Tetraminos.d";
import { fallDown } from "./components/Tetraminos/TetraminosActions";

export const printTetra = (tetra: Tetraminos, grid: Cell[][]) => {
  const shadow = fallDown(tetra, grid);
  tetra.shape.forEach((row: number[], rIndex: number) => {
    row.forEach((cell: number, cIndex: number) => {
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
  return grid;
};

export const calcScore = (lines: number, score: number | undefined) => {
  switch (lines) {
    case 1:
      return (score ? score + 40 : 40);
    case 2:
      return (score ? score + 100 : 100);
    case 3:
      return (score ? score + 300 : 300);
    case 4:
      return (score ? score + 1200 : 1200);
  }
  return 0;
};

export const checkFullLines = (newMerge: Cell[][]) => {
  let lines = 0;
  newMerge.forEach((row, index) => {
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
  return lines;
};