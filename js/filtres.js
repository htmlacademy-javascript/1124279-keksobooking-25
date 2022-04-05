const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuest = document.querySelector('#housing-guests');
const filter = document.querySelector('.map__filters');
const housingFilters = filter.querySelectorAll('select');
const featuresCheckboxes = filter.querySelectorAll('input[type=checkbox]');

const MIN_COST_VALUE = 10000;
const MAX_COST_VALUE = 50000;


function grabCheckboxValues() {
  const checkboxValues = [];
  featuresCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkboxValues.push(checkbox.value);
    }
  });
  return checkboxValues;
}

function sortFeatures(point) {
  const adFeatures = point.offer.features || [];
  const values = grabCheckboxValues();
  return values.every((value) => adFeatures.includes(value));
 

}


function setCheckboxChange(cb) {
  featuresCheckboxes.forEach((box) => {
    box.checked = false;
    box.addEventListener('change', () => cb());
  });
}

function sortHousingType(point) {
  if (housingType.value === 'any') {
    return true;
  }
  return point.offer.type === housingType.value;
}

function sortHousingRooms(point) {
  if (housingRooms.value === 'any') {
    return true;
  }
  return Number(housingRooms.value) === Number(point.offer.rooms);
}

function sortHousingGuest(point) {
  if (housingGuest.value === 'any') {
    return true;
  }
  return Number(housingGuest.value) === Number(point.offer.guests);
}


function sortHousingPrice(point) {
  switch (housingPrice.value) {
    case 'any':
      return true;
    case 'low':
      if (point.offer.price < MIN_COST_VALUE) {
        return -1;
      }
      break;
    case 'middle':
      if (point.offer.price >= MIN_COST_VALUE && point.offer.price <= MAX_COST_VALUE) {
        return -1;
      }
      break;
    case 'high':
      if (point.offer.price >= MAX_COST_VALUE) {
        return -1;
      }
      break;
  }
}

function setFilterChange(cb) {
  housingFilters.forEach((element) => {
    element.addEventListener('input', () => {
      cb();
    });
  });
}

function resetFilter() {
  housingType.value = 'any';
  housingPrice.value = 'any';
  housingRooms.value = 'any';
  housingGuest.value = 'any';

  featuresCheckboxes.forEach((checkbox) => {checkbox.checked = false;});
}


export {
  setCheckboxChange,
  sortFeatures,
  sortHousingGuest,
  resetFilter,
  setFilterChange,
  sortHousingRooms,
  sortHousingPrice,
  sortHousingType,
};
