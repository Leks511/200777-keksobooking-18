'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mainPinElement = document.querySelector('.map__pin--main');
  var adFormElement = document.querySelector('.ad-form');
  var filters = document.querySelectorAll('.ad-form input, .ad-form select, .map__filters input, .map__filters select');

  // Функции выключения интерфейса
  window.disableInterface = function () {
    mapElement.classList.add('map--faded');
    adFormElement.classList.add('ad-form--disabled');

    filters.forEach(function (it) {
      it.setAttribute('disabled', 'disabled');
    });

    // Будем включать интерфейс при взаимодействии с главным пином
    mainPinElement.addEventListener('mousedown', window.enableInterface);
    mainPinElement.addEventListener('keydown', window.onMainPinElementEnterPress);
  };

  // Изначально интерфейс отключен. Запустим сразу функцию, отключающую интерфейс
  window.disableInterface();
})();


