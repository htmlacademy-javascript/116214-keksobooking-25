import {formClassNames, activateForm, deactivateForm} from './form.js';

const activatePage = () => {
  formClassNames.forEach((className) => activateForm(className));
};

const deactivatePage = () => {
  formClassNames.forEach((className) => deactivateForm(className));
};

export {activatePage, deactivatePage};
