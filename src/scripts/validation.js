const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

const clearValidation = (formElement, config) => {
    const buttonElement = formElement.querySelector(config.submitButtonSelector)
    clearInputErrors(formElement, config)
    setDefaultButtonState(buttonElement)
}
const clearInputErrors = (formElement, config) => {
    const inputList = formElement.querySelectorAll(config.inputSelector)
    Array.from(inputList).forEach(inputElement => {
        hideInputError(formElement, inputElement, config)
    })
}
const setDefaultButtonState = (buttonElement) => {
    buttonElement.disabled = true
}
const checkInputValidity = (formElement, inputElement, config) => {
    if (inputElement.validity.patternMismatch){
        inputElement.setCustomValidity(inputElement.dataset.error)
    } else {
        inputElement.setCustomValidity('')
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
};

const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector)
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement)
        });
    });
    toggleButtonState(inputList, buttonElement)
};

const enableValidation = (config) => {
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach((formElement) => {
        setEventListeners(formElement, config);
    })
};

function hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    })
}

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true
    } else {
        buttonElement.disabled = false
    }
}

export {enableValidation, clearValidation}