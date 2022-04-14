import { filter, activateForm, mapFiltersForm } from './form.js';
import { sortAnnouncements, getAnnouncementRank } from './filter.js';
import { displayMarkers } from './map.js';
import { SIMILAR_ANNOUNCEMENTS_COUNT } from './map.js';

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

const onDataLoadedSuccess = (announcements) => {
  const sortedAnnouncements = filter.apply ?
    sortAnnouncements(announcements) :
    announcements;

  const limitedAnnouncements = sortedAnnouncements
    .slice(0, SIMILAR_ANNOUNCEMENTS_COUNT)
    .filter(({offer}) => getAnnouncementRank(offer) === filter.rank);

  displayMarkers(limitedAnnouncements);
  activateForm(mapFiltersForm);
};

export { onDataLoadFail, onDataLoadedSuccess };
