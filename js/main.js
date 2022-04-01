
import './util.js';
import './form-status.js';
import './form.js';
import './map.js';
import './api.js';

import {createMarker} from './map.js';
import {setFormSubmit} from './form.js';
import {getData} from './api.js';
import {setTypeHousing, setHousingRooms, setCostHousing, setHousingGuest} from './filtres.js';
const SIMMILAR_ADS_COUNT = 34;


getData((ads) => {
  createMarker(ads, SIMMILAR_ADS_COUNT);
  setTypeHousing(() => createMarker(ads, SIMMILAR_ADS_COUNT));
  setCostHousing(() => createMarker(ads, SIMMILAR_ADS_COUNT));
  setHousingRooms(() => createMarker(ads, SIMMILAR_ADS_COUNT));
  setHousingGuest(() => createMarker(ads, SIMMILAR_ADS_COUNT));
});
setFormSubmit();
