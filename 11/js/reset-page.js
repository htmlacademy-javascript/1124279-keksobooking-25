import {
  resetMainPin,
  closePopup,
  removePins
} from './map.js';
import {
  setAddressValue
} from './form-status.js';
import {resetFilter} from './filtres.js';
import { getData } from './api.js';
import { createMarker } from './map.js';


function resetPage(form) {
  form.reset();
  setAddressValue();
  resetMainPin();
  closePopup();
  resetFilter();
  removePins();
  getData((ads) => {
    createMarker(ads);

  });

 


}

export {
  resetPage
};