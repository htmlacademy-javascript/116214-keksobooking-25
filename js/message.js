import { isEscape } from './util.js';

let message;

const createMessage = (messageType) => {
  const messageTemplate = document.querySelector(`#${messageType}`).content.querySelector(`.${messageType}`);
  return messageTemplate.cloneNode(true);
};

const onEscapeMessage = (evt) => {
  if (isEscape(evt.code)) {
    deleteMessage();
  }
};

const onClickMessageButton = () => {
  deleteMessage();
};

const getMessage = (messageType) => {
  message = createMessage(messageType);

  message.addEventListener('click', () => {
    deleteMessage();
  });

  document.addEventListener('keydown', onEscapeMessage);

  if (messageType === 'error') {
    const messageCloseButton = message.querySelector(`.${messageType}__button`);
    messageCloseButton.addEventListener('click', onClickMessageButton);
  }

  return message;
};

function deleteMessage() {
  message.remove();
  document.removeEventListener('keydown', onEscapeMessage);
}

export { getMessage };
