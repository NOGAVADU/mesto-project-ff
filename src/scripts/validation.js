const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error');
    errorElement.textContent = '';
};

const validationPopupOpener = (formElement) => {
    const buttonElement = formElement.querySelector('.popup__button')
    clearInputErrors(formElement)
    setDefaultButtonState(buttonElement)
}
const clearInputErrors = (formElement) => {
    const errorList = formElement.querySelectorAll('.form__input-error')
    const inputList = formElement.querySelectorAll('.popup__input')
    Array.from(errorList).forEach(errorElement => {
        errorElement.classList.remove('popup__input-error');
        errorElement.textContent = '';
    })
    Array.from(inputList).forEach(inputElement => {
        inputElement.classList.remove('popup__input_type_error');
    })
}
const setDefaultButtonState = (buttonElement) => {
    buttonElement.disabled = true
}
const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch){
        inputElement.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы")
    } else {
        inputElement.setCustomValidity('')
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button')
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement)
        });
    });
    toggleButtonState(inputList, buttonElement)
};

const enableValidation = (formList) => {
    formList.forEach(formElement => {
        setEventListeners(formElement)
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

export {enableValidation, validationPopupOpener}