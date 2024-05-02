import { getElement, typeInput } from "../helpers/actions";
import usersData from "./../data/database-seed.json";

const users = usersData.users;
const authUser = users[0].username;
const authPassword = "s3cret";

class SignInPage {
  usernameInput = "#username";
  passwordInput = "#password";

  authUser = users[0].username;
  authPassword = "s3cret";
}
export default new SignInPage();

export async function login() {
  const { usernameInput, passwordInput } = SignInPage;
  const usernameElement = await getElement(usernameInput);
  const passwordElement = await getElement(passwordInput);
  await typeInput(usernameElement, authUser);
  await typeInput(passwordElement, authPassword);
  await page.pause(1000);
}
