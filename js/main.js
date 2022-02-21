function getRandomNumber(min, max) {
  if (min === max || min > max) {
    max = Math.random() * (max + 1);
    min = Math.random() * (min + 1);
  }
  return Math.abs(Math.floor(Math.random() * (max - min + 1) + min));
}


function generateRandomFloat(min, max, decimaPoint) {
  if (min === max || min > max) {
    max = Math.random() * (max + 1);
    min = Math.random() * (min + 1);
  }
  return Math.abs((Math.random() * (max - min + 1) + min).toFixed(decimaPoint));
}


generateRandomFloat(25, 25, 3);

getRandomNumber(1, 0);


