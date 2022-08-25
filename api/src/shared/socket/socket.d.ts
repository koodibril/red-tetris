import { Tetraminos } from "./Tetraminos.d";

export interface SocketData {
  room: string;
  name: string;
  tetraminos: Tetraminos | undefined;
}
