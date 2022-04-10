import {
  resetMainPin,
  closePopup,
  removePins,
  createMarker
} from './map.js';
import {
  setAddressValue
} from './form-status.js';
import {resetFilter} from './filtres.js';
import { getData } from './api.js';
import {resetImage} from './images.js';
import {resetValueForm} from './form.js';

function resetPage(form) {
  form.reset();
  setAddressValue();
  resetMainPin();
  resetValueForm();
  closePopup();
  resetFilter();
  removePins();
  getData((ads) => {
    createMarker(ads);

  });

  resetImage();

}

export {
  resetPage
};
