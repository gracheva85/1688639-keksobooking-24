import {createPopupMessage, success, error, createDownloadErrorMessage} from './popups.js';

const getData = (onSuccess, onError) => fetch('https://24.javascript.pages.academy/keksobooking/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => {
    onSuccess(data);
  })
  .catch(() => {
    onError(createDownloadErrorMessage());
  });

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  ).then((response) => response.ok ? onSuccess(createPopupMessage(success)) : onFail(createPopupMessage(error)),
  )
    .catch(() => {
      onFail(createPopupMessage(error));
    });
};

export {getData, sendData};
