import {changeTitleByNumber} from './utils.js';


const adForm = document.querySelector('.ad-form');
const adFormChildrens = adForm.children;
const filterForm = document.querySelector('.map__filters');
const filterchildrens = filterForm.children;
const room = adForm.querySelector('#room_number');
const guest = adForm.querySelector('#capacity');
const roomNumber = adForm.querySelector('select[name=rooms]');
const guestNumber = adForm.querySelector('select[name=capacity]');
const typeSelect = adForm.querySelector('select[name=type]');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const title = adForm.querySelector('#title');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const timeInSelected = adForm.querySelector('select[name="timein"]');
const timeOutSelected = adForm.querySelector('select[name="timeout"]');


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

const onRoomOrGuestChange = (item) => {item.addEventListener('change', () => {
  const roomValue = Number(roomNumber.value);
  const guestValue = Number(guestNumber.value);
  guestNumber.style = 'box-shadow: 0 0 3px 3px red';
  if (roomValue < guestValue) {
    guestNumber.setCustomValidity('Количество комнат должно быть не менее количества гостей');
  }
  else if (roomValue === 100 && guestValue !== 0) {
    guestNumber.setCustomValidity('Для 100 комнат доступен вариант "не для гостей"');
  }
  else if (roomValue !== 100 && guestValue === 0) {
    guestNumber.setCustomValidity('Укажите количество гостей');
  }
  else {guestNumber.setCustomValidity('');
    guestNumber.style = '';
  }
  guestNumber.reportValidity();
});
};

onAdformInput('#room_number', '#capacity', room, guest, onRoomOrGuestChange);

const onPriceOrTypeChange = (item) => {item.addEventListener('change', () => {
  price.min = MinPriceByType[typeSelect.value.toUpperCase()];
  price.placeholder = price.min;
  const priceValue = Number(price.value);
  const priceMin = Number(price.min);
  const priceMax = Number(price.max);
  price.style = 'box-shadow: 0 0 3px 3px red';
  if (priceValue < priceMin) {
    price.setCustomValidity(`Цена должна быть не менее ${priceMin}`);
  }
  else if (priceValue > priceMax) {
    price.setCustomValidity(`Цена должна быть не более ${priceMax}`);
  }
  else {price.setCustomValidity('');
    price.style = '';
  }
  price.reportValidity();
});
};

onAdformInput('#price', '#type', price, type, onPriceOrTypeChange);

const onTitleInput = () => {title.addEventListener('input', () => {
  const deficit = 30-title.value.length;
  const proficit = title.value.length-100;
  title.style = 'box-shadow: 0 0 3px 3px red';
  if (title.value.length < 30) {
    title.setCustomValidity(`Заголовок должен состоять еще из ${deficit} ${changeTitleByNumber(deficit, ['символа', 'символов', 'символов'])}`);
  }
  else if (title.value.length > 100) {
    title.setCustomValidity(`Заголовок должен быть меньше на ${proficit} ${changeTitleByNumber(proficit, ['символ', 'символа', 'символов'])}`);
  }
  else {title.setCustomValidity('');
    title.style = '';
  }
  title.reportValidity();
});
};
onTitleInput();

const changeTime = (item) => {
  if (item === timeIn) {
    timeOutSelected.value = timeInSelected.value;
  } else if (item === timeOut) {
    timeInSelected.value = timeOutSelected.value;
  }
};

onAdformInput('#timein', '#timeout', timeIn, timeOut, changeTime);
