const formClassNames = ['ad-form', 'map__filters'];

const minPricesPerNightByType = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const adForm = document.querySelector('.ad-form');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const timein = adForm.querySelector('#timein');
const timeout = adForm.querySelector('#timeout');

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

type.addEventListener('change', () => {
  price.setAttribute('min', minPricesPerNightByType[type.value]);
});

timein.addEventListener('change', () => {
  timeout.value = timein.value;
});

timeout.addEventListener('change', () => {
  timein.value = timeout.value;
});

export {formClassNames, activateForm, deactivateForm};
