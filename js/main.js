const SIMILAR_ADDS_COUNT = 10;
const userIds = [];
const addTypes = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

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
    offer: getOffer(),
    location: 'location'
  };
}

function getAuthor() {
  return {
    avatar: `img/avatars/user${getUserId()}.png`
  };
}

function getUserId() {
  let userId;
  do {
    userId = getRandomPositiveInteger(1, 10).toString();
    if (userId < 10) {
      userId = userId.padStart(2, '0');
    }
  } while (userIds.includes(userId));
  userIds.push(userId);
  return userId;
}

function getPrice() {
  return getRandomPositiveInteger(100, 1000);
}

function getAddType() {
  return addTypes[getRandomPositiveInteger(0, addTypes.length - 1)];
}

function getRooms() {
  return getRandomPositiveInteger(1, 10);
}

function getGuests() {
  return getRandomPositiveInteger(1, 20);
}

function getRandomTime() {
  const hour = getRandomPositiveInteger(12, 14);
  return hour.toString().concat(':00');
}

function getOffer() {
  return {
    title: 'title',
    address: 'address',
    price: getPrice(),
    type: getAddType(),
    rooms: getRooms(),
    guests: getGuests(),
    checkin: getRandomTime(),
    checkout: getRandomTime(),
    features: 'features',
    description: 'description',
    photos: 'photos'
  };
}
