import { isEscape } from './util.js';

let message;

const createMessage = (messageType) => {
  const messageTemplate = document.querySelector(`#${messageType}`).content.querySelector(`.${messageType}`);
  return messageTemplate.cloneNode(true);
};

const onEscapeMessage = (evt) => {
  const code = evt.code;
  if (isEscape(code)) {
    message.remove();
    document.removeEventListener('keydown', onEscapeMessage);
  }
};

const onClickMessageButton = () => {
  message.remove();
  document.removeEventListener('keydown', onEscapeMessage);
};

const getMessage = (messageType) => {
  message = createMessage(messageType);

  message.addEventListener('click', () => {
    message.remove();
    document.removeEventListener('keydown', onEscapeMessage);
  });

  if (messageType === 'error') {
    const messageButton = message.querySelector(`.${messageType}__button`);
    messageButton.addEventListener('click', onClickMessageButton);
  }

  document.addEventListener('keydown', onEscapeMessage);

  return message;
};

export { getMessage };
