import './map.js';
import {map} from './map.js';
import {cards} from './generateCards.js';
import { activatePage, deactivatePage } from './page.js';
import './form.js';

deactivatePage();

map.whenReady(() => {
  activatePage();
});

const mapCanvas = document.querySelector('#map-canvas');

