import { getElement, typeInput } from "../helpers/actions";
import { ENV_READER } from "./../helpers/env.conf";
import usersData from "./../data/database-seed.json";

const users = usersData.users;
const authUser = users[0].username;
const authPassword = ENV_READER.SEED_DEFAULT_USER_PASSWORD;

class SignInPage {
  usernameInput = "//input[@id='username']";
  passwordInput = "//input[@id='password']";

  authUser = users[0].username;
  authPassword = "s3cret";

  async login() {
    const usernameElement = await getElement(this.usernameInput);
    const passwordElement = await getElement(this.passwordInput);
    await typeInput(usernameElement, authUser);
    await typeInput(passwordElement, authPassword);
  }
}
export default new SignInPage();
