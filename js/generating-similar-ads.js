import {
  getSimillarAds
} from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('.map__canvas');
const dataForAds = getSimillarAds();

const typesHousing = {
  FLAT: 'Квартира',
  BUNGALOW: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
  HOTEL: 'Отель'
};

const similarAdsFragment = document.createDocumentFragment();

function removeFeaturesElements(element, array) {
  if (!array) {
    return element.querySelector('.popup__features').classList.add('hidden');
  }
  const featuresList = element.querySelectorAll('.popup__feature');
  featuresList.forEach((featuresListItem) => {
    const isNecessary = array.some((offerFeature) => featuresListItem.classList.contains(`popup__feature--${offerFeature}`));
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


function formattingAds (element, modifier, property, src = false) {
  if (!property) {
    return element.querySelector(`.popup__${  modifier}`).classList.add('hidden');
  }
  if (src) {
    element.querySelector(`.popup__${  modifier}`).src = property;
  }
  element.querySelector(`.popup__${  modifier}`).textContent = property;
}

dataForAds.forEach(({
  author,
  offer
}) => {
  const adElement = cardTemplate.cloneNode(true);
  formattingAds(adElement, 'title', offer.title);
  formattingAds(adElement, 'text--address', offer.address);
  formattingAds(adElement, 'text--address', offer.address);
  formattingAds(adElement, 'type', typesHousing[(offer.type).toUpperCase()]);
  formattingAds(adElement, 'text--capacity', offer.rooms&&offer.guests ?  `${offer.rooms} комнаты для ${offer.guests} гостей`: false);
  formattingAds(adElement, 'text--time', offer.checkin&&offer.checkout ? `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`:false);
  removeFeaturesElements(adElement, offer.features);
  formattingAds(adElement, 'description',  offer.description);
  createPhoto(offer.photos, adElement);
  formattingAds(adElement, 'avatar', author.avatar, true);
  similarAdsFragment.append(adElement);
});
mapCanvas.append(similarAdsFragment);

