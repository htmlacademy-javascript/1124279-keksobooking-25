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
  return +result.toFixed(digits);
}

const formattingNumber = (arr) => {
  const arrayNumbers = [];
  for (let i = 0; i <= arr.length - 1; i++) {
    const element = (arr[i] >= 10) ? `${arr[i]}`:`0${arr[i]}`;
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
const formatNumbers = formattingNumber(createNotRepeatNumbers(1, 10));
console.log(formatNumbers);

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


const TYPE_HOUSTING = ['palace', 'flat', 'house', 'bungalow', 'hotel'],
  CHECKIN = ['12:00', '13:00', '14:00'],
  CHECOUT = ['12:00', '13:00', '14:00'],
  FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  DESCRIPTION = ['Etiam finibus magna', 'et est aliquam, sed semper libero facilisis', 'Donec lectus lorem', 'rhoncus vitae quam eget', 'vulputate gravida elit', 'Praesent ultricieseros id velit condimentum', 'eu ultrices nisl consequat'],
  PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];




const similarAds = Array.from({length: 10}, (_value, index) => {
  const locationLat = generateRandomFloat(35.65000, 35.70000, 5);
  const locationLng = generateRandomFloat(139.70000, 139.80000, 5);
  return {
    author: {
      avatar: `img/avatars/user${formatNumbers[index]}.png`,
    },
    offer: {
      title: `Предложения №${formatNumbers[index]}`,
      address: `${locationLat}, ${locationLng}`,
      price: getRandomNumber(1, 10000),
      type: getRandomArrayElement(TYPE_HOUSTING),
      rooms: getRandomNumber(1, 3),
      guests: getRandomNumber(1, 7),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECOUT),
      features: getRandomArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTION),
      photos: getRandomArray(PHOTOS),
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    },
  };
});


console.log(similarAds);
