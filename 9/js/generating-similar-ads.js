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


function formattingAds(element, modifier, property, src = false) {
  if (!property) {
    return element.querySelector(`.popup__${  modifier}`).classList.add('hidden');
  }
  if (src) {
    element.querySelector(`.popup__${  modifier}`).src = property;
  }
  element.querySelector(`.popup__${  modifier}`).textContent = property;
}


export {formattingAds, removeFeaturesElements, createPhoto,typesHousing };
