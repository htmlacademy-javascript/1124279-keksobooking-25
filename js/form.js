const adForm = document.querySelector('.ad-form');
const roomNumber = adForm.querySelector('#room_number');
const copacity = adForm.querySelector('#capacity');
const typeOfHousting = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const checkin = adForm.querySelector('#timein');
const checkout = adForm.querySelector('#timeout');


const roomCopacity = {
  '1' : ['1'],
  '2' : ['1', '2'],
  '3' : ['1', '2','3'],
  '100' : ['0'],
};

const priceHousting = {
  'bungalow': 0,
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

function copacityValidation () {
  return roomCopacity[roomNumber.value].includes(copacity.value);
}

pristine.addValidator(roomNumber, copacityValidation, 'Не допустимый вариант выбора комнаты');

copacity.addEventListener('change', () => {
  pristine.validate(roomNumber);
});

function priceValidator() {
  return +price.value >= +price.min;
}

function priceErrorMessage () {
  return `Цена за ночь не может привышать ${price.min}`;
}

pristine.addValidator(price, priceValidator, priceErrorMessage);

typeOfHousting.addEventListener('change', () => {
  price.placeholder = priceHousting[typeOfHousting.value];
  price.min = priceHousting[typeOfHousting.value];
  pristine.validate(price);
});

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


// 1 комната — «для 1 гостя»;
// 2 комнаты — «для 2 гостей» или «для 1 гостя»;
// 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
// 100 комнат — «не для гостей».
