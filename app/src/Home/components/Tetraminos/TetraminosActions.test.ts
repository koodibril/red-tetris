import { checkMerge, moveDown, rotate } from "./TetraminosActions";

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
];
const grid2 = [
    [{value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}, {value: 0, color: "test"}],
    [{value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}],
    [{value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}],
    [{value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}],
    [{value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}],
    [{value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}, {value: 1, color: "test"}],
];

test('checkMerge', () => {
    expect(checkMerge(tetraminos, grid1)).toBe(false);
    expect(checkMerge(tetraminos, grid2)).toBe(true);
});

test('moveDown', () => {
    const tetraminos2 = { ...tetraminos };
    tetraminos2.x += 1;
    expect(moveDown(tetraminos, grid1)).toStrictEqual(tetraminos2);
    expect(moveDown(tetraminos, grid2)).toStrictEqual(tetraminos);
})

test('rotate', () => {
    const tetraminos2 = { ...tetraminos };
    tetraminos2.shape = [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ];

    console.log(rotate(tetraminos, grid2).shape);
    console.log(tetraminos.shape);
    expect(rotate(tetraminos, grid1)).toStrictEqual(tetraminos2);
    expect(rotate(tetraminos, grid2)).toStrictEqual(tetraminos);
})