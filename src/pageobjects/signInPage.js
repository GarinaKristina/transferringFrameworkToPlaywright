import { getElement, typeInput } from "../helpers/actions";
import { ENV_READER } from "./../helpers/env.conf";
import usersData from "./../data/database-seed.json";

const users = usersData.users;
const authUser = users[0].username;
const authPassword = ENV_READER.SEED_DEFAULT_USER_PASSWORD;

export default class SignInPage {
  usernameInput = "//input[@id='username']";
  passwordInput = "//input[@id='password']";
  signInButton = "//span[@class='MuiButton-label']";

  async login() {
    const usernameElement = await getElement(this.usernameInput);
    const passwordElement = await getElement(this.passwordInput);
    const signInButton = await getElement(this.signInButton);
    await typeInput(usernameElement, authUser);
    await typeInput(passwordElement, authPassword);

    await signInButton.click();
  }
}
