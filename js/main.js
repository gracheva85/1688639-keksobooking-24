import './form.js';
import './map.js';
import {changeFromStateEnabled, adFormChildrens, filterForm, filterChildrens} from './form.js';
import {getData} from './api.js';
import {renderMarkers, map} from './map.js';
import {createDownloadMessage} from './popups.js';
import {onFilterClick} from './filter.js';

const URL_GET_DATA = 'https://24.javascript.pages.academy/keksobooking/data';

const activateAfterMapLoad = () => {
  changeFromStateEnabled(false, adFormChildrens);
  getData(
    URL_GET_DATA,
    (data) => {
      renderMarkers(data),
      changeFromStateEnabled(false, filterChildrens),
      onFilterClick(() => renderMarkers(data));
    },
    () => createDownloadMessage(),
  );
};

map.on('load', activateAfterMapLoad());

filterForm.addEventListener('click', () => {

});
