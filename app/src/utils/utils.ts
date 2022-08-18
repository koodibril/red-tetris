export const matrixSizeLeft = (matrix: any) => {
  let matrixLength = 4;
  matrix.map((row: any, rIndex: number) => {
    let rowLength = 4;
    row.map((cell: any, cIndex: number) => {
      if (cell === 1 && cIndex < rowLength) {
        rowLength = cIndex;
      }
    });
    if (rowLength < matrixLength) {
      matrixLength = rowLength;
    }
  });
  return matrixLength;
};

export const matrixSizeRight = (matrix: any) => {
  let matrixLength = 1;
  matrix.map((row: any, rIndex: number) => {
    let rowLength = 1;
    row.map((cell: any, cIndex: number) => {
      if (cell === 1 && cIndex > rowLength) {
        rowLength = cIndex;
      }
    });
    if (rowLength > matrixLength) {
      matrixLength = rowLength;
    }
  });
  return matrixLength;
};

export const matrixSizeBottom = (matrix: any) => {
  let matrixLength = 1;
  matrix.map((row: any, rIndex: number) => {
    let rowLength = 1;
    row.map((cell: any, cIndex: number) => {
      if (cell === 1 && rIndex > rowLength) {
        rowLength = rIndex;
      }
    });
    if (rowLength > matrixLength) {
      matrixLength = rowLength;
    }
  });
  return matrixLength;
};

export const rotateClockwise = (a: any) => {
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

export const rotateCounterClockwise = (a: any) => {
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
