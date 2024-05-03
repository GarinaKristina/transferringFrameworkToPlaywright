import SignInPage from "./signInPage";
import HomePage from "./homePage";
import CreateBankAccountPage from "./createBankAccountPage";
class Pages {
  constructor() {
    this.SignInPage = new SignInPage();
    this.HomePage = new HomePage();
    this.CreateBankAccountPage = new CreateBankAccountPage();
  }
}
export const page = new Pages();
