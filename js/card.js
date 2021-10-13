'use strict';
import {advertisements} from './data.js';

const map = document.querySelector('.map__canvas');
const template = document.querySelector('#card').content;
const cardTemplate = template.querySelector('.popup');
const cards = [];

const translate = (current) => {
 return current === 'flat' ? 'Квартира' : current === 'bungalow' ? 'Бунгало' : current === 'house' ? 'Дом' : current === 'palace' ? 'Дворец' : 'Отель';
};

const similarAdvertisements = advertisements();
similarAdvertisements.forEach((advertisement) => {

const photoContainer = cardTemplate.querySelector('.popup__photos');
const photoTemplate = photoContainer.querySelector('.popup__photo');
const photos = advertisement.offer.photos;
photoContainer.innerHTML = '';
console.log(photos);
for (let i = 0; i < photos.length; i++) {
 const testPhoto = photoTemplate.cloneNode(true);
 testPhoto.src = photos[i];
 photoContainer.appendChild(testPhoto);
};

const featureList = cardTemplate.querySelectorAll('.popup__feature');
const features = advertisement.offer.features;
featureList.forEach((featureListItem) => {
 const isNecessary = features.some(
 (feature) => featureListItem.classList.contains('popup__feature--' + feature)
);
 if (!isNecessary) {
  featureListItem.remove();
  };
});

 const advertisementElement = cardTemplate.cloneNode(true);
 advertisementElement.querySelector('.popup__avatar').src = advertisement.author.avatar;
 advertisementElement.querySelector('.popup__title').textContent = advertisement.offer.title;
 advertisementElement.querySelector('.popup__text--address').textContent = advertisement.offer.address;
 advertisementElement.querySelector('.popup__text--price').textContent = `${advertisement.offer.price} ₽/ночь`;
 advertisementElement.querySelector('.popup__type').textContent = translate(advertisement.offer.type);
 advertisementElement.querySelector('.popup__text--capacity').textContent = `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей`;
 advertisementElement.querySelector('.popup__text--time').textContent = `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`
 advertisementElement.querySelector('.popup__description').textContent = advertisement.offer.description;

const hidden = (className) => {
	if(advertisementElement.querySelector(className).textContent == "") {
   advertisementElement.querySelector(className).style.display = "none";
 }
};

const hiddenPhoto = (className) => {
 if(advertisementElement.querySelector(className).src == "") {
  advertisementElement.querySelector(className).style.display = "none";
 }
};

hiddenPhoto('.popup__avatar');
hidden('.popup__text');
hidden('.popup__features');
hidden('.popup__description');
hidden('.popup__photo');

 cards.push(advertisementElement);
});

map.appendChild(cards[0]);
