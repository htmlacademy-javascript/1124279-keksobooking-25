import {
  setActriveForm
} from './form-status.js';
import {
  getSimillarAds
} from './data.js';
import {
  formattingAds, removeFeaturesElements, createPhoto, typesHousing
} from './generating-similar-ads.js';

const simillarAds = getSimillarAds();

const address = document.querySelector('#address');



function createCustomPopup (author, offer) {
  const card = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);

  formattingAds(card, 'title', offer.title);
  formattingAds(card, 'text--address', offer.address);
  formattingAds(card, 'text--address', offer.address);
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

mainPinmarker.addTo(map);

mainPinmarker.on('moveend', (evt) => {
  const pointLocation = evt.target.getLatLng();
  address.value = `${pointLocation.lat.toFixed(5)} ${pointLocation.lng.toFixed(5)}`;
});

const markerGroup = L.layerGroup().addTo(map);

function createMarker (point) {
  const {author, location, offer} = point;

  const lat = location.lat;
  const lng = location.lng;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    }
  );
  marker
    .addTo(markerGroup)
    .bindPopup(createCustomPopup(author, offer));
};


simillarAds.forEach((point) => {
  createMarker (point);
});
