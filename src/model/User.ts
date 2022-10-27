export default class User {
  emailAddress: string;
  username?: string;
  constructor(emailAddress: string, username?: string) {
    this.emailAddress = emailAddress;
    this.username = username;
  }
}
