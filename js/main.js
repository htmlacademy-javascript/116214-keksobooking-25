function getRandomInteger(min, max) {
  if (min < 0) {
    min = 0;
  }

  if (max <= min) {
    return min;
  }

  return  Math.floor(Math.random() * (max + 1 - min) + min);
}

getRandomInteger(5, 10);

function getRandomFloat(min, max, decimalCount) {
  const decimalFactor = Math.pow(10, decimalCount);

  min = Math.round(min * decimalFactor);
  max = Math.round(max * decimalFactor);

  return getRandomInteger(min, max) / decimalFactor;
}

getRandomFloat(5.3, 5.4, 5);
