'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;

  var MAIN_PIN_PSEUDO_AFTER_HEIGHT = 19;
  var MAIN_PIN_IMG_BORDER_WIDTH = 3;

  var mainMapPin = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');

  function getMainMapPinCoordinate(isActive) {
    var mapPinOffsetTop = parseInt(mainMapPin.style.top, 10);
    var mapPinOffsetLeft = parseInt(mainMapPin.style.left, 10);

    var mapPinX = Math.round(mapPinOffsetLeft - MAIN_PIN_WIDTH / 2);
    var mapPinY = Math.round(mapPinOffsetTop + MAIN_PIN_HEIGHT / 2);

    if (isActive) {
      mapPinY = mapPinOffsetTop + MAIN_PIN_HEIGHT - MAIN_PIN_IMG_BORDER_WIDTH + MAIN_PIN_PSEUDO_AFTER_HEIGHT;
    }

    var mapPinCoordinate = mapPinX + ', ' + mapPinY;

    addressInput.value = mapPinCoordinate;
  }

  mainMapPin.addEventListener('mousedown', function () {
    getMainMapPinCoordinate(true);
  });

  mainMapPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      getMainMapPinCoordinate(true);
    }
  });

  getMainMapPinCoordinate(false);
})();
