import {cards} from './generateCards.js';
import { togglePageActivity } from './form.js';

setTimeout(() => togglePageActivity(false), 2000);
setTimeout(() => togglePageActivity(true), 5000);

const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(cards[0]);

