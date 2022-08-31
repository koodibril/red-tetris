import { Player } from "./Player";

test("setScore", () => {
  const player = new Player("test", "test");
  player.setScore(0);
  expect(player.getScore()).toBe(0);
  player.setScore(1);
  expect(player.getScore()).toBe(40);
  player.setScore(2);
  expect(player.getScore()).toBe(140);
  player.setScore(3);
  expect(player.getScore()).toBe(440);
  player.setScore(4);
  expect(player.getScore()).toBe(1640);
});
