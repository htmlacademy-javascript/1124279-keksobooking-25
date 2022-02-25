function getRandomNumber(min, max) {
  let minRange = Math.abs(min);
  let maxRange = Math.abs(max);

  if (maxRange < minRange) {
    [minRange, maxRange] = [maxRange, minRange];
  }
  return Math.floor(Math.random() * (maxRange - minRange + 1) + minRange);
}


function generateRandomFloat(min, max, decimaPoint) {
  let minRange = Math.abs(min);
  let maxRange = Math.abs(max);

  if (maxRange < minRange) {
    [minRange, maxRange] = [maxRange, minRange];
  }
  return (Math.random() * (maxRange - minRange + 1) + minRange).toFixed(decimaPoint);
}


generateRandomFloat(7, -5, 3);

getRandomNumber(-121, -6);
