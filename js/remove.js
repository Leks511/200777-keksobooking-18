'use strict';

(function() {
  // Функция, удаляющая неглавные пины
  window.removePins = function () {
    var mapPinsList = document.querySelectorAll('.map__pin');

    mapPinsList.forEach(function (pin) {
      if (!(pin.classList.contains('map__pin--main'))) {
        pin.remove();
      }
    });
  };

  // Функция, удаляющая popup с карты
  window.removePopup = function () {
    var popup = document.querySelector('.map__card');
    if (popup) {
      popup.remove();
    }
  }
})();

