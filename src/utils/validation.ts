import passwordValidate from "password-validator";
export function emailValidator(email: string): Boolean {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

export function passwordValidator(password: string) {
  const passSchema = new passwordValidate();
  passSchema
    .is()
    .min(8)
    .is()
    .max(30)
    .has()
    .uppercase(1)
    .has()
    .lowercase(1)
    .has()
    .digits(1)
    .has()
    .symbols(1)
    .has()
    .not()
    .spaces();
  return passSchema.validate(password);
}

export function gameStatusValidator(game_status: string) {
  const validStatus = ["ACTIVE", "STALEMATE", "BLACKWIN", "WHITEWIN"];
  return validStatus.includes(game_status.toUpperCase());
}
