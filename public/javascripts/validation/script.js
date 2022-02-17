import { mainHelpers } from "./main-helpers.js";
import { checkField } from "./check-field.js";

window.validationForm = document.forms[0];
window.userData = {};

const pathName = document.location.pathname;
//* functions check field in form
const { checkName, checkPassword, checkEmail } = checkField();

//* helpers function
const { showElement, hideElement, checkUserData } = mainHelpers();

const mainSetup = () => {
  validationForm.addEventListener("input", (e) => {
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
    console.log(pathName)

    pathName == "/register" && checkUserData(userData, 3);
    pathName == "/login" && checkUserData(userData, 2)
  });

  //* hide div whith errors (if this div empty)
  validationForm.addEventListener("focusout", (e) => {
    if (e.target.tagName !== "INPUT") return;
    const type = e.target.id;
    const divErrors = validationForm[type].previousElementSibling;

    hideElement(divErrors)

  });

  //* if the div errors has errors then it visible
  validationForm.addEventListener("focusin", (e) => {
    if (e.target.tagName !== "INPUT") return;
    const type = e.target.id;
    const divErrors = validationForm[type].previousElementSibling;

    divErrors.innerHTML && showElement(divErrors);
  })
};
mainSetup();
