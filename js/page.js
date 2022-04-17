import { filter, activateForm, mapFiltersForm } from './form.js';
import { filterAnnouncements } from './filter.js';
import { displayMarkers, SIMILAR_ANNOUNCEMENTS_COUNT } from './map.js';

let announcmentsData = [];

const showDataNotLoadedError = (errorMessage) => {
  const mapElement = document.querySelector('.map');
  const errorElement = document.createElement('div');
  errorElement.classList.add('map__error');
  errorElement.textContent = errorMessage;
  mapElement.appendChild(errorElement);
};

const onDataLoadFail = (errorMessage) => {
  showDataNotLoadedError(errorMessage);
};

const filterData = (data) =>  filter.apply ? filterAnnouncements(data) : data;
const limitData = (data) => data.slice(0, SIMILAR_ANNOUNCEMENTS_COUNT);

const displayData = () => {
  let announcements = [...announcmentsData];

  if (! announcements) {
    showDataNotLoadedError('Данные отсутствуют. Попробуйте еще раз.');
    return false;
  }

  announcements = filterData(announcements);
  announcements = limitData(announcements);
  displayMarkers(announcements);

  return true;
};

const onDataLoadedSuccess = (data) => {
  announcmentsData = data;

  if (displayData()) {
    activateForm(mapFiltersForm);
  }
};

export { onDataLoadFail, onDataLoadedSuccess, displayData };
