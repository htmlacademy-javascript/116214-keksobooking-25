const PRICE_SLIDER_MIN_VALUE = 1000;
const PRICE_SLIDER_START_VALUE = 5000;
const PRICE_SLIDER_MAX_VALUE = 100000;

const addForm = document.querySelector('.ad-form');
const priceSlider = addForm.querySelector('.ad-form__slider');
const price = addForm.querySelector('#price');

noUiSlider.create(priceSlider, {
  range: {
    min: PRICE_SLIDER_MIN_VALUE,
    max: PRICE_SLIDER_MAX_VALUE
  },
  start: PRICE_SLIDER_START_VALUE,
  connect: 'lower',
  format: {
    to: function(value) {
      return value.toFixed();
    },
    from: function(value) {
      return parseInt(value, 10).toFixed();
    }
  }
});

const updateSliderMinPrice = (minPrice) => {
  priceSlider.noUiSlider.updateOptions({
    range: {
      min: minPrice,
      max: PRICE_SLIDER_MAX_VALUE
    },
  });
};

const disableSlider = (form, slider, status) => {
  if (form.contains(slider)) {
    if (status) {
      slider.setAttribute('disabled', status);
    } else {
      slider.removeAttribute('disabled');
    }
  }
};

priceSlider.noUiSlider.on('update', () => {
  price.value = priceSlider.noUiSlider.get();
});

export { updateSliderMinPrice, disableSlider, priceSlider };


