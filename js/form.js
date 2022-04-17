import { sendData } from './api.js';
import { resetMap } from './map.js';
import { getMessage } from './message.js';
import { displayData } from './page.js';
import { debounce } from './util.js';
import { setOnChangePhotoInput } from './photo.js';

// Data
const adForm = document.querySelector('.ad-form');
const title = adForm.querySelector('#title');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const priceSlider = adForm.querySelector('.ad-form__slider');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const timein = adForm.querySelector('#timein');
const timeout = adForm.querySelector('#timeout');
const address = adForm.querySelector('#address');
const adFormReset = adForm.querySelector('.ad-form__reset');
const adFormSubmit = adForm.querySelector('[type=submit]');

const avatarChooser = adForm.querySelector('.ad-form__field input');
const avatarPreview = adForm.querySelector('.ad-form-header__preview');
const avatar = adForm.querySelector('.ad-form-header__preview img');
const avatarDefaultSrc = avatar.src;

const housingChooser = adForm.querySelector('.ad-form__upload input');
const housingPreview = adForm.querySelector('.ad-form__photo');

setOnChangePhotoInput(avatarChooser, avatarPreview);
setOnChangePhotoInput(housingChooser, housingPreview);

const mapFiltersForm = document.querySelector('.map__filters');

let filter = {
  apply: false,
  rank: 0,
  type: 'any',
  price: 'any',
  rooms: 'any',
  guests: 'any',
  features: []
};

const setFilter = (evt) => {
  let rank = 0;

  const filterName = evt.target.name.split('-')[1];
  const filterValue = evt.target.value;

  if (filterName in filter) {
    filter = Object.assign(filter, {[filterName]: filterValue});
  } else {
    if (evt.target.checked) {
      filter.features.push(filterValue);
    } else {
      filter.features.splice(filter.features.indexOf(filterValue), 1);
    }
  }

  if (filter.type !== 'any') {
    rank += 1;
  }
  if (filter.price !== 'any') {
    rank += 1;
  }
  if (filter.rooms !== 'any') {
    rank += 1;
  }
  if (filter.guests !== 'any') {
    rank += 1;
  }
  if (filter.features.includes('wifi')) {
    rank += 1;
  }
  if (filter.features.includes('dishwasher')) {
    rank += 1;
  }
  if (filter.features.includes('parking')) {
    rank += 1;
  }
  if (filter.features.includes('washer')) {
    rank += 1;
  }
  if (filter.features.includes('elevator')) {
    rank += 1;
  }
  if (filter.features.includes('conditioner')) {
    rank += 1;
  }
  filter.rank = rank;
  filter.apply = filter.rank > 0;
};

const RERENDER_DELAY = 500;
const debounceHandler = debounce(
  () => displayData(),
  RERENDER_DELAY
);

const onFilterChange = (evt) => {
  setFilter(evt);
  debounceHandler();
};

mapFiltersForm.addEventListener('change', (evt) => {
  onFilterChange(evt);
});


const capacityPerRoomNumber = {
  '1': [1],
  '2': [1, 2],
  '3': [1, 2, 3],
  '100': [0]
};

// Utils
const getMinPrice = (housingType) => {
  const minPricesPerNightByType = {
    bungalow: 0,
    flat: 1000,
    hotel: 3000,
    house: 5000,
    palace: 10000
  };
  return minPricesPerNightByType[housingType];
};

const setMinPricePerNight = (housingType) => {
  const minPrice = getMinPrice(housingType);
  price.setAttribute('min', minPrice);
  price.setAttribute('data-pristine-min-message', `Минимальное значение ${minPrice}`);
  price.setAttribute('placeholder', minPrice);
};

const getCapacityErrorMessage = () => {
  const possibleGuestCounts = capacityPerRoomNumber[roomNumber.value];
  const maxGuestCount = possibleGuestCounts[possibleGuestCounts.length - 1];
  return (
    roomNumber.value === '100' ?
      'Не для гостей' :
      `Не более ${maxGuestCount} ${maxGuestCount === 1 ? 'гостья' : 'гостей'}`
  );
};

