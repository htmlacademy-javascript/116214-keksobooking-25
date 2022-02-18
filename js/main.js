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
