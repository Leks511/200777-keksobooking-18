'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mainMapPinElement = document.querySelector('.map__pin--main');

  var limits = {
    top: 130,
    right: mapElement.offsetWidth - mainMapPinElement.offsetWidth / 2,
    bottom: 630,
    left: 0 - mainMapPinElement.offsetWidth / 2
  };

  mainMapPinElement.addEventListener('mousedown', function (evt) {
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
      if (parseInt(mainMapPinElement.style.left, 10) > limits.right) {
        mainMapPinElement.style.left = limits.right + 'px';
      } else if (parseInt(mainMapPinElement.style.left, 10) < limits.left) {
        mainMapPinElement.style.left = limits.left + 'px';
      } else {
        mainMapPinElement.style.left = (mainMapPinElement.offsetLeft - shift.x) + 'px';
      }

      if (parseInt(mainMapPinElement.style.top, 10) < limits.top) {
        mainMapPinElement.style.top = limits.top + 'px';
      } else if (parseInt(mainMapPinElement.style.top, 10) > limits.bottom) {
        mainMapPinElement.style.top = limits.bottom + 'px';
      } else {
        mainMapPinElement.style.top = (mainMapPinElement.offsetTop - shift.y) + 'px';
      }

      window.fillAddress(true);
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
