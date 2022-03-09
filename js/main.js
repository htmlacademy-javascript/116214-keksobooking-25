import {cards} from './generateCards.js';
import { activatePage } from './form.js';

setTimeout(() => activatePage(false), 2000);
setTimeout(() => activatePage(true), 5000);

const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(cards[0]);

