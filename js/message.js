import { isEscape } from './util.js';

let message;

const createMessage = (messageType) => {
  const messageTemplate = document.querySelector(`#${messageType}`).content.querySelector(`.${messageType}`);
  return messageTemplate.cloneNode(true);
};

const handleEscapeDocument = (evt) => {
  if (isEscape(evt.code)) {
    deleteMessage();
  }
};

function deleteMessage() {
  message.remove();
  document.removeEventListener('keydown', handleEscapeDocument);
}

const getMessage = (messageType) => {
  message = createMessage(messageType);
  message.addEventListener('click', () => deleteMessage());
  document.addEventListener('keydown', handleEscapeDocument);

  if (messageType === 'error') {
    const messageCloseButton = message.querySelector(`.${messageType}__button`);
    messageCloseButton.addEventListener('click', () => deleteMessage());
  }

  return message;
};

export { getMessage };
