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

const generateId = (max) => {
  let current = 0;
  return () => {
    current = current + 1;
    if (current <= max) {
      return `0${current}`.slice(-2);
    }
    return NaN;
  };
};

const addContent = {
  text(element, content) {
    element.textContent = content;
  },
  html(element, content) {
    element.innerHTML = content;
  },
  node(element, content) {
    element.replaceChildren(content);
  }
};

const populateElement = (element, content, mode) => {
  if (! content) {
    element.classList.add('hidden');
    return;
  }

  addContent[mode](element, content);
};

const conformLIstToData = (list, data, classPrefix = '') => {
  list.forEach((item) => {
    const isRequired = data.some((value) => item.classList.contains(`${classPrefix}${value}`));
    if (! isRequired) {
      item.remove();
    }
  });
};

const generatListItemsByTemplate = (template, data, dataName) => {
  if (! data.length) {
    return null;
  }

  const fragment = document.createDocumentFragment();
  data.forEach((value) => {
    const item = template.cloneNode(true);
    item[dataName] = value;
    fragment.appendChild(item);
  });
  return fragment;
};

const formatPrice = (price) => price ? `${price} <span>₽/ночь</span>` : null;
const formatCapacity = (rooms, guests) => rooms && guests ? `${rooms} комнаты для ${guests} гостей` : null;
const formatTime = (checkin, checkout) => checkin && checkout ? `Заезд после ${checkin}, выезд до ${checkout}` : null;

export {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getArrayRandomElement,
  getArrayRandomNumberElements,
  generateId,
  populateElement,
  formatPrice,
  formatCapacity,
  formatTime,
  conformLIstToData,
  generatListItemsByTemplate,
};
