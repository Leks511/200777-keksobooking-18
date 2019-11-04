'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mainPinElement = document.querySelector('.map__pin--main');

  var limits = {
    top: 130 - 80,
    right: mapElement.offsetWidth - mainPinElement.offsetWidth / 2,
    bottom: 630 - 82,
    left: 0 - mainPinElement.offsetWidth / 2
  };

  var defaultCoords = {
    x: mainPinElement.offsetLeft,
    y: mainPinElement.offsetTop
  };

  // Функция, устанавливающая дефолтное значение координат для метки
  window.setDefaultCoords = function () {
    mainPinElement.style.left = defaultCoords.x + 'px';
    mainPinElement.style.top = defaultCoords.y + 'px';
  };

  window.setDragAndDrop = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };


      // Если метка уходит за координату, то не пускать её туда.
      if (parseInt(mainPinElement.style.left, 10) > limits.right) {
        mainPinElement.style.left = limits.right + 'px';
      } else if (parseInt(mainPinElement.style.left, 10) < limits.left) {
        mainPinElement.style.left = limits.left + 'px';
      } else {
        mainPinElement.style.left = (mainPinElement.offsetLeft - shift.x) + 'px';
      }

      if (parseInt(mainPinElement.style.top, 10) < limits.top) {
        mainPinElement.style.top = limits.top + 'px';
      } else if (parseInt(mainPinElement.style.top, 10) > limits.bottom) {
        mainPinElement.style.top = limits.bottom + 'px';
      } else {
        mainPinElement.style.top = (mainPinElement.offsetTop - shift.y) + 'px';
      }

      window.fillAddress(true);
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

})();
