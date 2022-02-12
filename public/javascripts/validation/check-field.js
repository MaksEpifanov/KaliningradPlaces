import { validator } from "./validator.js"
import { mainHelpers } from "./main-helpers.js"

const { showErrors, showSuccess } = mainHelpers();

export const checkField = () => {

  //* show error validation or success 
  const setResult = (field, value, errors) => {
    const input = registerForm[field];
    const divErrors = input.previousElementSibling
    if (errors.length) {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid")
      showErrors(errors, divErrors)
      delete userData[field]
    } else {
      showSuccess(input)
      userData[field] = value
      divErrors.hidden = true;
    };
  };

  const checkName = (value) => {
    const { errors } = validator(value).notEmpty().isUsername().isUsernameMinMax()
    setResult("username", value, errors);
  };

  const checkPassword = (value) => {
    const { errors } = validator(value).notEmpty().isPassword();
    setResult("password", value, errors);
  };

  const checkEmail = (value) => {
    const { errors } = validator(value).notEmpty().isEmail();
    setResult("email", value, errors);
  };
  return {
    checkName,
    checkPassword,
    checkEmail,
  }
}
