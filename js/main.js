import './map.js';
import {interactiveMap} from './map.js';
import './add-form.js';
import { addForm } from './add-form.js';
import { filterForm } from './filter-form.js';
import { activateForm, deactivateForm } from './forms-activity-handler.js';
import { getData } from './api.js';
import { onDataLoadFail, onDataLoadSuccess } from './announcements.js';

deactivateForm(addForm);
deactivateForm(filterForm);

interactiveMap.whenReady(() => {
  activateForm(addForm);
  getData(onDataLoadSuccess, onDataLoadFail);
});
