import './form.js';
import './map.js';
import {resetMapAndMarker} from './map.js';
import {setUserFormSubmit, clearForm} from './form.js';

const resetForm = () => {
  resetMapAndMarker();
  clearForm();
};

setUserFormSubmit(resetForm);

export {resetForm};


