import { filter } from './form.js';

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
  switch(filterValue) {
    case 'middle':
      return itemValue >= 10000 && itemValue <= 50000;
    case 'low':
      return itemValue < 10000;
    case 'high':
      return itemValue > 50000;
  }
};

const acceptRooms = (itemValue) => {
  const filterValue = filter.rooms;
  if (! filterValue) {
    return false;
  }
  return parseInt(filterValue, 10) === itemValue;
};

const acceptGuests = (itemValue) => {
  const filterValue = filter.guests;
  if (! filterValue) {
    return false;
  }
  return parseInt(filterValue, 10) === itemValue;
};

const acceptWifi = (features) => {
  const filterValue = filter.features.includes('wifi');
  if (! filterValue) {
    return false;
  }
  return features.includes('wifi');
};

const acceptDishwasher = (features) => {
  const filterValue = filter.features.includes('dishwasher');
  if (! filterValue) {
    return false;
  }
  return features.includes('dishwasher');
};

const acceptParking = (features) => {
  const filterValue = filter.features.includes('parking');
  if (! filterValue) {
    return false;
  }
  return features.includes('parking');
};

const acceptWasher = (features) => {
  const filterValue = filter.features.includes('washer');
  if (! filterValue) {
    return false;
  }
  return features.includes('washer');
};

const acceptElevator = (features) => {
  const filterValue = filter.features.includes('elevator');
  if (! filterValue) {
    return false;
  }
  return features.includes('elevator');
};

const acceptConditioner = (features) => {
  const filterValue = filter.features.includes('conditioner');
  if (! filterValue) {
    return false;
  }
  return features.includes('conditioner');
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

  if ( acceptWifi(features) ) {
    rank += 1;
  }

  if ( acceptDishwasher(features) ) {
    rank += 1;
  }

  if ( acceptParking(features) ) {
    rank += 1;
  }

  if ( acceptWasher(features) ) {
    rank += 1;
  }

  if ( acceptElevator(features) ) {
    rank += 1;
  }

  if ( acceptConditioner(features) ) {
    rank += 1;
  }

  return rank;
};

const compareAnnouncements = (a, b) => {
  const rankA = getAnnouncementRank(a.offer);
  const rankB = getAnnouncementRank(b.offer);
  return rankB - rankA;
};

const sortAnnouncements = (announcements) => announcements
  .slice()
  .sort(compareAnnouncements);

export { sortAnnouncements, getAnnouncementRank };
