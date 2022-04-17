import { generateCard } from './generate-cards.js';
import { setAddressFieldValue } from './add-form.js';
import { filter } from './filter-form.js';
import { displayData } from './announcements.js';

const SIMILAR_ANNOUNCEMENTS_COUNT = 10;
const MAP_DEFAULT_ZOOM = 13;

const mapCenterCoordinates = {
  lat: 35.67920498464551,
  lng: 139.77100169861524
};

const interactiveMap = L.map('map-canvas')
  .setView(mapCenterCoordinates, MAP_DEFAULT_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(interactiveMap);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  inconAnchor: [26, 52]
});

const mainMarker = L.marker(
  mapCenterCoordinates,
  {
    icon: mainPinIcon,
    draggable: true
  }
);

const ordinaryPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  inconAnchor: [20, 40]
});

const markerGroup = L.layerGroup().addTo(interactiveMap);

const createMarker = ({author, offer, location}) => {
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
    .addTo(markerGroup)
    .bindPopup(generateCard(author, offer));
};

const createMarkers = ((announcments) => {
  announcments.forEach((announcement) => {
    createMarker(announcement);
  });
});

const displayMarkers = (announcments) => {
  markerGroup.clearLayers();
  createMarkers(announcments);
};

const resetMap = () => {
  markerGroup.clearLayers();
  mainMarker.setLatLng(mapCenterCoordinates);
  interactiveMap.setView(mapCenterCoordinates, MAP_DEFAULT_ZOOM);
  filter.apply = false;
  displayData();
};

mainMarker.addTo(interactiveMap);

mainMarker.on('moveend', (evt) => {
  const markerCoordinates = evt.target.getLatLng();
  setAddressFieldValue(markerCoordinates);
});

export {
  interactiveMap,
  mainMarker,
  displayMarkers,
  resetMap,
  SIMILAR_ANNOUNCEMENTS_COUNT
};
