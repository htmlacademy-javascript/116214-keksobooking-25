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
  if (!data || !data.length) {
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

const isEscape = (code) => code === 'Escape';

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  populateElement,
  formatPrice,
  formatCapacity,
  formatTime,
  conformLIstToData,
  generatListItemsByTemplate,
  isEscape,
  debounce
};
