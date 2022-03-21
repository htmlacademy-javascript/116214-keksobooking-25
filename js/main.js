import './map.js';
import {map, mapCenterCoordinates, mainMarker, ordinaryPinIcon} from './map.js';
import {announcements, generateCard} from './generateCards.js';
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

announcements.forEach(({author, offer, location}) => {
  const marker = L.marker(
    {
      lat: location.lat,
      lng: location.lng
    },
    {
      icon: ordinaryPinIcon
    }
  );

  marker
    .addTo(map)
    .bindPopup(generateCard(author, offer));
});

