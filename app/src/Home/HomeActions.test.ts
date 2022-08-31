import { calcScore, checkFullLines, printTetra } from "./HomeActions";

const tetraminos = 
{
  x: 2,
  y: 2,
  value: 2,
  color: "blue",
  shape: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
};
const grid1 = [
    [{value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}],
    [{value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}],
    [{value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}],
    [{value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}],
    [{value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}],
    [{value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}],
    [{value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}],
];

const grid2 = [
    [{value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}],
    [{value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}],
    [{value: 0, color: "test"}, {value: 0, color: "test"}, {value: 2, color: "blue"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}],
    [{value: 0, color: "test"}, {value: 0, color: "test"}, {value: 2, color: "blue"}, {value: 2, color: "blue"}, {value: 2, color: "blue"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}],
    [{value: 0, color: "test"}, {value: 0, color: "test"}, {value: 4, color: "blue"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}],
    [{value: 0, color: "test"}, {value: 0, color: "test"}, {value: 4, color: "blue"}, {value: 4, color: "blue"}, {value: 4, color: "blue"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}],
    [{value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}],
];

const grid3 = [
    [{value: 1, color: "grey"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 1, color: "grey"}],
    [{value: 1, color: "grey"}, {value: 3, color: "test"}, {value: 3, color: "test"}, {value: 3, color: "test"}, {value: 3, color: "test"}, {value: 3, color: "test"}, {value: 3, color: "test"}, {value: 3, color: "test"}, {value: 3, color: "test"}, {value: 3, color: "test"}, {value: 3, color: "test"}, {value: 1, color: "grey"}],
    [{value: 1, color: "grey"}, {value: 3, color: "test"}, {value: 3, color: "test"}, {value: 3, color: "test"}, {value: 3, color: "test"}, {value: 3, color: "test"}, {value: 3, color: "test"}, {value: 3, color: "test"}, {value: 3, color: "test"}, {value: 3, color: "test"}, {value: 3, color: "test"}, {value: 1, color: "grey"}],
    [{value: 1, color: "grey"}, {value: 1, color: "grey"}, {value: 1, color: "grey"}, {value: 1, color: "grey"}, {value: 1, color: "grey"}, {value: 1, color: "grey"}, {value: 1, color: "grey"}, {value: 1, color: "grey"}, {value: 1, color: "grey"}, {value: 1, color: "grey"}, {value: 1, color: "grey"}, {value: 1, color: "grey"}],
];

const grid4 = [
    [{value: 1, color: "grey"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 1, color: "grey"}],
    [{value: 1, color: "grey"}, {value: 0, color: "lightgrey"}, {value: 0, color: "lightgrey"}, {value: 0, color: "lightgrey"}, {value: 0, color: "lightgrey"}, {value: 0, color: "lightgrey"}, {value: 0, color: "lightgrey"}, {value: 0, color: "lightgrey"}, {value: 0, color: "lightgrey"}, {value: 0, color: "lightgrey"}, {value: 0, color: "lightgrey"}, {value: 1, color: "grey"}],
    [{value: 1, color: "grey"}, {value: 0, color: "lightgrey"}, {value: 0, color: "lightgrey"}, {value: 0, color: "lightgrey"}, {value: 0, color: "lightgrey"}, {value: 0, color: "lightgrey"}, {value: 0, color: "lightgrey"}, {value: 0, color: "lightgrey"}, {value: 0, color: "lightgrey"}, {value: 0, color: "lightgrey"}, {value: 0, color: "lightgrey"}, {value: 1, color: "grey"}],
    [{value: 1, color: "grey"}, {value: 1, color: "grey"}, {value: 1, color: "grey"}, {value: 1, color: "grey"}, {value: 1, color: "grey"}, {value: 1, color: "grey"}, {value: 1, color: "grey"}, {value: 1, color: "grey"}, {value: 1, color: "grey"}, {value: 1, color: "grey"}, {value: 1, color: "grey"}, {value: 1, color: "grey"}],
];

test('printTetra', () => {
    printTetra(tetraminos, grid1);
    expect(grid1).toStrictEqual(grid2);
});

test('calcScore', () => {
    expect(calcScore(0, 0)).toBe(0);
    expect(calcScore(1, 0)).toBe(40);
    expect(calcScore(2, 0)).toBe(100);
    expect(calcScore(3, 0)).toBe(300);
    expect(calcScore(4, 0)).toBe(1200);
    expect(calcScore(1, 30)).toBe(70);
    expect(calcScore(2, 30)).toBe(130);
    expect(calcScore(3, 30)).toBe(330);
    expect(calcScore(4, 30)).toBe(1230);
});

test('checkFullLines', () => {
    expect(checkFullLines(grid3)).toBe(2);
    expect(grid3).toStrictEqual(grid4);
});