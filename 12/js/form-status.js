const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFiltersSelect = mapFilter.querySelectorAll('input');


const address = adForm.querySelector('#address');
const LOCATION_CENTER_CITY = {
  lat: '35.6895',
  lng: '139.69171',
};


function setAddressValue() {
  address.value = `${LOCATION_CENTER_CITY.lat}  ${LOCATION_CENTER_CITY.lng}`;
}


function setInactiveForm() {
  // adForm.classList.add('ad-form--disabled');
  // mapFilter.classList.add('map__filters--disabled');
  // adFormFieldsets.forEach((element) => {
  //   element.disabled = true;
  // });
  // mapFiltersSelect.forEach((element) => {
  //   element.disabled = true;
  // });
}


function setActiveForm() {
  adForm.classList.remove('ad-form--disabled');
  adFormFieldsets.forEach((element) => {
    element.disabled = false;
  });
  setAddressValue();
}

function setActiveFilter () {
  mapFilter.classList.remove('map__filters--disabled');
  mapFiltersSelect.forEach((element) => {
    element.disabled = false;
  });
}

export {
  setActiveFilter,
  setInactiveForm,
  setActiveForm,
  setAddressValue
};
