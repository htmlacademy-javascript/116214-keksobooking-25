// Data
const formClassNames = ['ad-form', 'map__filters'];

const adForm = document.querySelector('.ad-form');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

const minPricesPerNightByType = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const capacityPerRoomNumber = {
  '1': [1],
  '2': [1, 2],
  '3': [1, 2, 3],
  '100': [0]
};

// Utils
const setMinPricePerNight = () => {
  const minPrice = minPricesPerNightByType[type.value];
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

// Interface
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

const activateForm = (className) => disableForm(className, true);
const deactivateForm = (className) => disableForm(className, false);

// Pristine
const pristineConfig = {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'error-text'
};

Pristine.addValidator(
  'title-range',
  (value, minlength, maxlength) => parseInt(minlength, 10) <= value && value <= parseInt(maxlength, 10),
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
type.addEventListener('change', () => {
  setMinPricePerNight();
  adFormPristine = new Pristine(adForm, pristineConfig, true);
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = adFormPristine.validate();

  if (isValid) {
    console.log('is valid');
  } else {
    console.log('is not valid');
  }
});


export {formClassNames, activateForm, deactivateForm};
