const adForm = document.querySelector('.ad-form');
const roomNumber = adForm.querySelector('#room_number');
const copacity = adForm.querySelector('#capacity');
const typeOfHousting = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const checkin = adForm.querySelector('#timein');
const checkout = adForm.querySelector('#timeout');


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
  return `Минимальная цена не может быть меньше: ${price.min}`;
}

pristine.addValidator(price, priceValidator, priceErrorMessage);

function setPrice () {
  price.placeholder = priceHousting[typeOfHousting.value];
  price.min = priceHousting[typeOfHousting.value];
}

typeOfHousting.addEventListener('change', () => {
  setPrice();
  price.value = '';
  pristine.validate(price);
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

