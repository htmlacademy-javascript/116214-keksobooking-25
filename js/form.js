import {activateForm, deactivateForm} from './util.js';

const activatePage = () => {
  activateForm('ad-form');
  activateForm('map__filters');
};

const deactivatePage = () => {
  deactivateForm('ad-form');
  deactivateForm('map__filters');
};

export {activatePage, deactivatePage};
