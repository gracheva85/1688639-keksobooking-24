import {advertisements} from './data.js';
import {changeTitleByNumber} from './utils.js';

const map = document.querySelector('.map__canvas');
const contentTemplate = document.querySelector('#card').content;
const cardTemplate = contentTemplate.querySelector('.popup');
const cards = [];

const Translator = {
  BUNGALOW: 'Бунгало',
  FLAT: 'Квартира',
  HOTEL: 'Отель',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
};
/*
const changeTitleByNumber = (number, titles) => {
  const CASES = [2, 0, 1, 1, 1, 2];
  return titles[ (number%100>4 && number%100<20)? 2 : CASES[(number%10<5)?number%10:5] ];
};*/

const hidden = (content, elementClassName) => {
  if (content === '') {
    elementClassName.style.display = 'none';
  }
};

const similarAdvertisements = advertisements();
similarAdvertisements.forEach((advertisement) => {
  const advertisementElement = cardTemplate.cloneNode(true);

  const photoContainer = advertisementElement.querySelector('.popup__photos');
  const photoTemplate = photoContainer.querySelector('.popup__photo');
  photoContainer.innerHTML = '';
  const photos = advertisement.offer.photos;
  photos.forEach((photo) => {
    const clonePhoto = photoTemplate.cloneNode(true);
    clonePhoto.src = photo;
    photoContainer.appendChild(clonePhoto);
  });

  const featureList = advertisementElement.querySelectorAll('.popup__feature');
  const features = advertisement.offer.features;
  const modifiers = features.map((feature) => `popup__feature--${feature}`);
  featureList.forEach((featureListItem) => {
    const modifier = featureListItem.classList[1];
    if (!modifiers.includes(modifier)) {
      featureListItem.remove();
    }
  });

  const roomAndGuest = `${advertisement.offer.rooms} ${changeTitleByNumber(advertisement.offer.rooms, ['комната', 'комнаты', 'комнат'])} для ${advertisement.offer.guests} ${changeTitleByNumber(advertisement.offer.guests, ['гостя', 'гостей', 'гостей'])}`;

  advertisementElement.querySelector('.popup__avatar').src = advertisement.author.avatar;
  advertisementElement.querySelector('.popup__title').textContent = advertisement.offer.title;
  advertisementElement.querySelector('.popup__text--address').textContent = advertisement.offer.address;
  advertisementElement.querySelector('.popup__text--price').textContent = `${advertisement.offer.price} ₽/ночь`;
  advertisementElement.querySelector('.popup__type').textContent = Translator[advertisement.offer.type.toUpperCase()];
  advertisementElement.querySelector('.popup__text--capacity').textContent = roomAndGuest;
  advertisementElement.querySelector('.popup__text--time').textContent = `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`;
  advertisementElement.querySelector('.popup__description').textContent = advertisement.offer.description;

  hidden(advertisement.author.avatar,advertisementElement.querySelector('.popup__avatar'));
  hidden(advertisement.offer.address, advertisementElement.querySelector('.popup__text--address'));
  hidden(advertisement.offer.type, advertisementElement.querySelector('.popup__type'));
  hidden(advertisement.offer.rooms, advertisementElement.querySelector('.popup__text--capacity'));
  hidden(advertisement.offer.guests, advertisementElement.querySelector('.popup__text--capacity'));
  hidden(advertisement.offer.checkin, advertisementElement.querySelector('.popup__text--time'));
  hidden(advertisement.offer.checkout, advertisementElement.querySelector('.popup__text--time'));
  hidden(advertisement.offer.description, advertisementElement.querySelector('.popup__description'));
  hidden(features, advertisementElement.querySelector('.popup__features'));
  hidden(photos, advertisementElement.querySelector('.popup__photos'));

  cards.push(advertisementElement);
});

map.appendChild(cards[0]);
