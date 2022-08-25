import { Piece } from "./Piece";
import { Player } from "./Player";

export class Game {
  private _roomName: string;
  private _status: string;
  private _tetraminos: Piece[];
  private _players: Player[];
  private _admin: Player;

  constructor(room: string, id: string, name: string) {
    this._roomName = room;
    this._status = "Waiting";
    this._tetraminos = [];
    this._players = [new Player(id, name)];
    this._admin = this._players[0];
  }

  getStatus() {
    return this._status;
  }
  setStatus(status: string) {
    this._status = status;
    this._players.forEach((player) => {
      player.setStatus(status);
    });
  }

  getTetraminos() {
    return this._tetraminos;
  }
  setTetraminos(tetra: Piece) {
    this._tetraminos.push(tetra);
  }

  getPlayer(id: string) {
    return this._players.find((player) => player.getId() === id);
  }
  setPlayer(newPlayer: Player) {
    this._players = this._players.map((player) => {
      if (player.getId() === newPlayer.getId()) return newPlayer;
      return player;
    });
  }
  addPlayer(newPlayer: Player) {
    this._players.push(newPlayer);
  }
  removePlayer(oldPlayer: Player) {
    if (this._players.length === 1) {
      return false;
    }
    this._players = this._players.filter(
      (player) => player.getId() === oldPlayer.getId()
    );
    if (oldPlayer.getId() === this._admin.getId()) {
      this._admin = this._players[0];
    }
    return true;
  }

  getRoomName() {
    return this._roomName;
  }
  checkWinner() {
    let count = 0;
    this._players.forEach((player) => {
      console.log(player.getStatus());
      if (player.getStatus() === "Playing") {
        count++;
      }
    });
    console.log(count);
    if (count === 1) {
      return this._players.find((player) => player.getStatus() === "Playing");
    }
    return false;
  }
}
