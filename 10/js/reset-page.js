import {resetMainPin, closePopup} from './map.js';
import {setAddressValue} from './form-status.js';

function resetPage (form) {
  form.reset();
  setAddressValue();
  resetMainPin();
  closePopup();
}

export {resetPage};
