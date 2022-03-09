import {cards} from './generateCards.js';
import { deactivatePage, activatePage } from './form.js';

setTimeout(() => deactivatePage(), 2000);
setTimeout(() => activatePage(), 5000);

const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(cards[0]);

