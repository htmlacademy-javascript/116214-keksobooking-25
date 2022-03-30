import { GET_ANNOUNCEMENTS_URL } from './config.js';
import { activatePage, deactivatePage, showDataNotLoadedError } from './page.js';
import './map.js';
import {interactiveMap, createMarkers} from './map.js';
import './form.js';
import { getData } from './api.js';

deactivatePage();

interactiveMap.whenReady(() => {
  activatePage();
  getData(GET_ANNOUNCEMENTS_URL, createMarkers, showDataNotLoadedError);
});
