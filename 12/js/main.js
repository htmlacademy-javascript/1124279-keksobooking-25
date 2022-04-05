
import './util.js';
import './form-status.js';
import './form.js';
import './map.js';
import './api.js';
import './images.js';

import {createMarker} from './map.js';
import {setFormSubmit} from './form.js';
import {getData} from './api.js';
import {setFilterChange,setCheckboxChange} from './filtres.js';
// import {setInactiveForm} from './form-status.js';
import {debounce} from './util.js';

const RENDER_DELAY = 500;

getData((ads) => {
  createMarker(ads);
  setFilterChange(debounce(() => createMarker(ads), RENDER_DELAY));
  setCheckboxChange(debounce(() => createMarker(ads), RENDER_DELAY));
});

setFormSubmit();
