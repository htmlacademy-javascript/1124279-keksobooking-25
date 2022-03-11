import {
  getSimillarAds
} from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('.map__canvas');
const dataForAds = getSimillarAds();

// const dataForAds = [{
//   author: {
//     avatar: 'img/avatars/user02.png'
//   },
//   offer: {
//     title: 'Предложения №01',
//     address: '35.69138, 139.76512',
//     price: 5637,
//     type: 'bungalow',
//     rooms: 1,
//     guests: 1,
//     checkin: '14:00',
//     checkout: '13:00',
//     features: [
//       'washer',
//       'dishwasher',
//       'wifi'
//     ],
//     description: 'Donec lectus lorem',
//     photos: [
//       'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
//       'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg'
//     ]
//   },
//   location: {
//     lat: 35.69138,
//     lng: 139.76512
//   }
// }];

const typesHousing = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const similarAdsFragment = document.createDocumentFragment();

function filterFeatures(element, array) {
  if (!array) {
    return element.querySelector('.popup__features').classList.add('hidden');
  }
  const featuresList = element.querySelectorAll('.popup__feature');
  const offerFeatures = array;
  featuresList.forEach((featuresListItem) => {
    const isNecessary = offerFeatures.some((offerFeature) => featuresListItem.classList.contains(`popup__feature--${offerFeature}`));
    if (!isNecessary) {
      featuresListItem.remove();
    }
  });
}

function createPhoto(array, element) {
  if (!array) {
    return element.querySelector('.popup__photos').classList.add('hidden');
  }
  const photos = element.querySelector('.popup__photos');
  const photoFragmet = document.createDocumentFragment();
  for (let i = 0; i < array.length; i++) {
    const img = photos.querySelector('.popup__photo').cloneNode(true);
    img.src = array[i];
    photoFragmet.append(img);
  }
  photos.innerHTML = '';
  photos.append(photoFragmet);
}

dataForAds.forEach(({
  author,
  offer
}) => {
  const adElement = cardTemplate.cloneNode(true);

  adElement.querySelector('.popup__title').textContent = offer.title ? offer.title : adElement.querySelector('.popup__title').classList.add('hidden');
  adElement.querySelector('.popup__text--address').textContent = offer.address ? offer.address : adElement.querySelector('.popup__text--address').classList.add('hidden');
  adElement.querySelector('.popup__text--price').textContent = offer.price ? `${offer.price} ₽/ночь` : adElement.querySelector('.popup__text--price').classList.add('hidden');
  adElement.querySelector('.popup__type').textContent = offer.type ? typesHousing[offer.type] : adElement.querySelector('.popup__type').classList.add('hidden');
  adElement.querySelector('.popup__text--capacity').textContent = offer.rooms && offer.guests ? `${offer.rooms} комнаты для ${offer.guests} гостей` : adElement.querySelector('.popup__text--capacity').classList.add('hidden');
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  filterFeatures(adElement, offer.features);
  adElement.querySelector('.popup__description').textContent = offer.description ? offer.description : adElement.querySelector('.popup__description').classList.add('hidden');
  createPhoto(offer.photos, adElement);
  adElement.querySelector('.popup__avatar').src = author.avatar ? author.avatar : adElement.querySelector('.popup__avatar').classList.add('hidden');
  similarAdsFragment.append(adElement);
});
mapCanvas.append(similarAdsFragment);
