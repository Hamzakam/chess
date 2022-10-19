import User from "./User";

export default class Player {
  user: User;
  game_id: string;
  isWhite: boolean;
  constructor(user: User, game_id: string, isWhite: boolean) {
    this.user = user;
    this.game_id = game_id;
    this.isWhite = isWhite;
  }
}
