function showErrorMessage(input, errorMessage) {}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const { inputErrorClass } = options;

  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const inputError = [
    ...formEl.closest(".modal").querySelectorAll(inputErrorClass),
  ];
  console.log(inputError);

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      const errorMessage = inputEl.validationMessage;
      if (!inputEl.validity.valid) {
        inputError.textContent = errorMessage;
      } else {
        inputError.textContent = "";
      }
      console.log(errorMessage);
      console.log(inputError.textContent);
    });
  });
}

function enableValidation(options) {
  const { formSelector } = options;
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault;
    });
    setEventListeners(formEl, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: ".modal__button_disabled",
  inputErrorClass: ".modal__input_type_error",
  errorClass: ".modal__error_visible",
};

enableValidation(config);
