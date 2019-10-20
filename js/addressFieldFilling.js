'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;

  var MAIN_PIN_PSEUDO_AFTER_HEIGHT = 19;
  var MAIN_PIN_IMG_BORDER_WIDTH = 3;

  var mainMapPinElement = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');

  function getMainMapPinElementCoordinate(isActive) {
    var mapPinOffsetTop = parseInt(mainMapPinElement.style.top, 10);
    var mapPinOffsetLeft = parseInt(mainMapPinElement.style.left, 10);

    var mapPinX = Math.round(mapPinOffsetLeft - MAIN_PIN_WIDTH / 2);
    var mapPinY = Math.round(mapPinOffsetTop + MAIN_PIN_HEIGHT / 2);

    if (isActive) {
      mapPinY = mapPinOffsetTop + MAIN_PIN_HEIGHT - MAIN_PIN_IMG_BORDER_WIDTH + MAIN_PIN_PSEUDO_AFTER_HEIGHT;
    }

    var mapPinCoordinate = mapPinX + ', ' + mapPinY;

    addressInput.value = mapPinCoordinate;
  }

  mainMapPinElement.addEventListener('mousedown', function () {
    getMainMapPinElementCoordinate(true);
  });

  mainMapPinElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      getMainMapPinElementCoordinate(true);
    }
  });

  getMainMapPinElementCoordinate(false);
})();
