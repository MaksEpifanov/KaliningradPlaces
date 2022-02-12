import { mainHelpers } from "./main-helpers.js";
import { checkField } from "./check-field.js";

window.registerForm = document.forms.registerForm;
window.userData = {};

//* functions check field in form
const { checkName, checkPassword, checkEmail } = checkField();

//* helpers function
const { checkUserData } = mainHelpers();

const mainSetup = () => {
  registerForm.addEventListener("input", (e) => {
    if (e.target.tagName !== "INPUT") return;
    const type = e.target.id;
    const { value } = e.target;

    switch (type) {
      case "username":
        checkName(value);
        break;
      case "password":
        checkPassword(value);
        break;
      case "email":
        checkEmail(value);
        break;
    }
    //* check all field & enable or disable submit button
    checkUserData(userData);
  });
};
mainSetup();
