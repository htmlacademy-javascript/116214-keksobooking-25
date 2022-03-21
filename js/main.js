import './map.js';
import {map, mapCenterCoordinates, marker} from './map.js';
import {cards} from './generateCards.js';
import { activatePage, deactivatePage } from './page.js';
import './form.js';
import {setAddress} from './form.js';

deactivatePage();

map.whenReady(() => {
  activatePage();
  setAddress(mapCenterCoordinates);
});

marker.on('moveend', (evt) => {
  const markerCoordinates = evt.target.getLatLng();
  setAddress(markerCoordinates);
});

const mapCanvas = document.querySelector('#map-canvas');

