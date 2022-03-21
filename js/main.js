import './map.js';
import {map, mapCenterCoordinates, mainMarker, ordinaryPinIcon} from './map.js';
import {cards, announcements} from './generateCards.js';
import { activatePage, deactivatePage } from './page.js';
import './form.js';
import {setAddress} from './form.js';

deactivatePage();

map.whenReady(() => {
  activatePage();
  setAddress(mapCenterCoordinates);
});

mainMarker.on('moveend', (evt) => {
  const markerCoordinates = evt.target.getLatLng();
  setAddress(markerCoordinates);
});

const mapCanvas = document.querySelector('#map-canvas');

announcements.forEach((announcement) => {
  const marker = L.marker(
    {
      lat: announcement.location.lat,
      lng: announcement.location.lng
    },
    {
      icon: ordinaryPinIcon
    }
  );

  marker.addTo(map);
});

