import { Cell } from "../Home/components/Grid/Grid.d";

export const matrixSizeLeft = (matrix: number[][]) => {
  let matrixLength = matrix.length;
  for (let i = 0; i < matrixLength; i++) {
    for (let j = 0; j < matrixLength; j++) {
      if (matrix[j][i] === 1) {
        if (i === 0) {
          return 0;
        }
        return (i);
      }
    }
  }
  return 0;
};

export const matrixSizeRight = (matrix: number[][]) => {
  let matrixLength = matrix.length;
  for (let i = matrixLength - 1; i >= 0; i--) {
    for (let j = 0; j < matrixLength; j++) {
      if (matrix[j][i] === 1) {
        if (i === matrixLength - 1) {
          return 0;
        }
        return ((i - (matrixLength - 1)) * -1);
      }
    }
  }
  return 0;
};

export const matrixSizeBottom = (matrix: number[][]) => {
  let matrixLength = matrix.length;
  for (let i = matrixLength - 1; i >= 0; i--) {
    for (let j = 0; j < matrixLength; j++) {
      if (matrix[i][j] === 1) {
        if (i === matrixLength - 1) {
          return 0;
        }
        return ((i - (matrixLength - 1)) * -1);
      }
    }
  }
  return 0;
};

export const copyMatrix = (toCopy: number[][]) => {
  const matrix = [];
  for (let i = 0; i < toCopy.length; i++) {
    matrix.push([...toCopy[i]]);
  }
  return matrix;
};

export const rotateClockwise = (copy: number[][]) => {
  const a = copyMatrix(copy);
  const n = a.length;

  for (let i = 0; i < n / 2; i++) {
    for (let j = i; j < n - i - 1; j++) {
      const tmp = a[i][j];
      a[i][j] = a[n - j - 1][i];
      a[n - j - 1][i] = a[n - i - 1][n - j - 1];
      a[n - i - 1][n - j - 1] = a[j][n - i - 1];
      a[j][n - i - 1] = tmp;
    }
  }
  return a;
};

export const rotateCounterClockwise = (copy: number[][]) => {
  const a = copyMatrix(copy);
  const n = a.length;
  for (let i = 0; i < n / 2; i++) {
    for (let j = i; j < n - i - 1; j++) {
      const tmp = a[i][j];
      a[i][j] = a[j][n - i - 1];
      a[j][n - i - 1] = a[n - i - 1][n - j - 1];
      a[n - i - 1][n - j - 1] = a[n - j - 1][i];
      a[n - j - 1][i] = tmp;
    }
  }
  return a;
};

export const generateGrid = () => {
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