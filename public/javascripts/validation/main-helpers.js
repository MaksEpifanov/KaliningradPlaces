export const mainHelpers = () => {

  const btnValidate = document.forms[0].querySelector("button")
  //* check userData global variable & disable or enable submit button form
  const checkUserData = (data, length) => {
    if (
      Object.keys(data).length === length &&
      Object.values(data).every((item) => !!(item.trim()) == true)
    ) {
      btnValidate.disabled = false;
    } else {
      btnValidate.disabled = true;
    }
  }

  const showElement = (element) => {
    element.hidden = false;
  };
  const hideElement = (element) => {
    element.hidden = true;
  }

  //* function show errors
  const showErrors = (errors, element) => {
    showElement(element);
    element.innerHTML = `
  <ul>
    ${errors.reduce((html, error) => (html += `<li>${error}</li>`), "")}
  </ul>
`
    if (!errors.length) {
      hideElement(element)
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
    showSuccess,
    showElement,
    hideElement
  };
}

