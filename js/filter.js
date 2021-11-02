import {filterForm} from './form.js';

const DEFAULT_VALUE = 'any';

const PriceLevel = {
  LOW: {
    MAX: 10000,
  },
  MIDDLE: {
    MIN: 10000,
    MAX: 50000,
  },
  HIGH: {
    MIN: 50000,
  },
};

const filterType = (advertisement) => {
  const typeValue = filterForm.querySelector('select[name=housing-type]').value;
  return typeValue === advertisement.offer.type || typeValue === DEFAULT_VALUE;
};

const filterPrice = (advertisement) => {
  const priceValue = filterForm.querySelector('select[name=housing-price]').value;
  switch (priceValue) {
    case 'low': return advertisement.offer.price < PriceLevel.LOW.MAX;
    case 'middle': return advertisement.offer.price >= PriceLevel.MIDDLE.MIN && advertisement.offer.price < PriceLevel.MIDDLE.MAX;
    case 'high': return advertisement.offer.price >= PriceLevel.HIGH.MIN;
    case 'any': return true;
    default: return false;
  }
};

const filterRooms = (advertisement) => {
  const roomsValue = filterForm.querySelector('select[name=housing-rooms]').value;
  return roomsValue === advertisement.offer.rooms.toString() || roomsValue === DEFAULT_VALUE;
};

const filterGuests = (advertisement) => {
  const guestsValue = filterForm.querySelector('select[name=housing-guests]').value;
  return guestsValue === advertisement.offer.guests.toString() || guestsValue === DEFAULT_VALUE;
};

const getAllFilterInput = (advertisement) => {
  const inputFiltres = [
    filterType,
    filterPrice,
    filterRooms,
    filterGuests,
  ];
  return inputFiltres.every((input) => input(advertisement));
};

const getFeaturesRank = (advertisement) => {
  let rank = 0;
  const selectedFeatures = Array.from(filterForm.querySelectorAll('input[name="features"]:checked'));
  selectedFeatures.forEach((feature) => {
    advertisement.offer.features.includes(feature.value) ? rank +=1 : rank;
  });
  console.log(rank);
  return rank;
};

const compareAdvertisement = (advertisementA, advertisementB) => {
  const rankA = getFeaturesRank(advertisementA);
  const rankB = getFeaturesRank(advertisementB);

  return rankB - rankA;
};

const onFilterClick = (cb) => filterForm.addEventListener('click', () => {
  cb();
});

export {getAllFilterInput, compareAdvertisement, onFilterClick};
