import { isEscape } from './util.js';

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorMessageTemplate.cloneNode(true);
const errorMessageCloseButton = errorMessage.querySelector('.error__button');

const removeErrorMessage = () => {
  errorMessage.remove();
};

const onEscapeErrorMessage = (evt) => {
  const code = evt.code;
  if (isEscape(code)) {
    removeErrorMessage();
  }
};

const onClickErrorMessageCloseButton = () => {
  removeErrorMessage();
};

const displayErrorMessage = () => {
  document.body.insertAdjacentElement('beforeend', errorMessage);
  errorMessage.addEventListener('click', () => {
    removeErrorMessage();
    document.removeEventListener('keydown', onEscapeErrorMessage);
  });
  document.addEventListener('keydown', onEscapeErrorMessage);
  errorMessageCloseButton.addEventListener('click', onClickErrorMessageCloseButton);
};

export { displayErrorMessage };
