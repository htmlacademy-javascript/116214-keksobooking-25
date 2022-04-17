import { activateForm } from './forms-activity-handler.js';
import { filterForm, filter } from './filter-form.js';
import { filterAnnouncements } from './announcements-filter.js';
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

const onDataLoadSuccess = (data) => {
  announcmentsData = data;

  if (displayData()) {
    activateForm(filterForm);
  }
};

export { onDataLoadFail, onDataLoadSuccess, displayData };
