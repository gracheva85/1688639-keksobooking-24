import {isEscapeKey, isEnterKey} from './utils.js';

const body = document.querySelector('body');
const contentPopupSuccess = document.querySelector('#success').content;
const messageSuccessTemplate = contentPopupSuccess.querySelector('.success');
const contentPopupError = document.querySelector('#error').content;
const messageErrorTemplate = contentPopupError.querySelector('.error');
const success = messageSuccessTemplate.cloneNode(true);
const error = messageErrorTemplate.cloneNode(true);

const createPopupMessage = (messageType) =>  {
  body.appendChild(messageType);
  messageType.addEventListener('click', () => {
    messageType.remove();
  }, {once: true});
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      messageType.remove();
    }
  }, {once: true});
};

const createDownloadErrorMessage = () =>  {
  const message = messageErrorTemplate.cloneNode(true);
  message.querySelector('.error__message').textContent = 'Что-то пошло не так';
  message.querySelector('.error__button').textContent = 'Перезагрузить страницу';
  body.appendChild(message);
  message.querySelector('.error__button').addEventListener('click', ()=> {
    location.reload();
    return false;
  }, {once: true});
  document.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      location.reload();
      return false;
    }
  }, {once: true});
};

export {createPopupMessage, success, error, createDownloadErrorMessage};

