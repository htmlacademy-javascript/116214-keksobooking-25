import {generateMockData} from './data.js';

const announcements = generateMockData();
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const RealtyTypesDictionary = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const populateElement = (element, content, mode) => {
  if (! content.length) {
    element.classList.add('hidden');
    return;
  }

  if (mode === 'text') {
    element.textContent = content;
  }

  if (mode === 'html') {
    element.innerHTML = content;
  }
};

const cards = announcements.map(({author, offer}) => {
  const card = cardTemplate.cloneNode(true);

  const title = card.querySelector('.popup__title');
  populateElement(title, offer.title, 'text');

  const address = card.querySelector('.popup__text--address');
  populateElement(address, offer.address, 'text');

  const price = card.querySelector('.popup__text--price');
  const priceContent = `${offer.price} <span>₽/ночь</span>`;
  populateElement(price, priceContent, 'html');

  const realtyTypes = card.querySelector('.popup__type');
  const realtyTypesContent = `${RealtyTypesDictionary[offer.type]}`;
  populateElement(realtyTypes, realtyTypesContent, 'text');

  const capacity = card.querySelector('.popup__text--capacity');
  const capacityContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  populateElement(capacity, capacityContent, 'text');

  const time = card.querySelector('.popup__text--time');
  const timeContent = offer.checkin && offer.checkout ?
    `Заезд после ${offer.checkin}, выезд до ${offer.checkout}` :
    '';
  populateElement(time, timeContent, 'text');

  const featureContainer = card.querySelector('.popup__features');
  const featureList = featureContainer.querySelectorAll('.popup__feature');
  const features = offer.features;

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

  const description = card.querySelector('.popup__description');
  populateElement(description, offer.description, 'text');

  const photosList = card.querySelector('.popup__photos');
  const photoTemplate = photosList.querySelector('.popup__photo');
  const photosPaths = offer.photos;

  if (photosPaths.length) {
    const photosContainer = document.createDocumentFragment();
    photosPaths.forEach((path) => {
      const photo = photoTemplate.cloneNode(true);
      photo.src = path;
      photosContainer.appendChild(photo);
    });
    photosList.innerHTML = '';
    photosList.appendChild(photosContainer);
  } else {
    photosList.classList.add('hidden');
  }

  const avatar = card.querySelector('.popup__avatar');
  if (author.avatar) {
    avatar.src = author.avatar;
  }

  return card;
});

export { cards };

