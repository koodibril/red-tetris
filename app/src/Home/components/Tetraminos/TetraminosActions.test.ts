import { checkMerge, fallDown, keyControls, moveDown, moveLeft, moveRight, rotate } from "./TetraminosActions";

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
    expect(rotate(tetraminos, grid1)).toStrictEqual(tetraminos2);
    expect(rotate(tetraminos, grid2)).toStrictEqual(tetraminos);
})

test('moveLeft', () => {
    const tetraminos2 = { ...tetraminos };
    tetraminos2.y -= 1;
    expect(moveLeft(tetraminos, grid1)).toStrictEqual(tetraminos2);
    expect(moveLeft(tetraminos, grid2)).toStrictEqual(tetraminos);
})

test('moveRight', () => {
    const tetraminos2 = { ...tetraminos };
    tetraminos2.y += 1;
    expect(moveRight(tetraminos, grid1)).toStrictEqual(tetraminos2);
    expect(moveRight(tetraminos, grid2)).toStrictEqual(tetraminos);
})

test('fallDown', () => {
    const tetraminos2 = { ...tetraminos };
    const tetraminos3 = { ...tetraminos };
    const tetraminos4 = { ...tetraminos };
    tetraminos3.x = 4;
    tetraminos4.x -= 1;
    expect(fallDown(tetraminos2, grid1)).toStrictEqual(tetraminos3);
    expect(fallDown(tetraminos, grid2)).toStrictEqual(tetraminos4);
})

test('keyControls', () => {
  const tetraDown = { ...tetraminos };
  tetraDown.x += 1;
  const tetraRotate = { ...tetraminos };
  tetraRotate.shape = [
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ];
  const tetraLeft = { ...tetraminos };
  tetraLeft.y -= 1;
  const tetraRight = { ...tetraminos };
  tetraRight.y += 1;
  const tetraFall = { ...tetraminos };
  tetraFall.x = 4;
  expect(keyControls(" ", tetraminos, grid1, "Playing")).toStrictEqual(tetraDown);
  expect(keyControls("ArrowUp", tetraminos, grid1, "Playing")).toStrictEqual(tetraRotate);
  expect(keyControls("ArrowLeft", tetraminos, grid1, "Playing")).toStrictEqual(tetraLeft);
  expect(keyControls("ArrowRight", tetraminos, grid1, "Playing")).toStrictEqual(tetraRight);
  expect(keyControls("ArrowDown", tetraminos, grid1, "Playing")).toStrictEqual(tetraFall);
})