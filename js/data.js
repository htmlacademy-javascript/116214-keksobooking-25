import {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getArrayRandomElement,
  getArrayRandomNumberElements,
  generateId
} from './util.js';

const SIMILAR_ADDS_COUNT = 10;
const hours = ['12:00', '13:00', '14:00'];
const realtyTypes = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator'];
const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const generateUserId = generateId(SIMILAR_ADDS_COUNT);

const generateMockData = () => Array.from({length: SIMILAR_ADDS_COUNT}, () => {
  const userId = generateUserId();
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

export {generateMockData};
