const adForm = document.querySelector('.ad-form');
const roomNumber = adForm.querySelector('#room_number');
const copacity = adForm.querySelector('#capacity');
const typeOfHousting = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const checkin = adForm.querySelector('#timein');
const checkout = adForm.querySelector('#timeout');
const sliderElement = document.querySelector('.ad-form__slider');

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

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error',
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
    min: 0,
    max: 100000,
  },
  start: price.max / 5,
  step: 500,
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
    start: price.max / 5,
  });
});

price.addEventListener('keydown', setPrice);

checkin.addEventListener('change', (evt) => {
  checkout.value = evt.target.value;
});

checkout.addEventListener('change', (evt) => {
  checkin.value = evt.target.value;
});



adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
