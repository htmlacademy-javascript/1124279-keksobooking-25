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


export {getRandomNumber,generateRandomFloat,formattingNumber,createNotRepeatNumbers,getRandomArray,getRandomArrayElement};
