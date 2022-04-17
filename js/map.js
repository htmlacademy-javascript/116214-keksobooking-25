import { generateCard } from './generate-cards.js';
import { setAddressFieldValue } from './add-form.js';
import { filter } from './filter-form.js';
import { displayData, handleLoadDataError, handleLoadDataSuccess } from './announcements.js';
import { activateForm } from './forms-activity-handler.js';
import { addForm } from './add-form.js';
import { getData } from './api.js';

const MAP_DEFAULT_ZOOM = 13;

const MAP_CENTER_COORDINATES = {
  lat: 35.67920498464551,
  lng: 139.77100169861524
};

const interactiveMap = L.map('map-canvas')
  .setView(MAP_CENTER_COORDINATES, MAP_DEFAULT_ZOOM);

const tileLayer = L.tileLayer(
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
  MAP_CENTER_COORDINATES,
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
  mainMarker.setLatLng(MAP_CENTER_COORDINATES);
  interactiveMap.setView(MAP_CENTER_COORDINATES, MAP_DEFAULT_ZOOM);
  filter.apply = false;
  displayData();
};

mainMarker.on('moveend', (evt) => {
  const markerCoordinates = evt.target.getLatLng();
  setAddressFieldValue(markerCoordinates);
});

tileLayer.once('load', () => {
  activateForm(addForm);
  getData(handleLoadDataSuccess, handleLoadDataError);

mainMarker.addTo(interactiveMap);

export { mainMarker, displayMarkers, resetMap };
