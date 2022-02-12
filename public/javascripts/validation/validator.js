const regexp = {
  username: /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
  usernameMinmax: /^(?=.{4,20})/,
  pass: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,

  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export const validator = (value, errors = []) => {
  const notEmpty = () => {
    !value.trim() && errors.push("Field cannot be empty");
    return validator(value, errors);
  };

  const isUsernameMinMax = () => {
    !regexp.usernameMinmax.test(value) && errors.push("The name must contain 4 - 20 characters")
    return validator(value, errors);
  }
  const isUsername = () => {
    !regexp.username.test(value) && errors.push("The name must contain letters, numbers, and the symbols _ or . (except beginning and end)")
    return validator(value, errors);
  };
  const isPassword = () => {
    !regexp.pass.test(value) && errors.push("Password errror");
    return validator(value, errors);
  };
  const isEmail = () => {
    !regexp.email.test(value) && errors.push("Email error");
    return validator(value, errors);
  }

  return {
    notEmpty,
    isUsername,
    isUsernameMinMax,
    isPassword,
    isEmail,
    errors,
  }
};

