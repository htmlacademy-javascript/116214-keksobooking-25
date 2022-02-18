function getRandomInteger(min, max) {
  if (min < 0) {
    min = 0;
  }

  if (max <= min) {
    return min;
  }

  return Math.random() * (max + 1 - min) + min;
}

getRandomInteger();

function getRandomFloat(min, max, decimalCount) {
  const decimalFactor = Math.pow(10, decimalCount);

  min = Math.round(min * decimalFactor);
  max = Math.round(max * decimalFactor);

  return getRandomInteger(min, max) / decimalFactor;
}

getRandomFloat();
