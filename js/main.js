const SIMILAR_ADDS_COUNT = 10;
const userIds = [];

function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return  Math.floor(result);
}

getRandomPositiveInteger(5, 10);

function getRandomPositiveFloat(a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

getRandomPositiveFloat(5.3, 5.4, 5);

const similarAdds = Array.from({length: SIMILAR_ADDS_COUNT}, getSimilarAdd);
console.log(similarAdds);

function getSimilarAdd() {
  return {
    author: getAuthor(),
    offer: 'offer',
    location: 'location'
  };
}

function getAuthor() {
  return {
    avatar: `img/avatars/user${getUserId()}.png`
  };
}


