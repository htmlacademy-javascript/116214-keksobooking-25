import './map.js';
import {interactiveMap} from './map.js';
import './add-form.js';
import { activateForm, deactivateForm, adForm } from './add-form.js';
import { mapFiltersForm } from './filter-form.js';
import { getData } from './api.js';
import { onDataLoadFail, onDataLoadSuccess } from './announcements.js';

deactivateForm(adForm);
deactivateForm(mapFiltersForm);

interactiveMap.whenReady(() => {
  activateForm(adForm);
  getData(onDataLoadSuccess, onDataLoadFail);
});
