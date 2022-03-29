import { isEscape } from './util.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successMessageTemplate.cloneNode(true);

const removeSuccessMessage = () => {
  successMessage.remove();
};

const onEscapeSuccessMessage = (evt) => {
  const code = evt.code;
  if (isEscape(code)) {
    removeSuccessMessage();
  }
};

const displaySuccessMessage = () => {
  document.body.insertAdjacentElement('beforeend', successMessage);
  successMessage.addEventListener('click', () => {
    removeSuccessMessage();
    document.removeEventListener('keydown', onEscapeSuccessMessage);
  });
  document.addEventListener('keydown', onEscapeSuccessMessage);
};

export { displaySuccessMessage };
