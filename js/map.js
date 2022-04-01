import {
  setActriveForm
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
  sortHousingGuest
} from './filtres.js';
const typesHousing = {
  FLAT: 'Квартира',
  BUNGALOW: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
  HOTEL: 'Отель'
};

const address = document.querySelector('#address');


function createCustomPopup(author, offer) {
  const card = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);
  formattingAds(card, 'title', offer.title);
  formattingAds(card, 'text--address', offer.address);
  formattingAds(card, 'text--price', `${offer.price} ₽/ночь`);
  formattingAds(card, 'type', typesHousing[(offer.type).toUpperCase()]);
  formattingAds(card, 'text--capacity', offer.rooms && offer.guests ? `${offer.rooms} комнаты для ${offer.guests} гостей` : false);
  formattingAds(card, 'text--time', offer.checkin && offer.checkout ? `Заезд после ${offer.checkin}, выезд до ${offer.checkout}` : false);
  removeFeaturesElements(card, offer.features);
  formattingAds(card, 'description', offer.description);
  createPhoto(offer.photos, card);
  formattingAds(card, 'avatar', author.avatar, true);
  return card;
}


const map = L.map('map-canvas')
  .on('load', () => {
    setActriveForm();
  })
  .setView({
    lat: 35.6895,
    lng: 139.69171,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const icon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


const mainPinmarker = L.marker({
  lat: 35.6895,
  lng: 139.69171,
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
    lat: 35.6895,
    lng: 139.69171,
  });

}

mainPinmarker.on('moveend', (evt) => {
  const pointLocation = evt.target.getLatLng();
  address.value = `${pointLocation.lat.toFixed(5)} ${pointLocation.lng.toFixed(5)}`;
});

const markerGroup = L.layerGroup().addTo(map);


function createMarker(points, countAds) {
  markerGroup.clearLayers();
  points
    .slice()
    .sort((point) => sortHousingType(point))
    .sort((point) => sortHousingPrice(point))
    .sort((point) => sortHousingRooms(point))
    .sort((point) => sortHousingGuest(point))
    .slice(0, countAds)
    .forEach((point) => {
      console.log(`${point.offer.price} - ${point.offer.type} - ${point.offer.rooms} комнат - ${point.offer.guests}`);
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

export {
  createMarker,
  resetMainPin,
  closePopup
};
