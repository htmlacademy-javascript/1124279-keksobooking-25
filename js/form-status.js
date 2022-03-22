const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFiltersSelect = mapFilter.querySelectorAll('select');

const address = adForm.querySelector('#address');
const LOCATION_CENTER_CITY = '35.6895 139.69171';

function setInactiveForm () {
  function setElementDisabled (elements) {
    elements.forEach((element) => {
      element.disabled = 'true';
    });
  }

  adForm.classList.add('ad-form--disabled');
  mapFilter.classList.add('map__filters--disabled');

  setElementDisabled(adFormFieldsets);
  setElementDisabled(mapFiltersSelect);
}


function setActriveForm () {
  adForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('map__filters--disabled');
  address.value = LOCATION_CENTER_CITY;
}

export {setInactiveForm, setActriveForm};


