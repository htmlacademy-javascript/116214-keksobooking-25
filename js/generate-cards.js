import {
  populateElement,
  formatPrice,
  formatCapacity,
  formatTime,
  conformLIstToData,
  generatListItemsByTemplate
} from './util.js';

const REALTY_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const generateCard = (author, offer) => {
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = offer;
  const card = cardTemplate.cloneNode(true);

  const titleItem = card.querySelector('.popup__title');
  populateElement(titleItem, String(title), 'insertAsText');

  const addressItem = card.querySelector('.popup__text--address');
  populateElement(addressItem, String(address), 'insertAsText');

  const priceItem = card.querySelector('.popup__text--price');
  populateElement(priceItem, formatPrice(parseInt(price, 10)), 'insertAsHtml');

  const realtyTypeItem = card.querySelector('.popup__type');
  populateElement(realtyTypeItem, REALTY_TYPES[String(type)], 'insertAsText');

  const capacityItem = card.querySelector('.popup__text--capacity');
  populateElement(capacityItem, formatCapacity(parseInt(rooms, 10), parseInt(guests, 10)), 'insertAsText');

  const timeItem = card.querySelector('.popup__text--time');
  populateElement(timeItem, formatTime(String(checkin), String(checkout)), 'insertAsText');

  const featureContainer = card.querySelector('.popup__features');
  const featureList = featureContainer.querySelectorAll('.popup__feature');
  if (features && features.length) {
    conformLIstToData(featureList, features, 'popup__feature--');
  } else {
    featureContainer.classList.add('hidden');
  }

  const descriptionItem = card.querySelector('.popup__description');
  populateElement(descriptionItem, String(description), 'insertAsText');

  const photoItemsContainer = card.querySelector('.popup__photos');
  const photoTemplate = photoItemsContainer.querySelector('.popup__photo');
  const photoItemsList= generatListItemsByTemplate(photoTemplate, photos, 'src');
  populateElement(photoItemsContainer, photoItemsList, 'insertAsNode');

  const avatarItem = card.querySelector('.popup__avatar');
  if (author.avatar) {
    avatarItem.src = String(author.avatar);
  } else {
    avatarItem.classList.add('hidden');
  }

  return card;
};

export { generateCard };

