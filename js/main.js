
import './util.js';
import './form-status.js';
import './form.js';
import './map.js';
import './api.js';

import {createMarker} from './map.js';
import {setFormSubmit} from './form.js';
import {getData} from './api.js';

const SIMMILAR_ADS_COUNT = 15;


getData(createMarker, SIMMILAR_ADS_COUNT);
setFormSubmit();
