const adForm = document.querySelector('.ad-form');
const roomNumber = adForm.querySelector('#room_number');
const copacity = adForm.querySelector('#capacity');


const roomCopacity = {
  '1' : ['1'],
  '2' : ['1', '2'],
  '3' : ['1', '2','3'],
  '100' : ['0'],
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

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


// 1 комната — «для 1 гостя»;
// 2 комнаты — «для 2 гостей» или «для 1 гостя»;
// 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
// 100 комнат — «не для гостей».
