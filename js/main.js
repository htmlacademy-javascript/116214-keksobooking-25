import { GET_ANNOUNCEMENTS_URL } from './config.js';
import { showDataNotLoadedError } from './page.js';
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
  showDataNotLoadedError();
};

interactiveMap.whenReady(() => {
  activateForm(adForm);
  getData(
    GET_ANNOUNCEMENTS_URL,
    onDataLoadedSuccess,
    onDataLoadFail
  );
});