const disableElements = (elements, status) => {
  const elems = Array.from(elements);
  for (let i=0; i<elems.length; i++) {
    const item = elems[i];
    const tagName = item.tagName;
    if (tagName === 'FIELDSET' || ! item.closest('fieldset')) {
      item.disabled = status;
    }
  }
};

const disableFormElement = (form, status) => {
  form.classList[status ? 'add' : 'remove'](`${form.classList[0]}--disabled`);
};

const disableSlider = (form, slider, status) => {
  if (form.contains(slider)) {
    if (status) {
      slider.setAttribute('disabled', status);
    } else {
      slider.removeAttribute('disabled');
    }
  }
};

const disableForm = (form, status) => {
  disableElements(form.elements, status);
  disableFormElement(form, status);
  disableSlider(form, priceSlider, status);
};

// Interface
const activateForm = (form) => disableForm(form, false);
const deactivateForm = (form) => disableForm(form, true);

const setAddressFieldValue = (coordinates) => {
  address.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
};

// Nouislider
noUiSlider.create(priceSlider, {
  range: {
    min: 1000,
    max: 100000
  },
  start: 5000,
  connect: 'lower',
  format: {
    to: function(value) {
      return value.toFixed();
    },
    from: function(value) {
      return parseInt(value, 10).toFixed();
    }
  }
});

const updateSliderMinPrice = (minPrice) => {
  priceSlider.noUiSlider.updateOptions({
    range: {
      min: minPrice,
      max: 100000
    },
  });
};

priceSlider.noUiSlider.on('update', () => {
  price.value = priceSlider.noUiSlider.get();
});

// Pristine
const PristineConfig = {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
};

let adFormPristine = new Pristine(adForm, PristineConfig, true);

adFormPristine.addValidator(
  capacity,
  (value) => capacityPerRoomNumber[roomNumber.value].includes(parseInt(value, 10)),
  getCapacityErrorMessage,
  1,
  false
);

adFormPristine.addValidator(
  title,
  (value) => value.length >= 30 && value.length <= 100,
  'От 30 до 100 символов',
  1,
  false
);

// Event listeners
type.addEventListener('change', (evt) => {
  const housingType = evt.target.value;
  setMinPricePerNight(housingType);
  adFormPristine = new Pristine(adForm, PristineConfig, true);
  updateSliderMinPrice(getMinPrice(housingType));
});

timein.addEventListener('change', () => {
  timeout.value = timein.value;
});

timeout.addEventListener('change', () => {
  timein.value = timeout.value;
});

price.addEventListener('change', (evt) => {
  priceSlider.noUiSlider.set(evt.target.value);
});

const resetPreviews = () => {
  avatar.src = avatarDefaultSrc;
  const housingPreviewImage = housingPreview.querySelector('img');
  if (housingPreviewImage) {
    housingPreview.removeChild(housingPreviewImage);
  }
};

const resetApp = () => {
  adForm.reset();
  resetPreviews();
  priceSlider.noUiSlider.set(5000);
  mapFiltersForm.reset();
  resetMap();
};

adFormReset.addEventListener('click', resetApp);

const showMessage = (messageType) => {
  const message = getMessage(messageType);
  document.body.insertAdjacentElement('beforeend', message);
};

const onSuccessAdForm = () => {
  resetApp();
  showMessage('success');
};

const onErrorAdForm = () => {
  adFormSubmit.disabled = false;
  showMessage('error');
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = adFormPristine.validate();

  if (isValid) {
    const formData = new FormData(adForm);
    adFormSubmit.disbled = true;

    sendData(
      formData,
      onSuccessAdForm,
      onErrorAdForm
    );
  }
});

export {
  adForm,
  mapFiltersForm,
  activateForm,
  deactivateForm,
  setAddressFieldValue,
  filter
};
