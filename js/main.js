import './map.js';
import {interactiveMap, displayMarkers} from './map.js';
import './form.js';
import { activateForm, deactivateForm, adForm, mapFiltersForm } from './form.js';
import { getData } from './api.js';

deactivateForm(adForm);
deactivateForm(mapFiltersForm);

const onDataLoadedSuccess = (announcements) => {
  displayMarkers(announcements);
  activateForm(mapFiltersForm);
};

const onDataLoadFail = () => {
  const mapElement = document.querySelector('.map');
  const errorElement = document.createElement('div');
  errorElement.classList.add('map__error');
  errorElement.textContent = 'Данные не были загружены. Попробуйте еще раз!';
  mapElement.appendChild(errorElement);
};

interactiveMap.whenReady(() => {
  activateForm(adForm);
  getData(onDataLoadedSuccess, onDataLoadFail);
});
