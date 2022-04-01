const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuest = document.querySelector('#housing-guests');

const MIN_COST_VALUE = 10000;
const MAX_COST_VALUE = 50000;


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

function setFilterChange(item, cb) {
  item.addEventListener('change', () => {
    cb();
  });
}



function resetFilter() {
  housingType.value = 'any';
  housingPrice.value = 'any';
  housingRooms.value = 'any';
  housingGuest.value = 'any';
}
export {
  sortHousingGuest,
  resetFilter,
  setFilterChange,
  sortHousingRooms,
  sortHousingPrice,
  sortHousingType,


};
