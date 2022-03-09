import {activateForm} from './util.js';

const activatePage = (status) => {
  activateForm('ad-form', status);
  activateForm('map__filters', status);
};

export {activatePage};
