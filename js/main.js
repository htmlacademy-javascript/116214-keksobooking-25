const SIMILAR_ADDS_COUNT = 10;
const userIds = [];
const addTypes = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator'];
const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

function getRandomPositiveInteger(num1, num2) {
  const min = Math.ceil(Math.min(Math.abs(num1), Math.abs(num2)));
  const max = Math.floor(Math.max(Math.abs(num1), Math.abs(num2)));
  const result = Math.random() * (max - min + 1) + min;
  return  Math.floor(result);
}

function getRandomPositiveFloat(num1, num2, digits = 1) {
  const min = Math.min(Math.abs(num1), Math.abs(num2));
  const max = Math.max(Math.abs(num1), Math.abs(num2));
  const result = Math.random() * (max - min) + min;
  return +result.toFixed(digits);
}

const similarAdds = Array.from({length: SIMILAR_ADDS_COUNT}, getSimilarAdd);
similarAdds.sort();

function getSimilarAdd() {
  return {
    author: getAuthor(),
    offer: getOffer(),
    location: getLocation()
  };
}

function getAuthor() {
  return {
    avatar: `img/avatars/user${getUserId()}.png`
  };
}

function getUserId() {
  let userId = getRandomPositiveInteger(1, 10);
  userId = userId < 10 ?
    userId.toString().padStart(2, '0') :
    userId.toString();
  return !userIds.includes(userId) ?
    userIds.push(userId) && userId :
    getUserId();
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

function getFeatures() {
  return features.slice(getRandomPositiveInteger(0, features.length - 1));
}

function getPhotos() {
  return photos.slice(getRandomPositiveInteger(0, photos.length - 1));
}

function getOffer() {
  return {
    title: 'title',
    address: getAddress(),
    price: getPrice(),
    type: getAddType(),
    rooms: getRooms(),
    guests: getGuests(),
    checkin: getRandomTime(),
    checkout: getRandomTime(),
    features: getFeatures(),
    description: 'description',
    photos: getPhotos()
  };
}

function getLocation() {
  return {
    lat: getLatitude(),
    lng: getLongitude()
  };
}

function getLatitude() {
  return getRandomPositiveFloat(35.65, 35.7, 5);
}

function getLongitude() {
  return getRandomPositiveFloat(139.7, 139.8, 5);
}

function getAddress() {
  return `${getLatitude()}, ${getLongitude()}`;
}
