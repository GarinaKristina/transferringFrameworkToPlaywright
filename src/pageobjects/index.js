import SignInPage from "./signInPage";
import HomePage from "./homePage";

class Pages {
  constructor() {
    this.SignInPage = new SignInPage();
    this.HomePage = new HomePage();
  }
}
export const pages = new Pages();
