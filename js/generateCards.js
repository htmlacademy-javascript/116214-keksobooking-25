import {generateMockData} from './data.js';
import { populateElement } from './util.js';

const announcements = generateMockData();
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const RealtyTypesDictionary = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const cards = announcements.map(({author, offer}) => {
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = offer;
  const card = cardTemplate.cloneNode(true);

  const titleItem = card.querySelector('.popup__title');
  populateElement(titleItem, title, 'text');

  const addressItem = card.querySelector('.popup__text--address');
  populateElement(addressItem, address, 'text');

  const priceItem = card.querySelector('.popup__text--price');
  const priceContent = `${price} <span>₽/ночь</span>`;
  populateElement(priceItem, priceContent, 'html');

  const realtyTypeItem = card.querySelector('.popup__type');
  populateElement(realtyTypeItem, RealtyTypesDictionary[type], 'text');

  const capacityItem = card.querySelector('.popup__text--capacity');
  const capacityContent = `${rooms} комнаты для ${guests} гостей`;
  populateElement(capacityItem, capacityContent, 'text');

  const timeItem = card.querySelector('.popup__text--time');
  const timeContent = checkin && checkout ?
    `Заезд после ${checkin}, выезд до ${checkout}` :
    '';
  populateElement(timeItem, timeContent, 'text');

  const featureContainer = card.querySelector('.popup__features');
  const featureList = featureContainer.querySelectorAll('.popup__feature');

  if (features.length) {
    featureList.forEach((featureListItem) => {
      const isRequired = features.some((feature) => featureListItem.classList.contains(`popup__feature--${feature}`));
      if (! isRequired) {
        featureListItem.remove();
      }
    });
  } else {
    featureContainer.classList.add('hidden');
  }

  const descriptionItem = card.querySelector('.popup__description');
  populateElement(descriptionItem, description, 'text');

  const photosList = card.querySelector('.popup__photos');
  const photoTemplate = photosList.querySelector('.popup__photo');

  if (photos) {
    const photosContainer = document.createDocumentFragment();
    photos.forEach((photo) => {
      const photoItem = photoTemplate.cloneNode(true);
      photoItem.src = photo;
      photosContainer.appendChild(photoItem);
    });
    photosList.innerHTML = '';
    photosList.appendChild(photosContainer);
  } else {
    photosList.classList.add('hidden');
  }

  const avatarItem = card.querySelector('.popup__avatar');
  if (author.avatar) {
    avatarItem.src = author.avatar;
  }

  return card;
});

export { cards };

