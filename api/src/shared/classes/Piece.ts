export class Piece {
  private _x: number;
  private _y: number;
  private _value: number;
  private _color: string;
  private _shape: number[][];
  private _tetraminos = [
    {
      x: 0,
      y: 5,
      value: 2,
      color: "cyan",
      shape: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    },
    {
      x: 0,
      y: 5,
      value: 2,
      color: "blue",
      shape: [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
    },
    {
      x: 0,
      y: 5,
      value: 2,
      color: "orange",
      shape: [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
    },
    {
      x: 0,
      y: 5,
      value: 2,
      color: "yellow",
      shape: [
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    },
    {
      x: 0,
      y: 5,
      value: 2,
      color: "green",
      shape: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
    },
    {
      x: 0,
      y: 5,
      value: 2,
      color: "purple",
      shape: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
    },
    {
      x: 0,
      y: 5,
      value: 2,
      color: "red",
      shape: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
    },
  ];

  constructor() {
    const tetra = Math.floor(Math.random() * (6 - 0)) + 0;
    this._x = this._tetraminos[tetra].x;
    this._y = this._tetraminos[tetra].y;
    this._value = this._tetraminos[tetra].value;
    this._color = this._tetraminos[tetra].color;
    this._shape = this._tetraminos[tetra].shape;
  }

  getTetraminos() {
    return {
      x: this._x,
      y: this._y,
      value: this._value,
      color: this._color,
      shape: this._shape,
    };
  }
}
