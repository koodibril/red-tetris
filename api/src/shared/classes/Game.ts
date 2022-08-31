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
    console.log(`${this._admin.getId()} is the new Admin !`);
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
  resetTetraminos() {
    this._tetraminos = [];
  }

  getPlayer(id: string) {
    return this._players.find((player) => player.getId() === id);
  }
  getPlayers() {
    return this._players;
  }
  addPlayer(newPlayer: Player) {
    this._players.push(newPlayer);
  }
  removePlayer(oldPlayer: Player) {
    if (this._players.length === 1) {
      return false;
    }
    this._players = this._players.filter(
      (player) => player.getId() !== oldPlayer.getId()
    );
    if (oldPlayer.getId() === this._admin.getId()) {
      this._admin = this._players[0];
      if (this._admin) console.log(`${this._admin.getId()} is the new Admin !`);
    }
    return true;
  }

  getRoomName() {
    return this._roomName;
  }
  checkWinner() {
    let count = 0;
    this._players.forEach((player) => {
      if (player.getStatus() === "Playing") {
        count++;
      }
    });
    if (count === 1) {
      return this._players.find((player) => player.getStatus() === "Playing");
    }
    return false;
  }

  getAdmin() {
    return this._admin;
  }

  getPosition(id: string) {
    const players = this._players.sort((a, b) => {
      const scoreA = a.getScore();
      const scoreB = b.getScore();
      return scoreB - scoreA;
    });
    const position = [0, players.length];
    players.forEach((player, index) => {
      if (player.getId() === id) {
        position[0] = index + 1;
      }
    });
    return position;
  }

  getOponents() {
    const oponents = this._players.map((player) => {
      const oponent = {
        status: player.getStatus(),
        shadow: player.getShadow(),
        id: player.getId(),
        name: player.getName(),
      };
      return oponent;
    });
    return oponents;
  }
}
