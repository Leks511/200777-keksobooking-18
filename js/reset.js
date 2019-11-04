'use strict';

(function () {
  var mainPinElement = document.querySelector('.map__pin--main');
  var resetButtonElement = document.querySelector('.ad-form__reset');
  var toDefaultValueElements = document.querySelectorAll('select[id^="housing-"], input[id^="filter-"],  #title, #price, #timein, #timeout, #description, .feature__checkbox');

  // Функция, приводящая фильтры в дефолтное состояние
  function setDeafultValues() {
    toDefaultValueElements.forEach(function (it) {
      if (it.classList.contains('map__filter')) {
        it.value = 'any';
      } else if (it.tagName.toLowerCase() === 'checkbox') {
        it.checked = false;
      } else if (it.id === 'title' || it.id === 'price' || it.id === 'description') {
        it.value = '';
      } else if (it.id === 'timein' || it.id === 'timeout') {
        it.value = '12:00';
      }
    });
  }

  // Функция приведения SPA в изначальное состояние
  window.regainSPA = function () {
    setDeafultValues();
    window.clear();
    window.disableInterface();
    window.setDefaultCoords();
    window.fillAddress(false);
    mainPinElement.removeEventListener('mousedown', window.setDranAndDrop);
  };

  resetButtonElement.addEventListener('click', function (evt) {
    evt.preventDefault();

    window.regainSPA();
  });
})();
