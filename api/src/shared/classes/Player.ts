import { Cell } from "../socket/Tetraminos";

export class Player {
  private _id: string;
  private _tetra: number;
  private _status: string;
  private _name: string;
  private _score: number;
  private _shadow: Cell[][] | undefined;
  constructor(id: string, name: string) {
    this._id = id;
    this._tetra = 0;
    this._status = "Waiting";
    this._name = name;
    this._score = 0;
    this._shadow = undefined;
  }

  getId() {
    return this._id;
  }

  getName() {
    return this._name;
  }

  getTetra() {
    return this._tetra;
  }
  setTetra(tetra: number) {
    this._tetra = tetra;
  }

  getStatus() {
    return this._status;
  }
  setStatus(status: string) {
    this._status = status;
  }

  getScore() {
    return this._score;
  }
  setScore(lines: number) {
    switch (lines) {
      case 1:
        this._score += 40;
        break;
      case 2:
        this._score += 100;
        break;
      case 3:
        this._score += 300;
        break;
      case 4:
        this._score += 1200;
        break;
    }
  }

  getShadow() {
    return this._shadow;
  }
  setShadow(shadow: Cell[][] | undefined) {
    this._shadow = shadow;
  }
}
