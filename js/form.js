const adForm = document.querySelector('.ad-form');
const roomNumber = adForm.querySelector('#room_number');
const copacity = adForm.querySelector('#capacity');
const typeOfHousting = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const checkin = adForm.querySelector('#timein');
const checkout = adForm.querySelector('#timeout');
const sliderElement = document.querySelector('.ad-form__slider');
const submitButton = adForm.querySelector('.ad-form__submit');
const resetButton = adForm.querySelector('.ad-form__reset');

import {
  sendData
} from './api.js';
import {
  onSuccess,
  onError
} from './system-message.js';
import { resetPage } from './reset-page.js';


const roomCopacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const priceHousting = {
  'bungalow': '0',
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const SLIDER_COST_STEP = 500;
const SLIDER_MIN_RANGE = 0;
const SLIDER_MAX_RANGE = 100000;
const VALUE_SLIDER = 5;

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error',
});

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetPage(adForm);
});

function copacityValidation() {
  return roomCopacity[roomNumber.value].includes(copacity.value);
}

pristine.addValidator(roomNumber, copacityValidation, 'Не допустимый вариант выбора комнаты');

copacity.addEventListener('change', () => {
  pristine.validate(roomNumber);
});

function priceValidator() {
  return Number(price.value) >= Number(price.min);
}

function priceErrorMessage() {
  return `Минимальное значение: ${price.min}`;
}

pristine.addValidator(price, priceValidator, priceErrorMessage);


noUiSlider.create(sliderElement, {
  range: {
    min: SLIDER_MIN_RANGE,
    max: SLIDER_MAX_RANGE,
  },
  start: price.max / VALUE_SLIDER,
  step: SLIDER_COST_STEP,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseInt(value, 10);
    }

  }
});

sliderElement.noUiSlider.on('slide', () => {
  setPrice();
  price.value = sliderElement.noUiSlider.get();
  pristine.validate(price);
});

function setPrice() {
  price.placeholder = priceHousting[typeOfHousting.value];
  price.min = priceHousting[typeOfHousting.value];
}

typeOfHousting.addEventListener('change', () => {
  setPrice();
  pristine.validate(price);

  sliderElement.noUiSlider.updateOptions({
    start: price.max / VALUE_SLIDER,
  });
});

price.addEventListener('keydown', setPrice);

checkin.addEventListener('change', (evt) => {
  checkout.value = evt.target.value;
});

checkout.addEventListener('change', (evt) => {
  checkin.value = evt.target.value;
});


function blockSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
}

function unBlockSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}
function setFormSubmit() {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {onSuccess(); unBlockSubmitButton(); resetPage(adForm);},
        () => {onError('Не удается отправить форму, попробуйте еще раз!'); unBlockSubmitButton();},
        new FormData(evt.target));
    }
  });
}

export {
  setFormSubmit
};
