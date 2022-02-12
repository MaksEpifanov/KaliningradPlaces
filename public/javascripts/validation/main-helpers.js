export const mainHelpers = () => {

  //* check userData global variable & disable or enable submit button form
  const checkUserData = (data) => {
    if (
      Object.keys(data).length === 3 &&
      Object.values(data).every((item) => !!(item.trim()) == true)
    ) {
      btnRegister.disabled = false;
    } else {
      btnRegister.disabled = true;
    }
  }

  //* function show errors
  const showErrors = (errors, element) => {
    element.hidden = false
    element.innerHTML = `
  <ul>
    ${errors.reduce((html, error) => (html += `<li>${error}</li>`), "")}
  </ul>
`
    if (!errors.length) {
      element.hidden = true
    }
  }

  //* function show success validate 
  const showSuccess = (element) => {
    element.classList.remove("is-invalid")
    element.classList.add("is-valid")
  }
  return {
    checkUserData,
    showErrors,
    showSuccess
  };
}

