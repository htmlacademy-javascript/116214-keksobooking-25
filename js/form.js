import {deactivateForm, activateForm} from './util.js';

const deactivatePage = () => {
  deactivateForm('ad-form');
  deactivateForm('map__filters');
};

const activatePage = () => {
  activateForm('ad-form');
  activateForm('map__filters');
};

export {activatePage, deactivatePage};
