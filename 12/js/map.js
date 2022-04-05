import {
  setActiveForm,
  setActiveFilter
} from './form-status.js';
import {
  formattingAds,
  removeFeaturesElements,
  createPhoto
} from './util.js';

import {
  sortHousingPrice,
  sortHousingType,
  sortHousingRooms,
  sortHousingGuest,
  sortFeatures
} from './filtres.js';

const TYPES_OF_HOUSING = {
  FLAT: 'Квартира',
  BUNGALOW: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
  HOTEL: 'Отель'
};

const SIMMILAR_ADS_COUNT = 10;
const CITY_CENTER = {
  lat: 35.6895,
  lng: 139.69171,
};
const MAP_SIZE_VIEW = 12;
const MAIN_ICON_SIZE = 52;
const CENTER_MAIN_ICON = 26;

const ICON_SIZE = 40;
const CENTER_ICON = 20;

const address = document.querySelector('#address');


function createCustomPopup(author, offer) {
  const card = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);
  formattingAds(card, 'title', offer.title);
  formattingAds(card, 'text--address', offer.address);
  formattingAds(card, 'text--price', `${offer.price} ₽/ночь`);
  formattingAds(card, 'type', TYPES_OF_HOUSING[(offer.type).toUpperCase()]);
  formattingAds(card, 'text--capacity', offer.rooms && offer.guests ? `${offer.rooms} комнаты для ${offer.guests} гостей` : false);
  formattingAds(card, 'text--time', offer.checkin && offer.checkout ? `Заезд после ${offer.checkin}, выезд до ${offer.checkout}` : false);
  removeFeaturesElements(card, offer.features);
  formattingAds(card, 'description', offer.description);
  createPhoto(offer.photos, card);
  formattingAds(card, 'avatar', author.avatar, true);
  return card;
}


const map = L.map('map-canvas').on('load', () => {
  setActiveForm();
}).setView({
  lat: CITY_CENTER.lat,
  lng: CITY_CENTER.lng,
}, MAP_SIZE_VIEW );

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [MAIN_ICON_SIZE, MAIN_ICON_SIZE],
  iconAnchor: [CENTER_MAIN_ICON, MAIN_ICON_SIZE],
});
const icon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [ICON_SIZE, ICON_SIZE],
  iconAnchor: [CENTER_ICON, ICON_SIZE],
});


const mainPinmarker = L.marker({
  lat: CITY_CENTER.lat,
  lng: CITY_CENTER.lng,
}, {
  draggable: true,
  icon: mainPinIcon,
});

function closePopup() {
  map.closePopup();
}

mainPinmarker.addTo(map);

function resetMainPin() {
  mainPinmarker.setLatLng({
    lat: CITY_CENTER.lat,
    lng: CITY_CENTER.lng,
  });

  map.setView({
    lat: CITY_CENTER.lat,
    lng: CITY_CENTER.lng,
  }, MAP_SIZE_VIEW );
}

mainPinmarker.on('moveend', (evt) => {
  const pointLocation = evt.target.getLatLng();
  address.value = `${pointLocation.lat.toFixed(5)} ${pointLocation.lng.toFixed(5)}`;
});

const markerGroup = L.layerGroup().addTo(map);


function createMarker(points) {
  setActiveFilter();

  markerGroup.clearLayers();
  points
    .slice()
    .filter(sortHousingType)
    .filter(sortHousingPrice)
    .filter(sortHousingRooms)
    .filter(sortHousingGuest)
    .filter(sortFeatures)
    .slice(0, SIMMILAR_ADS_COUNT)
    .forEach((point) => {
      const {
        author,
        location,
        offer
      } = point;
      const lat = location.lat;
      const lng = location.lng;
      const marker = L.marker({
        lat,
        lng,
      }, {
        icon,
      });
      marker
        .addTo(markerGroup)
        .bindPopup(createCustomPopup(author, offer));
    });
}

function removePins() {
  markerGroup.clearLayers();
}

export {
  createMarker,
  resetMainPin,
  closePopup,
  removePins

};
