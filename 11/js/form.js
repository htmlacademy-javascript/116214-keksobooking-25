import { sendData } from './api.js';
import { SEND_DATA_URL } from './config.js';
import { resetMap } from './map.js';
import { displaySuccessMessage } from './success-message.js';
import { displayErrorMessage } from './error-message.js';

// Data
const formClassNames = ['ad-form', 'map__filters'];

const adForm = document.querySelector('.ad-form');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const priceSlider = adForm.querySelector('.ad-form__slider');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const timein = adForm.querySelector('#timein');
const timeout = adForm.querySelector('#timeout');
const address = adForm.querySelector('#address');
const adFormReset = adForm.querySelector('.ad-form__reset');

const mapFiltersForm = document.querySelector('.map__filters');

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

const disableForm = (className, status) => {
  const form = document.querySelector(`.${className}`);

  Array.from(form.elements).forEach((item) => {
    item.disabled = !status;
  });
  Array.from(form.querySelector('fieldset')).forEach((item) => {
    item.disabled = !status;
  });

  form.classList[status ? 'remove' : 'add'](`${className}--disabled`);
};

// Interface
const activateForm = (className) => disableForm(className, true);
const deactivateForm = (className) => disableForm(className, false);

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
  step: 1000,
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
const pristineConfig = {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
};

Pristine.addValidator(
  'title-range',
  (value, minlength, maxlength) => parseInt(minlength, 10) <= value.length && value.length <= parseInt(maxlength, 10),
  // Here Pristine requires ordinary quotes for strin
  // eslint-disable-next-line
  'От ${1} до ${2} символов',
  1,
  false
);

let adFormPristine = new Pristine(adForm, pristineConfig, true);

adFormPristine.addValidator(
  capacity,
  (value) => capacityPerRoomNumber[roomNumber.value].includes(parseInt(value, 10)),
  getCapacityErrorMessage,
  1,
  false
);

// Event listeners
type.addEventListener('change', (evt) => {
  const housingType = evt.target.value;
  setMinPricePerNight(housingType);
  adFormPristine = new Pristine(adForm, pristineConfig, true);
  updateSliderMinPrice(getMinPrice(housingType));
});

timein.addEventListener('change', () => {
  timeout.value = timein.value;
});

timeout.addEventListener('change', () => {
  timein.value = timeout.value;
});

price.addEventListener('input', (evt) => {
  priceSlider.noUiSlider.set(evt.target.value);
});

const resetApp = () => {
  adForm.reset();
  priceSlider.noUiSlider.set(5000);
  mapFiltersForm.reset();
  resetMap();
};

adFormReset.addEventListener('click', resetApp);

const onSuccessAdForm = () => {
  resetApp();
  displaySuccessMessage();
};

const onErrorAdForm = () => {
  displayErrorMessage();
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = adFormPristine.validate();

  if (isValid) {
    const formData = new FormData(adForm);
    sendData(
      SEND_DATA_URL,
      formData,
      onSuccessAdForm,
      onErrorAdForm
    );
  }
});

export {formClassNames, activateForm, deactivateForm, setAddressFieldValue};
