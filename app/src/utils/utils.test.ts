import { Cell } from "../Home/components/Grid/Grid.d";
import { copyMatrix, generateGrid, matrixSizeBottom, matrixSizeLeft, matrixSizeRight, rotateClockwise, rotateCounterClockwise } from "./utils";

const tetraminos1 = 
{
  x: 0,
  y: 5,
  value: 2,
  color: "purple",
  shape: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
};
const tetraminos2 = 
{
  x: 0,
  y: 5,
  value: 2,
  color: "purple",
  shape: [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0],
  ],
};
const tetraminos3 = 
{
  x: 0,
  y: 5,
  value: 2,
  color: "purple",
  shape: [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
};

test('matrix size left', () => {
    const matrix1 = tetraminos1.shape;
    const matrix2 = tetraminos2.shape;
    const matrix3 = tetraminos3.shape;
    expect(matrixSizeLeft(matrix1)).toBe(0);
    expect(matrixSizeLeft(matrix2)).toBe(1);
    expect(matrixSizeLeft(matrix3)).toBe(0);
});

test('matrix size right', () => {
    const matrix1 = tetraminos1.shape;
    const matrix2 = tetraminos2.shape;
    const matrix3 = tetraminos3.shape;
    expect(matrixSizeRight(matrix1)).toBe(0);
    expect(matrixSizeRight(matrix2)).toBe(0);
    expect(matrixSizeRight(matrix3)).toBe(1);
});

test('matrix size Bottom', () => {
    const matrix1 = tetraminos1.shape;
    const matrix2 = tetraminos2.shape;
    const matrix3 = tetraminos3.shape;
    expect(matrixSizeBottom(matrix1)).toBe(1);
    expect(matrixSizeBottom(matrix2)).toBe(0);
    expect(matrixSizeBottom(matrix3)).toBe(0);
});

test('copy matrix', () => {
    const matrix = tetraminos1.shape;
    expect(copyMatrix(matrix)).toStrictEqual(matrix);
});

test('rotate clockwise', () => {
    const matrix = tetraminos1.shape;
    const matrixRotated = tetraminos2.shape;
    expect(rotateClockwise(matrix)).toStrictEqual(matrixRotated);
});

test('rotate counterclockwise', () => {
    const matrix = tetraminos1.shape;
    const matrixRotated = tetraminos3.shape;
    expect(rotateCounterClockwise(matrix)).toStrictEqual(matrixRotated);
});

test('generate grid', () => {
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
    expect(generateGrid()).toStrictEqual(grid);
});