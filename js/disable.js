'use strict';

(function () {
  // Данные для включения интерфейса
  var mapElement = document.querySelector('.map');
  var adInfoFormElement = document.querySelector('.ad-form');
  var filters = document.querySelectorAll('ad-form input, .ad-form select, .map__filters input, .map__filters select');

  // Функции для выключения интерфейса
  window.disableInterface = function () {
    mapElement.classList.add('map--faded');
    adInfoFormElement.classList.add('ad-form--disabled');

    filters.forEach(function (filter) {
      filter.setAttribute('disabled', 'disabled');
    });
  };

  // Изначально интерфейс отключен. Запустим сразу функцию, отключающую интерфейс
  window.disableInterface();
})();


