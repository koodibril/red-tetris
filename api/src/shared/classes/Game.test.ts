import { Game } from "./Game"
import { Player } from "./Player";

test("changeAdmin", () => {
    const game = new Game('test', 'test', 'test');
    expect(typeof game.removePlayer).toBe("function");
    const player = new Player('test1', 'test1');
    const player2 = new Player('test2', 'test2');
    const player3 = new Player('test3', 'test3');
    game.addPlayer(player);
    game.addPlayer(player2);
    game.addPlayer(player3);
    expect(game.getPlayers().length).toBe(4);
    game.removePlayer(game.getAdmin());
    expect(game.getAdmin()).toBe(player);
    game.removePlayer(player);
    game.removePlayer(player2);
    game.removePlayer(player3);
    expect(game.getPlayers().length).toBe(1);
})