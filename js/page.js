const showDataNotLoadedError = (errorMessage) => {
  const mapElement = document.querySelector('.map');
  const errorElement = document.createElement('div');
  errorElement.classList.add('map__error');
  errorElement.textContent = errorMessage;
  mapElement.appendChild(errorElement);
};

export {showDataNotLoadedError};
