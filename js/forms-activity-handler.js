import { priceSlider, disableSlider } from './price-slider.js';

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

const disableForm = (form, status) => {
  disableElements(form.elements, status);
  disableFormElement(form, status);
  disableSlider(form, priceSlider, status);
};

const activateForm = (form) => disableForm(form, false);
const deactivateForm = (form) => disableForm(form, true);

export { activateForm, deactivateForm };
