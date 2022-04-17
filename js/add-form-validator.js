const addForm = document.querySelector('.ad-form');
const capacity = addForm.querySelector('#capacity');
const title = addForm.querySelector('#title');
const roomNumber = addForm.querySelector('#room_number');

const ROOM_NUMBER_NOT_FOR_GUESTS = '100';

const capacityPerRoomNumber = {
  '1': [1],
  '2': [1, 2],
  '3': [1, 2, 3],
  '100': [0]
};

const pristineConfig = {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
};

let addFormValidator = new Pristine(addForm, pristineConfig, true);

const getCapacityErrorMessage = () => {
  const possibleGuestCounts = capacityPerRoomNumber[roomNumber.value];
  const maxGuestCount = possibleGuestCounts[possibleGuestCounts.length - 1];
  return (
    roomNumber.value === ROOM_NUMBER_NOT_FOR_GUESTS ?
      'Не для гостей' :
      `Не более ${maxGuestCount} ${maxGuestCount === 1 ? 'гостья' : 'гостей'}`
  );
};

addFormValidator.addValidator(
  capacity,
  (value) => capacityPerRoomNumber[roomNumber.value].includes(parseInt(value, 10)),
  getCapacityErrorMessage,
  1,
  false
);

addFormValidator.addValidator(
  title,
  (value) => value.length >= 30 && value.length <= 100,
  'От 30 до 100 символов',
  1,
  false
);

const renewAddFormValidator = () => {
  addFormValidator = new Pristine(addForm, pristineConfig, true);
};

export { addFormValidator, renewAddFormValidator };
