'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mainPinElement = document.querySelector('.map__pin--main');

  var Limits = {
    TOP: 130 - 80,
    RIGHT: mapElement.offsetWidth - mainPinElement.offsetWidth / 2,
    BOTTOM: 630 - 82,
    LEFT: 0 - mainPinElement.offsetWidth / 2
  };

  function Coordinate(x, y) {
    this.x = x;
    this.y = y;
  }

  var defaultCoords = new Coordinate(mainPinElement.offsetLeft, mainPinElement.offsetTop);

  // Функция, устанавливающая дефолтное значение координат для метки
  window.setDefaultCoords = function () {
    mainPinElement.style.left = defaultCoords.x + 'px';
    mainPinElement.style.top = defaultCoords.y + 'px';
  };

  function setDragAndDrop(evt) {
    evt.preventDefault();

    var startCoords = new Coordinate(evt.clientX, evt.clientY);

    function onMouseMove(moveEvt) {

      var shift = new Coordinate(startCoords.x - moveEvt.clientX, startCoords.y - moveEvt.clientY);

      startCoords = new Coordinate(moveEvt.clientX, moveEvt.clientY);

      // Если метка уходит за координату, то не пускать её туда.
      if (parseInt(mainPinElement.style.left, 10) > Limits.RIGHT) {
        mainPinElement.style.left = Limits.RIGHT + 'px';
      } else if (parseInt(mainPinElement.style.left, 10) < Limits.LEFT) {
        mainPinElement.style.left = Limits.LEFT + 'px';
      } else {
        mainPinElement.style.left = (mainPinElement.offsetLeft - shift.x) + 'px';
      }

      if (parseInt(mainPinElement.style.top, 10) < Limits.TOP) {
        mainPinElement.style.top = Limits.TOP + 'px';
      } else if (parseInt(mainPinElement.style.top, 10) > Limits.BOTTOM) {
        mainPinElement.style.top = Limits.BOTTOM + 'px';
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
  }

  // Добавим Drag'n'Drop
  mainPinElement.addEventListener('mousedown', setDragAndDrop);

})();
