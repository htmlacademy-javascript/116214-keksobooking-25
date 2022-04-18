const ROOM_NUMBER_NOT_FOR_GUESTS = '100';

const CAPACITY_PER_ROOM_NUMBER = {
  '1': [1],
  '2': [1, 2],
  '3': [1, 2, 3],
  '100': [0]
};

const PRISTINE_CONFIG = {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
};

const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;

const addForm = document.querySelector('.ad-form');
const capacity = addForm.querySelector('#capacity');
const title = addForm.querySelector('#title');
const roomNumber = addForm.querySelector('#room_number');

const addFormValidator = new Pristine(addForm, PRISTINE_CONFIG, true);

const getCapacityErrorMessage = () => {
  const possibleGuestCounts = CAPACITY_PER_ROOM_NUMBER[roomNumber.value];
  const maxGuestCount = possibleGuestCounts[possibleGuestCounts.length - 1];
  return (
    roomNumber.value === ROOM_NUMBER_NOT_FOR_GUESTS ?
      'Не для гостей' :
      `Не более ${maxGuestCount} ${maxGuestCount === 1 ? 'гостья' : 'гостей'}`
  );
};

addFormValidator.addValidator(
  capacity,
  (value) => CAPACITY_PER_ROOM_NUMBER[roomNumber.value].includes(parseInt(value, 10)),
  getCapacityErrorMessage,
  1,
  false
);

addFormValidator.addValidator(
  title,
  (value) => value.length >= TITLE_MIN_LENGTH && value.length <= TITLE_MAX_LENGTH,
  `От ${TITLE_MIN_LENGTH} до ${TITLE_MAX_LENGTH} символов`,
  1,
  false
);

export { addFormValidator };
