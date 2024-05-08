import { typeInput, getElement } from "../helpers/actions";

export default class CreateBankAccountPage {
  bankNameInput = "#bankaccount-bankName-input";
  routingNumberInput = "#bankaccount-routingNumber-input";
  accountNumberInput = "#bankaccount-accountNumber-input";
  saveButton = "button[type='submit']";
  warningText = "#bankaccount-bankName-input-helper-text";

  async createNewAccount() {
    const bankNameInputElement = await getElement(this.bankNameInput);
    const routingNumberInputElement = await getElement(this.routingNumberInput);
    const accountNumberInputElement = await getElement(this.accountNumberInput);
    const saveButtonElement = await getElement(this.saveButton);

    await typeInput(bankNameInputElement, "The Best Bank");
    await typeInput(routingNumberInputElement, "987654321");
    await typeInput(accountNumberInputElement, "123456789");

    await saveButtonElement.click();
  }
}
