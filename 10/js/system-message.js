import {
  isEscapeKey
} from './util.js';
const body = document.body;
const ALERT_SHOW_TIME = 3000;
const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');

function onKeyDownEscSuccess(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalSuccess();
  }
}

function closeModalSuccess () {
  successMessage.remove();
  document.removeEventListener('keydown', onKeyDownEscSuccess);
  document.removeEventListener('click', closeModalSuccess);
}

function onErrorButton() {
  errorMessage.remove();
  errorButton.removeEventListener('click', onErrorButton);
}

function onKeyDownEscError(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalError();
  }
}

function closeModalError () {
  errorMessage.remove();
  document.removeEventListener('keydown', onKeyDownEscError);
  document.removeEventListener('click', closeModalError);
}

function onError(message) {
  errorMessage.querySelector('.error__message').textContent = message;
  errorButton.addEventListener('click', onErrorButton);
  body.append(errorMessage);
  document.addEventListener('keydown', onKeyDownEscError);
  document.addEventListener('click', closeModalError);
}

function onSuccess() {
  body.append(successMessage);
  document.addEventListener('keydown', onKeyDownEscSuccess);
  document.addEventListener('click', closeModalSuccess);
}


function showErrorLoad(message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '5px 3px';
  alertContainer.style.fontSize = '12px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}
export {
  onSuccess,
  onError,
  showErrorLoad
};
