import {disableForm} from './util.js';

const togglePageActivity = (status) => {
  disableForm('ad-form', status);
  disableForm('map__filters', status);
};

export {togglePageActivity};
