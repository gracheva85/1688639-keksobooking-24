import {completeAdvertisement} from './card.js';
import {changeFromStateEnabled, adFormChildrens} from './form.js';

const MAP_SIZE = 13;
const SRC_MAIN_PIN = 'img/main-pin.svg';
const SRC_PIN = 'img/pin.svg';

const TOKYO = {
  lat: 35.68172,
  lng: 139.75392,
};

const adressInput = document.querySelector('#address');

const map = L.map('map-canvas');

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: SRC_MAIN_PIN,
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: TOKYO.lat,
    lng: TOKYO.lng,
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

const markerGroup = L.layerGroup().addTo(map);

const renderMarkers = (advertisements) => {
  markerGroup.clearLayers();
  advertisements
    .forEach((advertisement) => {
      const {lat, lng} = advertisement.location;
      const icon = L.icon({
        iconUrl: SRC_PIN,
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

const resetMapAndMarker = () => {
  mainPinMarker.setLatLng({
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  });
  map.setView({
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  }, MAP_SIZE,
  );
  map.closePopup();
};

const onMapLoad = (cb) => {
  map
    .on('load', () => {
      changeFromStateEnabled(false, adFormChildrens);
      cb;
    })
    .setView({
      lat: TOKYO.lat,
      lng: TOKYO.lng,
    }, MAP_SIZE,
    );

};

export {resetMapAndMarker, renderMarkers, onMapLoad};
