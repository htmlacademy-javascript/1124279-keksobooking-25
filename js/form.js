const adForm = document.querySelector('.ad-form');
const roomNumber = adForm.querySelector('#room_number');
const guestCount = adForm.querySelector('#capacity');
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
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const SLIDER_COST_STEP = 500;
const DEFAULT_PLACEHOLDER = 1000;
const PRICE_MIN = 0;

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error',
});

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetPage(adForm);
});

function guestCountValidation() {
  return roomCopacity[roomNumber.value].includes(guestCount.value);
}

function showErrorCountGuest () {
  return  'Недопустимое количество гостей';
}

pristine.addValidator(guestCount, guestCountValidation, showErrorCountGuest);

guestCount.addEventListener('change', () => {
  pristine.validate(guestCount);
});

roomNumber.addEventListener('change', () => {
  pristine.validate(guestCount);
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
    min: Number(price.min),
    max: Number(price.max),
  },
  start: Number(price.min),
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
  price.value = '';
  price.placeholder = priceHousting[typeOfHousting.value];
  price.min = priceHousting[typeOfHousting.value];
}

typeOfHousting.addEventListener('change', () => {
  setPrice();
  pristine.validate(price);
  sliderElement.noUiSlider.updateOptions({
    start: Number(price.min),
  });
});

price.addEventListener('keydown', setPrice);

checkin.addEventListener('change', (evt) => {
  checkout.value = evt.target.value;
});

checkout.addEventListener('change', (evt) => {
  checkin.value = evt.target.value;
});


function resetValueForm () {
  price.placeholder = DEFAULT_PLACEHOLDER;
  price.min = PRICE_MIN;
  sliderElement.noUiSlider.updateOptions({
    start: Number(price.min),
  });
}

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
      resetValueForm ();
      blockSubmitButton();
      sendData(
        () => {onSuccess(); unBlockSubmitButton(); resetPage(adForm);},
        () => {onError('Не удается отправить форму, попробуйте еще раз!'); unBlockSubmitButton();},
        new FormData(evt.target));
    }
  });
}

export {
  resetValueForm,
  setFormSubmit
};
