import { checkIfPlayerInGame } from "../services/player";
import User from "./User";

export default class Player {
  user: User;
  game_id: number;
  isWhite: boolean;
  constructor(user: User, game_id: number, isWhite: boolean) {
    this.user = user;
    this.game_id = game_id;
    this.isWhite = isWhite;
  }
  // Checks if player is in the game.
  public async isValidPlayer(): Promise<boolean> {
    return await checkIfPlayerInGame(this);
  }
}
