import { GET_ANNOUNCEMENTS_URL } from './config.js';
import './map.js';
import {interactiveMap, mapCenterCoordinates, mainMarker, createMarkers} from './map.js';
import { activatePage, deactivatePage } from './page.js';
import './form.js';
import {setAddress} from './form.js';
import { getData } from './api.js';

deactivatePage();

interactiveMap.whenReady(() => {
  activatePage();
  setAddress(mapCenterCoordinates);
  getData(GET_ANNOUNCEMENTS_URL, createMarkers, console.log);
});

mainMarker.on('moveend', (evt) => {
  const markerCoordinates = evt.target.getLatLng();
  setAddress(markerCoordinates);
});
