import { filter } from './filter-form.js';

const PRICE_VALUE_LOW = 10000;
const PRICE_VALUE_HIGH = 50000;

const acceptType = (itemValue = undefined) => {
  const filterValue = filter.type;
  if (! filterValue) {
    return false;
  }
  return filterValue === itemValue;
};

const acceptPrice = (itemValue = undefined) => {
  const filterValue = filter.price;
  if (! filterValue) {
    return false;
  }

  const priceFilter = {
    middle: itemValue >= PRICE_VALUE_LOW && itemValue <= PRICE_VALUE_HIGH,
    low: itemValue < PRICE_VALUE_LOW,
    high: itemValue > PRICE_VALUE_HIGH
  };

  return priceFilter[filterValue];
};

const acceptRooms = (itemValue = undefined) => {
  const filterValue = filter.rooms;
  if (! filterValue) {
    return false;
  }
  return parseInt(filterValue, 10) === itemValue;
};

const acceptGuests = (itemValue = undefined) => {
  const filterValue = filter.guests;
  if (! filterValue) {
    return false;
  }
  return parseInt(filterValue, 10) === itemValue;
};

const acceptFeature = (feature, features) => {
  const filterValue = filter.features.includes(feature);
  if (! filterValue) {
    return false;
  }
  return features.includes(feature);
};

const getAnnouncementRank = ({type = 'any', price = 'any', rooms = 'any', guests = 'any', features = []}) => {
  let rank = 0;

  if ( acceptType(type) ) {
    rank += 1;
  }

  if ( acceptPrice(price) ) {
    rank += 1;
  }

  if ( acceptRooms(rooms) ) {
    rank += 1;
  }

  if ( acceptGuests(guests) ) {
    rank += 1;
  }

  features.forEach((item, index, array) => {
    if (acceptFeature(item, array)) {
      rank += 1;
    }
  });

  return rank;
};

const compareAnnouncements = (a, b) => {
  const rankA = getAnnouncementRank(a.offer);
  const rankB = getAnnouncementRank(b.offer);
  return rankB - rankA;
};

const filterAnnouncements = (announcements) => announcements
  .slice()
  .sort(compareAnnouncements)
  .filter(({offer}) => getAnnouncementRank(offer) === filter.rank);

export { filterAnnouncements };
