import './map.js';
import {interactiveMap, mapCenterCoordinates, mainMarker, createOrdinaryMarker} from './map.js';
import {announcements} from './generateCards.js';
import { activatePage, deactivatePage } from './page.js';
import './form.js';
import {setAddress} from './form.js';

deactivatePage();

interactiveMap.whenReady(() => {
  activatePage();
  setAddress(mapCenterCoordinates);
});

mainMarker.on('moveend', (evt) => {
  const markerCoordinates = evt.target.getLatLng();
  setAddress(markerCoordinates);
});

announcements.forEach(({author, offer, location}) => {
  createOrdinaryMarker(author, offer, location);
});

