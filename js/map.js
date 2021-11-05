import {completeAdvertisement} from './card.js';
import {getAllFilterInput, compareAdvertisement} from './filter.js';

const adressInput = document.querySelector('#address');
const SIMILAR_ADVERTISEMENT_COUNT = 10;

const map = L.map('map-canvas')
  .setView({
    lat: 35.68172,
    lng: 139.75392,
  }, 13);

const markerGroup = L.layerGroup().addTo(map);

const renderMarkers = (advertisements) => {
  markerGroup.clearLayers();
  advertisements
    .filter(getAllFilterInput)
    .sort(compareAdvertisement)
    .slice(0, SIMILAR_ADVERTISEMENT_COUNT)
    .forEach((advertisement) => {
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
        .addTo(markerGroup)
        .bindPopup(completeAdvertisement(advertisement));
    });

};

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

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const resetMapAndMarker = () => {
  mainPinMarker.setLatLng({
    lat: 35.68172,
    lng: 139.75392,
  });
  map.setView({
    lat: 35.68172,
    lng: 139.75392,
  }, 13);
  map.closePopup();
};

export {resetMapAndMarker, renderMarkers, map};
