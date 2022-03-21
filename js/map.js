const mapCenterCoordinates = {
  lat: 35.67920498464551,
  lng: 139.77100169861524
};

const map = L.map('map-canvas')
  .setView(mapCenterCoordinates, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  inconAnchor: [26, 52]
});

const marker = L.marker(
  mapCenterCoordinates,
  {
    icon: mainPinIcon,
    draggable: true
  }
);

marker.addTo(map);

export {map, mapCenterCoordinates, marker};
