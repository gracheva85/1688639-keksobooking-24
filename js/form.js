const adForm = document.querySelector('.ad-form');
const adFormChildrens = adForm.children;
const filterForm = document.querySelector('.map__filters');
const filterchildrens = filterForm.children;

const disableForm = (form, formChildrens) => {
  form.classList.add('.ad-form--disabled');
  Array.from(formChildrens).forEach((formChildren) => {
    formChildren.disabled = true;
  });
};

disableForm(adForm, adFormChildrens);
disableForm(filterForm, filterchildrens);

const enableForm = (form, formChildrens) => {
  form.classList.remove('.ad-form--disabled');
  Array.from(formChildrens).forEach((formChildren) => {
    formChildren.disabled = false;
  });
};

enableForm(adForm, adFormChildrens);
enableForm(filterForm, filterchildrens);
