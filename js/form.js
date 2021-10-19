import {changeTitleByNumber} from './utils.js';


const adForm = document.querySelector('.ad-form');
const adFormChildrens = adForm.children;
const filterForm = document.querySelector('.map__filters');
const filterchildrens = filterForm.children;
const roomInput = adForm.querySelector('#room_number');
const guestInput = adForm.querySelector('#capacity');
const roomNumber = adForm.querySelector('select[name=rooms]');
const guestNumber = adForm.querySelector('select[name=capacity]');
const typeSelect = adForm.querySelector('select[name=type]');
const typeInput = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const title = adForm.querySelector('#title');

const MinPriceByType = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
};

const toggleFormClass = (form, formChildrens) => {
  form.classList.toggle('ad-form--disabled');
  Array.from(formChildrens).forEach((formChildren) => {
    if ( form.classList.contains('ad-form--disabled')) {
      formChildren.disabled = true;
    } else {formChildren.disabled = false;
    }
  });
};

toggleFormClass(adForm, adFormChildrens);
toggleFormClass(filterForm, filterchildrens);
toggleFormClass(adForm, adFormChildrens);
toggleFormClass(filterForm, filterchildrens);

const onAdformInput = (idFirst, idSecond, constFirst, constSecond, onAction) => {
  const onRoomAndGuestSelect = (evt) => {
    if (evt.target.matches(idFirst)) {
      onAction(constFirst);}
    else if (evt.target.matches(idSecond)) {
      onAction(constSecond);}
  };
  adForm.addEventListener('input', onRoomAndGuestSelect);
};

const onRoomSelect = (item) => {item.addEventListener('change', () => {
  const roomValue = Number(roomNumber.value);
  const guestValue = Number(guestNumber.value);
  if (roomValue < guestValue) {
    guestNumber.setCustomValidity('Количество комнат должно быть не менее количества гостей');
    guestNumber.style = 'box-shadow: 0 0 3px 3px red';
  }
  else if (roomValue === 100 && guestValue !== 0) {
    guestNumber.setCustomValidity('Для 100 комнат доступен вариант "не для гостей"');
    guestNumber.style = 'box-shadow: 0 0 3px 3px red';
  }
  else if (roomValue !== 100 && guestValue === 0) {
    guestNumber.setCustomValidity('Укажите количество гостей');
    guestNumber.style = 'box-shadow: 0 0 3px 3px red';
  }
  else {guestNumber.setCustomValidity('');
    guestNumber.style = '';
  }
  guestNumber.reportValidity();
});
};

onAdformInput('#room_number', '#capacity', roomInput, guestInput, onRoomSelect);

const onPriceSelect = (item) => {item.addEventListener('change', () => {
  price.min = MinPriceByType[typeSelect.value.toUpperCase()];
  const priceValue = Number(price.value);
  const priceMin = Number(price.min);
  const priceMax = Number(price.max);
  if (priceValue < priceMin) {
    price.setCustomValidity(`Цена должна быть больше ${priceMin}`);
    price.style = 'box-shadow: 0 0 3px 3px red';
  }
  else if (priceValue > priceMax) {
    price.setCustomValidity(`Цена должна быть меньше ${priceMax}`);
    price.style = 'box-shadow: 0 0 3px 3px red';
  }
  else {price.setCustomValidity('');
    price.style = '';
  }
  price.reportValidity();
});
};

onAdformInput('#price', '#type', price, typeInput, onPriceSelect);

const onTitleInput = () => {title.addEventListener('input', () => {
  //const firstPhrase = `Заголовок должен состоять еще из ${changeTitleByNumber(30-title.value.length), ['символа', 'символов', 'символов']}`;
  //console.log(firstPhrase);
  const deficit = 30-title.value.length;
  const proficit = title.value.length-100;
  if (title.value.length < 30) {
    title.setCustomValidity(`Заголовок должен состоять еще из ${deficit} ${changeTitleByNumber(deficit, ['символа', 'символов', 'символов'])}`);
    title.style = 'box-shadow: 0 0 3px 3px red';
  }
  else if (title.value.length > 100) {
    title.setCustomValidity(`Заголовок должен быть меньше на ${proficit} ${changeTitleByNumber(proficit, ['символ', 'символа', 'символов'])}`);
    title.style = 'box-shadow: 0 0 3px 3px red';
  }
  else {title.setCustomValidity('');
    title.style = '';
  }
  title.reportValidity();
});
};
onTitleInput();

