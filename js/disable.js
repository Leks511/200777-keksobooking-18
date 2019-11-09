'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mainPinElement = document.querySelector('.map__pin--main');
  var adFormElement = document.querySelector('.ad-form');
  var filterElements = document.querySelectorAll('.ad-form input, .ad-form select, .map__filters input, .map__filters select, #description');

  // Обработчики события главного пина
  function onMainPinElementEnterPress(evt) {
    if (evt.keyCode === window.Codes.ENTER) {
      onMainPinElementMousedown();
    }
  }

  function onMainPinElementMousedown() {
    window.enableInterface();
    mainPinElement.removeEventListener('mousedown', onMainPinElementMousedown);
    mainPinElement.removeEventListener('keydown', onMainPinElementEnterPress);
  }

  // Функции выключения интерфейса
  window.disableInterface = function () {
    mapElement.classList.add('map--faded');
    adFormElement.classList.add('ad-form--disabled');

    filterElements.forEach(function (it) {
      it.setAttribute('disabled', 'disabled');
    });

    // Будем включать интерфейс при взаимодействии с главным пином
    mainPinElement.addEventListener('mousedown', onMainPinElementMousedown);
    mainPinElement.addEventListener('keydown', onMainPinElementEnterPress);
  };

  // Изначально интерфейс отключен. Запустим сразу функцию, отключающую интерфейс
  window.disableInterface();
})();


