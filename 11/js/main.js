
import './util.js';
import './form-status.js';
import './form.js';
import './map.js';
import './api.js';

import {createMarker} from './map.js';
import {setFormSubmit} from './form.js';
import {getData} from './api.js';
import {setFilterChange,setCheckboxChange} from './filtres.js';
// import {setInactiveForm} from './form-status.js';

getData((ads) => {
  createMarker(ads);
  setFilterChange(() => createMarker(ads));
  setCheckboxChange(() => createMarker(ads));
});

setFormSubmit();
