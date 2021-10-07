import {getRandomPositiveInteger, getAnyRandomNumber, getRandomLength, getRandomElement, shuffle} from './util.js';

const integers = [];
let sum = 1;
for (let nbr = 0; nbr < 10; nbr++) {
  if (sum < 10) {
    integers.push(`0${  sum}`);
    sum++;} else {integers.push(String(sum));}
}

const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkTimes = ['12:00', '13:00', '14:00'];
const allFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const allPhotos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const SIMILAR_ADVERTISEMENT_COUNT = 10;
const createAdvertisement = (index) => {
  const locationLet = getAnyRandomNumber (35.65000, 35.70000, 5);
  const locationLng = getAnyRandomNumber (139.70000, 139.80000, 5);

  return {
    author: {
      avatar: `img/avatars/user${integers[index]}.png`,
    },
    offer: {
      title: `Объявление ${integers[index]}`,
      address: `${locationLet  }, ${  locationLng}`,
      price: getRandomPositiveInteger (100, 1000),
      type: getRandomElement(types),
      rooms: getRandomPositiveInteger (0, 5),
      guests: getRandomPositiveInteger (0, 10),
      checkin:  getRandomElement(checkTimes),
      checkout: getRandomElement(checkTimes),
      features:  shuffle (getRandomLength (allFeatures)),
      description: `Описание ${integers[index]}`,
      photos:  shuffle (getRandomLength (allPhotos)),
    },
    location: {
      lat: locationLet,
      lng: locationLng,
    },
  };
 };
const advertisements = Array.from({length: SIMILAR_ADVERTISEMENT_COUNT}, (item, i) => createAdvertisement(i));

export {advertisements};
