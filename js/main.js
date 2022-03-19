import {cards} from './generateCards.js';
import { activatePage, deactivatePage } from './page.js';
import './form.js';

document.addEventListener('DOMContentLoaded', () => {
  deactivatePage();
});

setTimeout(activatePage, 1000);

const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(cards[0]);

