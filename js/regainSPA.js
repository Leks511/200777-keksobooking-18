'use strict';

(function () {
  var resetButtonElement = document.querySelector('.ad-form__reset');
  var resetingElements = document.querySelectorAll('select[id^="housing-"], input[id^="filter-"], #type,  #title, #price, #timein, #timeout, #description, .feature__checkbox');

  // Функция, приводящая элементы в дефолтное состояние
  function setDeafultValues() {
    resetingElements.forEach(function (it) {
      if (it.classList.contains('map__filter')) {
        it.value = 'any';
      } else if (it.type === 'checkbox') {
        it.checked = false;
      } else if (it.id === 'title' || it.id === 'price' || it.id === 'description') {
        it.value = '';
      } else if (it.id === 'timein' || it.id === 'timeout') {
        it.value = '12:00';
      } else if (it.id === 'type') {
        it.value = 'flat';
      }
    });
  }

  // Функция приведения SPA в изначальное состояние
  window.regainSPA = function () {
    setDeafultValues();
    window.checkTypeOfHousing();
    window.clear();
    window.disable();
    window.setDefaultCoords();
    window.fillAddress(false);
  };

  resetButtonElement.addEventListener('click', function (evt) {
    evt.preventDefault();

    window.regainSPA();
  });
})();
