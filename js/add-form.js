import { sendData } from './api.js';
import { resetMap } from './map.js';
import { getMessage } from './message.js';
import { setOnChangePhotoInput, resetPreviews } from './photos-previewer.js';
import { priceSlider, updateSliderMinPrice, PRICE_SLIDER_START_VALUE } from './price-slider.js';
import { filterForm } from './filter-form.js';
import { addFormValidator, renewAddFormValidator } from './add-form-validator.js';
import { deactivateForm } from './forms-activity-handler.js';

const MIN_PRICE_PER_NIGHT = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const addForm = document.querySelector('.ad-form');
const type = addForm.querySelector('#type');
const price = addForm.querySelector('#price');
const timein = addForm.querySelector('#timein');
const timeout = addForm.querySelector('#timeout');
const address = addForm.querySelector('#address');
const resetButton = addForm.querySelector('.ad-form__reset');
const submitButton = addForm.querySelector('[type=submit]');
const avatarChooser = addForm.querySelector('.ad-form__field input');
const avatarPreview = addForm.querySelector('.ad-form-header__preview');
const housingChooser = addForm.querySelector('.ad-form__upload input');
const housingPreview = addForm.querySelector('.ad-form__photo');

const setAddressFieldValue = (coordinates) => {
  address.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
};

const getMinPrice = (housingType) =>  MIN_PRICE_PER_NIGHT[housingType];

const setMinPricePerNight = (housingType) => {
  const minPrice = getMinPrice(housingType);
  price.setAttribute('min', minPrice);
  price.setAttribute('data-pristine-min-message', `Минимальное значение ${minPrice}`);
  price.setAttribute('placeholder', minPrice);
};

const resetApp = () => {
  addForm.reset();
  resetPreviews();
  priceSlider.noUiSlider.set(PRICE_SLIDER_START_VALUE);
  filterForm.reset();
  resetMap();
};

const showMessage = (messageType) => {
  const message = getMessage(messageType);
  document.body.insertAdjacentElement('beforeend', message);
};

const onSuccessAddForm = () => {
  resetApp();
  showMessage('success');
};

const onErrorAddForm = () => {
  submitButton.disabled = false;
  showMessage('error');
};

type.addEventListener('change', (evt) => {
  const housingType = evt.target.value;
  setMinPricePerNight(housingType);
  renewAddFormValidator();
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

resetButton.addEventListener('click', resetApp);

addForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = addFormValidator.validate();

  if (isValid) {
    const formData = new FormData(addForm);
    submitButton.disbled = true;

    sendData(
      formData,
      onSuccessAddForm,
      onErrorAddForm
    );
  }
});

setOnChangePhotoInput(avatarChooser, avatarPreview);
setOnChangePhotoInput(housingChooser, housingPreview);

deactivateForm(addForm);

export {
  addForm,
  price,
  housingPreview,
  setAddressFieldValue,
  setMinPricePerNight
};
