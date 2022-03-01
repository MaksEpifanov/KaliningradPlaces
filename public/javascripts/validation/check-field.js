import { validator } from "./validator.js"
import { mainHelpers } from "./main-helpers.js"

const { showErrors, showSuccess } = mainHelpers();

export const checkField = () => {

  //* if validation errors: add class "is-invalid" to input, add erors to divErrors and delete property in global object userData
  //* else add class "is-valid" to input, add value to userData, clean and hide divErrors.
  const setResult = (field, value, errors) => {
    const input = validationForm[field];
    const divErrors = input.previousElementSibling
    if (errors.length) {
      input.classList.add("is-invalid")
      showErrors(errors, divErrors)
      delete userData[field]
    } else {
      showSuccess(input)
      userData[field] = value
      divErrors.innerHTML = ""
      divErrors.hidden = true;
    };
  };

  const checkName = (value) => {
    const { errors } = validator(value).notEmpty().isUsername().isUsernameMinMax()
    setResult("username", value, errors);
  };

  const checkPassword = (value) => {
    const { errors } = validator(value).notEmpty().isPassword().isPasswordMin();
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
