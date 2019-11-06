'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_PSEUDO_AFTER_HEIGHT = 19;
  var MAIN_PIN_IMG_BORDER_WIDTH = 3;

  var mainPinElement = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');

  function getAngleCoods() {
    return {
      x: mainPinElement.offsetLeft - MAIN_PIN_WIDTH / 2,
      y: mainPinElement.offsetTop + MAIN_PIN_HEIGHT - MAIN_PIN_IMG_BORDER_WIDTH + MAIN_PIN_PSEUDO_AFTER_HEIGHT
    };
  }

  function onMainPinElementMousedown() {
    window.fillAddress(true);
  }

  function onMainPinElementKeydown(evt) {
    if (evt.keyCode === window.Codes.ENTER) {
      window.fillAddress(true);
    }
  }

  // Функция получения координат
  // Если isActive === false, то берём координаты середины главного пина
  // Если isActive === true, то берём координаты острого нижнего
  // Изначально - false, т.к. интерфейс выключен. По включению - true
  window.fillAddress = function (isActive) {
    var mainPinCoords = {
      x: mainPinElement.offsetLeft - MAIN_PIN_WIDTH / 2,
      y: mainPinElement.offsetTop + MAIN_PIN_HEIGHT / 2
    };

    if (isActive) {
      mainPinCoords = getAngleCoods();
    }

    addressInput.value = Math.floor(mainPinCoords.x) + ', ' + Math.floor(mainPinCoords.y);
  };

  // Запуски функций получения координат по нажатию на главный пин
  mainPinElement.addEventListener('mousedown', onMainPinElementMousedown);
  mainPinElement.addEventListener('keydown', onMainPinElementKeydown);

  // Изначально найдём координаты главного пина при isActive === false
  window.fillAddress(false);
})();
