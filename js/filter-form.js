import { debounce } from './util.js';
import { displayData } from './announcements.js';
import { deactivateForm } from './forms-activity-handler.js';

const RERENDER_DELAY = 500;

const filterForm = document.querySelector('.map__filters');

let filter = {
  apply: false,
  rank: 0,
  type: 'any',
  price: 'any',
  rooms: 'any',
  guests: 'any',
  features: []
};

const setFilter = (evt) => {
  let rank = 0;

  const filterName = evt.target.name.split('-')[1];
  const filterValue = evt.target.value;

  if (filterName in filter) {
    filter = Object.assign(filter, {[filterName]: filterValue});
  } else {
    if (evt.target.checked) {
      filter.features.push(filterValue);
    } else {
      filter.features.splice(filter.features.indexOf(filterValue), 1);
    }
  }

  if (filter.type !== 'any') {
    rank += 1;
  }
  if (filter.price !== 'any') {
    rank += 1;
  }
  if (filter.rooms !== 'any') {
    rank += 1;
  }
  if (filter.guests !== 'any') {
    rank += 1;
  }
  if (filter.features.includes('wifi')) {
    rank += 1;
  }
  if (filter.features.includes('dishwasher')) {
    rank += 1;
  }
  if (filter.features.includes('parking')) {
    rank += 1;
  }
  if (filter.features.includes('washer')) {
    rank += 1;
  }
  if (filter.features.includes('elevator')) {
    rank += 1;
  }
  if (filter.features.includes('conditioner')) {
    rank += 1;
  }
  filter.rank = rank;
  filter.apply = filter.rank > 0;
};

const debounceHandler = debounce(
  () => displayData(),
  RERENDER_DELAY
);

const handleChangeFilter = (evt) => {
  setFilter(evt);
  debounceHandler();
};

filterForm.addEventListener('change', (evt) => {
  handleChangeFilter(evt);
});

deactivateForm(filterForm);

export { filterForm, filter };
