const SIMILAR_ADDS_COUNT = 10;
const userIds = [];
const realtyTypes = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator'];
const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const getRandomPositiveInteger = (num1, num2) => {
  const min = Math.ceil(Math.min(Math.abs(num1), Math.abs(num2)));
  const max = Math.floor(Math.max(Math.abs(num1), Math.abs(num2)));
  const result = Math.random() * (max - min + 1) + min;
  return  Math.floor(result);
};

const getRandomPositiveFloat = (num1, num2, digits = 1) => {
  const min = Math.min(Math.abs(num1), Math.abs(num2));
  const max = Math.max(Math.abs(num1), Math.abs(num2));
  const result = Math.random() * (max - min) + min;
  return +result.toFixed(digits);
};

const getUserId = () => {
  let userId = getRandomPositiveInteger(1, 10);
  userId = userId < 10 ?
    userId.toString().padStart(2, '0') :
    userId.toString();
  return !userIds.includes(userId) ?
    userIds.push(userId) && userId :
    getUserId();
};

const getAuthor = () => ({avatar: `img/avatars/user${getUserId()}.png`});

const getPrice = () => getRandomPositiveInteger(100, 1000);

const getRealtyTypes = () => realtyTypes[getRandomPositiveInteger(0, realtyTypes.length - 1)];

const getRooms = () => getRandomPositiveInteger(1, 10);

const getGuests = () => getRandomPositiveInteger(1, 20);

const getRandomTime = () => {
  const hour = getRandomPositiveInteger(12, 14);
  return hour.toString().concat(':00');
};

const getFeatures = () => features.slice(getRandomPositiveInteger(0, features.length - 1));

const getPhotos = () => photos.slice(getRandomPositiveInteger(0, photos.length - 1));

const getLatitude = () => getRandomPositiveFloat(35.65, 35.7, 5);

const getLongitude = () => getRandomPositiveFloat(139.7, 139.8, 5);

const getLocation = () => ({
  lat: getLatitude(),
  lng: getLongitude()
});

const getOffer = () => ({
  title: 'title',
  address: '',
  price: getPrice(),
  type: getRealtyTypes(),
  rooms: getRooms(),
  guests: getGuests(),
  checkin: getRandomTime(),
  checkout: getRandomTime(),
  features: getFeatures(),
  description: 'description',
  photos: getPhotos()
});

const getSimilarAdd = () => {
  const add = {
    author: getAuthor(),
    offer: getOffer(),
    location: getLocation()
  };
  add.offer.address = `${add.location.lat}, ${add.location.lng}`;
  return add;
};

const similarAdds = Array.from({length: SIMILAR_ADDS_COUNT}, getSimilarAdd);
console.log(similarAdds);
similarAdds.sort();
