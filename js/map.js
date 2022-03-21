const mapCenter = {
  lat: 35.693,
  lng: 139.746
};

const map = L.map('map-canvas')
  .setView(mapCenter, 10);

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
  mapCenter,
  {
    icon: mainPinIcon
  }
);

marker.addTo(map);

export {map};
