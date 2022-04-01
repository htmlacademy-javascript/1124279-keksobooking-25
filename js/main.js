
import './util.js';
import './form-status.js';
import './form.js';
import './map.js';
import './api.js';

import {createMarker} from './map.js';
import {setFormSubmit} from './form.js';
import {getData} from './api.js';
import {setFilterChange} from './filtres.js';
const SIMMILAR_ADS_COUNT = 10;

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuest = document.querySelector('#housing-guests');

getData((ads) => {
  createMarker(ads, SIMMILAR_ADS_COUNT);
  setFilterChange(housingGuest,() => createMarker(ads, SIMMILAR_ADS_COUNT));
  setFilterChange(housingRooms, () => createMarker(ads, SIMMILAR_ADS_COUNT));
  setFilterChange(housingPrice, () => createMarker(ads, SIMMILAR_ADS_COUNT));
  setFilterChange(housingType, () => createMarker(ads, SIMMILAR_ADS_COUNT));
});
setFormSubmit();
