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

const cards = announcements.map(({author, offer}) => {
  const card = cardTemplate.cloneNode(true);

  const title = card.querySelector('.popup__title');
  if (offer.title) {
    title.textContent = offer.title;
  } else {
    title.classList.add('hidden');
  }

  const address = card.querySelector('.popup__text--address');
  if (offer.address) {
    address.textContent = offer.address;
  } else {
    address.classList.add('hidden');
  }

  const price = card.querySelector('.popup__text--price');
  if (offer.price) {
    price.innerHTML = `${offer.price} <span>₽/ночь</span>`;
  } else {
    price.classList.add('.hidden');
  }

  const realtyTypes = card.querySelector('.popup__type');
  if (offer.type) {
    realtyTypes.textContent = `${RealtyTypesDictionary[offer.type]}`;
  } else {
    realtyTypes.classList.add('hidden');
  }

  const capacity = card.querySelector('.popup__text--capacity');
  if (offer.rooms && offer.guests) {
    capacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  } else {
    capacity.classList.add('hidden');
  }

  const time = card.querySelector('.popup__text--time');
  if(offer.checkin && offer.checkout) {
    time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    time.classList.add('hidden');
  }

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
  if (offer.description) {
    description.textContent = offer.description;
  } else {
    description.classList.add('hidden');
  }

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

