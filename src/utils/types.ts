import { QueryResult } from "pg";
import Player from "../model/Player";

export interface ChessQueryResult extends QueryResult<any> {
  game_id: number;
  game_status: string;
  current_board: string;
  is_current_player_white: boolean;
}

export interface UserQueryResult extends QueryResult<any> {
  email_address: string;
  username: string;
  hash?: string;
}

export interface ChessPlayers {
  whitePlayer: Player;
  blackPlayer: Player;
}

export interface Pos {
  col: number;
  row: number;
}
