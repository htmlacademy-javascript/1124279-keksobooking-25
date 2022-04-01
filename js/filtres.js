

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuest = document.querySelector('#housing-guests');

function sortHousingType(point) {
  return point.offer.type === housingType.value ? -1 : 0;
}

function sortHousingRooms(point) {
  return Number(housingRooms.value)  === Number(point.offer.rooms) ? -1 : 0;
}

function sortHousingGuest(point) {
  return Number(housingGuest.value)  === Number(point.offer.guests) ? -1 : 0;
}

function sortHousingPrice(point) {
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
  housingRooms.addEventListener('change', (evt) => {
    housingRooms.value = evt.target.value;
    cb();
  });
}

function setCostHousing(cb) {
  housingPrice.addEventListener('change', (evt) => {
    housingPrice.value = evt.target.value;
    cb();
  });
}
function setHousingGuest(cb) {
  housingGuest.addEventListener('change', (evt) => {
    housingGuest.value = evt.target.value;
    cb();
  });
}

function setTypeHousing(cb) {
  housingType.addEventListener('change', (evt) => {
    housingType.value = evt.target.value;
    cb();
  });
}

export {
  setHousingGuest,
  sortHousingGuest,
  setHousingRooms,
  sortHousingRooms,
  sortHousingPrice,
  sortHousingType,
  setTypeHousing,
  setCostHousing
};
