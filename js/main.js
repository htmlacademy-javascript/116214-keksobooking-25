import './map.js';
import {interactiveMap} from './map.js';
import './form.js';
import { activateForm, deactivateForm, adForm, mapFiltersForm } from './form.js';
import { getData } from './api.js';
import { onDataLoadFail, onDataLoadSuccess } from './page.js';

deactivateForm(adForm);
deactivateForm(mapFiltersForm);

interactiveMap.whenReady(() => {
  activateForm(adForm);
  getData(onDataLoadSuccess, onDataLoadFail);
});
