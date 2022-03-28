import {
  populateElement,
  formatPrice,
  formatCapacity,
  formatTime,
  conformLIstToData,
  generatListItemsByTemplate
} from './util.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const RealtyTypesDictionary = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const generateCard = (author, offer) => {
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = offer;
  const card = cardTemplate.cloneNode(true);

  const titleItem = card.querySelector('.popup__title');
  populateElement(titleItem, title, 'text');

  const addressItem = card.querySelector('.popup__text--address');
  populateElement(addressItem, address, 'text');

  const priceItem = card.querySelector('.popup__text--price');
  populateElement(priceItem, formatPrice(price), 'html');

  const realtyTypeItem = card.querySelector('.popup__type');
  populateElement(realtyTypeItem, RealtyTypesDictionary[type], 'text');

  const capacityItem = card.querySelector('.popup__text--capacity');
  populateElement(capacityItem, formatCapacity(rooms, guests), 'text');

  const timeItem = card.querySelector('.popup__text--time');
  populateElement(timeItem, formatTime(checkin, checkout), 'text');

  const featureContainer = card.querySelector('.popup__features');
  const featureList = featureContainer.querySelectorAll('.popup__feature');
  if (features && features.length) {
    conformLIstToData(featureList, features, 'popup__feature--');
  } else {
    featureContainer.classList.add('hidden');
  }

  const descriptionItem = card.querySelector('.popup__description');
  populateElement(descriptionItem, description, 'text');

  const photoItemsContainer = card.querySelector('.popup__photos');
  const photoTemplate = photoItemsContainer.querySelector('.popup__photo');
  const photoItemsList= generatListItemsByTemplate(photoTemplate, photos, 'src');
  populateElement(photoItemsContainer, photoItemsList, 'node');

  const avatarItem = card.querySelector('.popup__avatar');
  if (author.avatar) {
    avatarItem.src = author.avatar;
  } else {
    avatarItem.classList.add('hidden');
  }

  return card;
};

export { generateCard };

