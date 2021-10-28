import {changeFromStateEnabled, adFormChildrens, filterChildrens} from './form.js';
import {completeAdvertisement} from './card.js';
import {getData} from './api.js';

const adressInput = document.querySelector('#address');

changeFromStateEnabled(true, adFormChildrens);
changeFromStateEnabled(true, filterChildrens);

const map = L.map('map-canvas')
  .setView({
    lat: 35.68172,
    lng: 139.75392,
  }, 14);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const renderMarkers = (advertisements) => {
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
};

const activateAfterMapLoad = () => {
  changeFromStateEnabled(false, adFormChildrens);
  changeFromStateEnabled(false, filterChildrens);
  getData((data) => {
    renderMarkers(data);
  //Фильтры
  });
};

map.on('load', activateAfterMapLoad());

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

const resetMapAndMarker = () => {
  mainPinMarker.setLatLng({
    lat: 35.68172,
    lng: 139.75392,
  });
  map.setView({
    lat: 35.68172,
    lng: 139.75392,
  }, 14);
  map.closePopup();
};

export {resetMapAndMarker};
