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


const TYPES_HOUSTING = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
const CHECOUT_TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTIONS = ['Etiam finibus magna', 'et est aliquam, sed semper libero facilisis', 'Donec lectus lorem','rhoncus vitae quam eget', 'vulputate gravida elit','Praesent ultricieseros id velit condimentum','eu ultrices nisl consequat'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg','https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg','https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const LOCATION_LAT = {
  min: 35.65000,
  max: 35.70000
};
const LOCATION_LNG = {
  min: 139.70000,
  max: 139.80000
};
const FLOATING_NUMBER = 5;
const LENGTH_ARRAY_ADS = 10;
const MIN_VALUE = 1;
const MAX_PRICE = 10000;
const MAX_NUMBER_ROOMS = 3;
const MAX_GUEST = 7;

const arrayFormattedNumbers = formattingNumber(createNotRepeatNumbers(1, 10));
const similarAds = Array.from({
  length: LENGTH_ARRAY_ADS
}, (_value, index) => {
  const location = {
    lat: generateRandomFloat(LOCATION_LAT.min, LOCATION_LAT.max, FLOATING_NUMBER),
    lng: generateRandomFloat(LOCATION_LNG.min, LOCATION_LNG.max, FLOATING_NUMBER),
  };
  return {
    author: {
      avatar: `img/avatars/user${arrayFormattedNumbers[index]}.png`,
    },
    offer: {
      title: `Предложения №${arrayFormattedNumbers[index]}`,
      address: `${location.lat}, ${location.lng}`,
      price: getRandomNumber(MIN_VALUE, MAX_PRICE),
      type: getRandomArrayElement(TYPES_HOUSTING),
      rooms: getRandomNumber(MIN_VALUE, MAX_NUMBER_ROOMS),
      guests: getRandomNumber(MIN_VALUE, MAX_GUEST),
      checkin: getRandomArrayElement(CHECKIN_TIMES),
      checkout: getRandomArrayElement(CHECOUT_TIMES),
      features: getRandomArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArray(PHOTOS),
    },
    location: {
      lat: location.lat,
      lng: location.lng,
    },
  };
});


console.log(similarAds);
