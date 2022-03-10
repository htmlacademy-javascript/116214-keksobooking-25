import {cards} from './generateCards.js';
import { togglePageActivity } from './form.js';

const DISABLE = false;
const ENABLE = true;

setTimeout(() => togglePageActivity(DISABLE), 2000);
setTimeout(() => togglePageActivity(ENABLE), 5000);

const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(cards[0]);

