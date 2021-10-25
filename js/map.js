
import {toggleFormClass} from './form.js';
import {createAdvertisements} from './data.js';
import {completeAdvertisement} from './card.js';

const adressInput = document.querySelector('#address');

toggleFormClass();

const map = L.map('map-canvas')
  .on('load', () => {
    toggleFormClass();
  })
  .setView({
    lat: 35.68172,
    lng: 139.75392,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.68172,
    lng: 139.75392,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const coordinates = Object.values(evt.target.getLatLng());
  adressInput.value = `${coordinates[0].toFixed(5)}, ${coordinates[1].toFixed(5)}`;
});

const advertisements = createAdvertisements();

advertisements.forEach((advertisement) => {
  const {lat, lng} = advertisement.location;
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(completeAdvertisement(advertisement));
});
