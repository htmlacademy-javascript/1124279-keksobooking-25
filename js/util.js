function getRandomNumber(min, max) {
  let minRange = Math.abs(min);
  let maxRange = Math.abs(max);
  if (maxRange < minRange) {
    [minRange, maxRange] = [maxRange, minRange];
  }
  return Math.floor(Math.random() * (maxRange - minRange + 1) + minRange);
}


function generateRandomFloat(a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return Number(result.toFixed(digits));
}

const formattingNumber = (arr) => {
  const arrayNumbers = [];
  for (let i = 0; i <= arr.length - 1; i++) {
    const element = (arr[i] >= 10) ? `${arr[i]}` : `0${arr[i]}`;
    arrayNumbers.push(element);
  }
  return arrayNumbers;
};

const createNotRepeatNumbers = (min, max) => {
  const randomNumbers = [];
  for (let i = min; i <= max; i++) {
    const number = Math.floor(Math.random() * (max - min + 1) + min);
    if (randomNumbers.indexOf(number) === -1) {
      randomNumbers.push(number);
    } else {
      i--;
    }
  }
  return randomNumbers;
};


const getRandomArray = (elements) => {
  const arr = [];
  for (let i = 0; i <= getRandomNumber(0, elements.length - 1); i++) {
    const randomElement = elements[getRandomNumber(0, elements.length - 1)];
    if (!arr.includes(randomElement)) {
      arr.push(randomElement);
    }
  }
  return arr;
};


const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';


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

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

  };
}
export {
  debounce,
  removeFeaturesElements,
  createPhoto,
  formattingAds,
  isEscapeKey,
  getRandomNumber,
  generateRandomFloat,
  formattingNumber,
  createNotRepeatNumbers,
  getRandomArray,
  getRandomArrayElement
};
