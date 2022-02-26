const SIMILAR_ADDS_COUNT = 10;
const hours = ['12:00', '13:00', '14:00'];
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

const getArrayRandomElement = (arr) => arr[getRandomPositiveInteger(0, arr.length - 1)];

const getArrayRandomNumberElements = (arr) => {
  const shuffledArray = arr.sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, getRandomPositiveInteger(0, arr.length - 1));
};

const similarAdds = Array.from({length: SIMILAR_ADDS_COUNT}, (value, index) => {
  const userId = `0${index + 1}`.slice(-2);
  const lat = getRandomPositiveFloat(35.65, 35.7, 5);
  const lng = getRandomPositiveFloat(139.7, 139.8, 5);

  return {
    author: {avatar: `img/avatars/user${userId}.png`},
    offer: {
      title: `title${userId}`,
      address: `${lat}, ${lng}`,
      price: getRandomPositiveInteger(100, 1000),
      type: getArrayRandomElement(realtyTypes),
      rooms: getRandomPositiveInteger(1, 10),
      guests: getRandomPositiveInteger(1, 20),
      checkin: getArrayRandomElement(hours),
      checkout: getArrayRandomElement(hours),
      features: getArrayRandomNumberElements(features),
      description: `description${userId}`,
      photos: getArrayRandomNumberElements(photos)
    },
    location: {lat, lng}
  };
});
similarAdds.sort();
