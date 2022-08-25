export class Player {
  private _id: string;
  private _tetra: number;
  private _status: string;
  private _name: string;
  constructor(id: string, name: string) {
    this._id = id;
    this._tetra = 0;
    this._status = "Waiting";
    this._name = name;
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
}
