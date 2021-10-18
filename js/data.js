import {getRandomPositiveInteger, getAnyRandomNumber, getRandomLength, getRandomElement, shuffle} from './utils.js';

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_TIMES = ['12:00', '13:00', '14:00'];
const ALL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const ALL_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const SIMILAR_ADVERTISEMENT_COUNT = 10;
const createAdvertisement = (index) => {
  const locationLat = getAnyRandomNumber(35.65000, 35.70000, 5);
  const locationLng = getAnyRandomNumber(139.70000, 139.80000, 5);
  const checkTimes = getRandomElement(CHECK_TIMES);
  const numberFromInd = (index < 8) ? `0${(index + 1)}` : index + 1;
  return {
    author: {
      avatar: `img/avatars/user${numberFromInd}.png`,
    },
    offer: {
      title: 'Заголовок объявления о сдаче в аренду',
      address: `${locationLat}, ${locationLng}`,
      price: getRandomPositiveInteger(0, 1000000),
      type: getRandomElement(TYPES),
      rooms: getRandomPositiveInteger(1, 3),
      guests: getRandomPositiveInteger(1, 3),
      checkin:  checkTimes,
      checkout: checkTimes,
      features:  shuffle(getRandomLength(ALL_FEATURES)),
      description: 'Описание объявления',
      photos:  shuffle(getRandomLength(ALL_PHOTOS)),
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    },
  };
};
const advertisements = () => Array.from({length: SIMILAR_ADVERTISEMENT_COUNT}, (item, i) => createAdvertisement(i));
export {advertisements};
