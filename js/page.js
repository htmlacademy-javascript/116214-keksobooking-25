import {formClassNames, activateForm, deactivateForm} from './form.js';

const activatePage = () => {
  formClassNames.forEach((className) => activateForm(className));
};

const deactivatePage = () => {
  formClassNames.forEach((className) => deactivateForm(className));
};

const showDataNotLoadedError = (errorMessage) => {
  const mapElement = document.querySelector('.map');
  const errorElement = document.createElement('div');
  errorElement.classList.add('map__error');
  errorElement.textContent = errorMessage;
  mapElement.appendChild(errorElement);
};

export {activatePage, deactivatePage, showDataNotLoadedError};
