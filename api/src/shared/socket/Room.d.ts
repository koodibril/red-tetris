import { Tetraminos } from "./Tetraminos";

export interface Room {
  roomName: string;
  status: string;
  tetraminos: Tetraminos[];
  players: { id: string; tetra: number; status: string }[];
}
