import {
  showErrorLoad
} from './system-message.js';

function getData(renderPins) {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((ads) => {
      renderPins(ads);
    })
    .catch(() => showErrorLoad('Ошибка загрузки данных, обновите страницу!'));
}

function sendData(onSuccess, onError, body) {
  fetch('https://25.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body: body,
  }, )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError('Не удается отправить форму. Попробуйте еще раз!');
      }
    })
    .catch(() => onError('Не удается отправить форму. Попробуйте еще раз'));
}

export {getData, sendData};
