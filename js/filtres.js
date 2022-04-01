

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuest = document.querySelector('#housing-guests');


function sortHousingType(point) {
  if (housingType.value === 'any') {return true;}
  return point.offer.type === housingType.value;
}

function sortHousingRooms(point) {
  if (housingRooms.value === 'any') {return true;}
  return Number(housingRooms.value)  === Number(point.offer.rooms);
}

function sortHousingGuest(point) {
  if (housingGuest.value === 'any') {return true;}
  return Number(housingGuest.value)  === Number(point.offer.guests);
}

function sortHousingPrice(point) {
  if (housingPrice.value === 'any') {return true;}
  if (housingPrice.value === 'low') {
    if (point.offer.price < 10000) {
      return -1;
    }
  }
  if (housingPrice.value === 'middle') {
    if (point.offer.price >= 10000 && point.offer.price <= 50000) {
      return -1;
    }

  }
  if (housingPrice.value === 'high') {
    if (point.offer.price >= 50000) {
      return -1;
    }
  }
}

function setHousingRooms(cb) {
  housingRooms.addEventListener('change', () => {
    cb();
  });
}

function setCostHousing(cb) {
  housingPrice.addEventListener('change', () => {
    cb();
  });
}
function setHousingGuest(cb) {
  housingGuest.addEventListener('change', () => {
    cb();
  });
}

function setTypeHousing(cb) {
  housingType.addEventListener('change', () => {
    cb();
  });
}


function resetFilter () {
  housingType.value = 'any';
  housingPrice.value = 'any';
  housingRooms.value = 'any';
  housingGuest.value = 'any';
}
export {
  resetFilter,
  setHousingGuest,
  sortHousingGuest,
  setHousingRooms,
  sortHousingRooms,
  sortHousingPrice,
  sortHousingType,
  setTypeHousing,
  setCostHousing
};
