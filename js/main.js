function getRandomPositiveInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.floor(Math.random() * (upper - lower + 1) + lower);
  return result;
}

function getAnyRandomNumber (min, max, afterPoint) {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const result = (Math.random() * (upper - lower) + lower).toFixed(afterPoint);
  return result;
}

function getHeadings (someDates, text1, text2) {
  const headings = [];
  someDates.forEach((someDate) => {
    const heading =text1 + String(someDate) + text2;
    headings.push(heading);
  });
  return headings;
}

function getRandomLength (array) {
  const copyArray = array.slice();
  copyArray.length = getRandomPositiveInteger (1, array.length-1);
  return copyArray;
}

function shuffle (array) {
  for (let nbr = array.length - 1; nbr > 0; nbr--) {
    const num = Math.floor(Math.random() * (nbr + 1));
    const swat = array[num];
    array[num] = array[nbr];
    array[nbr] = swat;
  }
  return array;
}

const integers = [];
let sum = 1;
for (let nbr = 0; nbr < 10; nbr++) {
  if (sum < 10) {
    integers.push(`0${  sum}`);
    sum++;} else {integers.push(String(sum));}
}

//author
const avatars = getHeadings(integers, 'img/avatars/user', '.png');

//offer
const titles = getHeadings(integers, 'Объявление ', '');
const tipes = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const cheskTimes = ['12:00', '13:00', '14:00'];
const allFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const descriptions = getHeadings(integers, 'Описание ', '');
const allPhotos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const createAdvertisement = () => {
  const locationLet = getAnyRandomNumber (35.65000, 35.70000, 5);
  const locationLng = getAnyRandomNumber (139.70000, 139.80000, 5);
  return {
    author: {
      avatar: avatars.shift(),
    },
    offer: {
      title: titles.shift(),
      address: String(`${locationLet  }, ${  locationLng}`),
      price: getRandomPositiveInteger (100, 1000),
      type: tipes[getRandomPositiveInteger (0, tipes.length-1)],
      rooms: getRandomPositiveInteger (0, 5),
      guests: getRandomPositiveInteger (0, 10),
      checkin: cheskTimes[getRandomPositiveInteger (0, cheskTimes.length-1)],
      checkout: cheskTimes[getRandomPositiveInteger (0, cheskTimes.length-1)],
      features:  shuffle (getRandomLength (allFeatures)),
      description: descriptions.shift(),
      photos:  shuffle (getRandomLength (allPhotos)),
    },
    location: {
      lat: locationLet,
      lng: locationLng,
    },
  };
};


const SIMILAR_ADVERTISEMENT_COUNT = 10;
// eslint-disable-next-line no-unused-vars
const advertisements =  Array.from({length: SIMILAR_ADVERTISEMENT_COUNT}, createAdvertisement);
