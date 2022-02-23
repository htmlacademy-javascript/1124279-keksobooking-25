// function formattingRange(min, max) {
//   if (min === max) {
//   min = 0;
//   }
//   if (min < 0 || max < 0) {
//   min = Math.abs(min);
//   max = Math.abs(max);
//   }
//   if (min > max) {
//   [min, max] = [max, min];
//   }
//   return [min, max];
//   }

//   function getRandomNumber(min, max) {
//   const arr = formattingRange(min, max);
//   return Math.floor(Math.random() * (arr[1] - arr[0] + 1) + arr[0]);
//   }

//   function generateRandomFloat(min, max, decimaPoint) {
//   const arr = formattingRange(min, max);
//   return (Math.random() * (arr[1] - arr[0] + 1) + arr[0]).toFixed(decimaPoint);
//   }

//   generateRandomFloat(7, -5, 3);
//   getRandomNumber(-121, -6);

function getRandomNumber(min, max) {
  if (min === max) {
    min = 0;
  }
  if (min < 0 || max < 0) {
    min = Math.abs(min);
    max = Math.abs(max);
  }
  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomFloat(min, max, decimaPoint) {
  if (min === max) {
    min = 0;
  }
  if (min < 0 || max < 0) {
    min = Math.abs(min);
    max = Math.abs(max);
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return (Math.random() * (max - min + 1) + min).toFixed(decimaPoint);
}


generateRandomFloat(7, -5, 3);
getRandomNumber(-121, -6);
