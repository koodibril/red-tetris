import { Cell } from "../Home/components/Grid/Grid.d";
import { copyMatrix, generateGrid, matrixSizeBottom, matrixSizeLeft, matrixSizeRight, rotateClockwise, rotateCounterClockwise } from "./utils";

test('matrix size left', () => {
    const matrix = [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    expect(matrixSizeLeft(matrix)).toBe(1);
});

test('matrix size right', () => {
    const matrix = [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    expect(matrixSizeRight(matrix)).toBe(2);
});

test('matrix size Bottom', () => {
    const matrix = [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    expect(matrixSizeBottom(matrix)).toBe(1);
});

test('copy matrix', () => {
    const matrix = [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    expect(copyMatrix(matrix)).toStrictEqual(matrix);
});

test('rotate clockwise', () => {
    const matrix = [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    const matrixRotated = [
        [0, 0, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    expect(rotateClockwise(matrix)).toStrictEqual(matrixRotated);
});

test('rotate counterclockwise', () => {
    const matrix = [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    const matrixRotated = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
    ];
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