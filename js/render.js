/* eslint-disable no-unused-vars */
'use strict';

(function () {
  var pinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinsListElement = document.querySelector('.map__pins');

  // Функция, удаляющая неглавные пины
  window.removePins = function () {
    var mapPinsList = document.querySelectorAll('.map__pin');

    mapPinsList.forEach(function (pin) {
      if (!(pin.classList.contains('map__pin--main'))) {
        pin.remove();
      }
    });
  };

  // Функция, создающая пин на карте
  function createPinElement(advertise) {
    var pin = pinTemplateElement.cloneNode(true);

    pin.style = 'left: ' + advertise.location.x + 'px; top: ' + advertise.location.y + 'px;';
    pin.src = advertise.author.avatar;
    pin.alt = advertise.offer.title;

    return pin;
  }

  window.render = function (data) {
    var fragmentForPins = new DocumentFragment();
    var takeNumber = data.length > 5 ? 5 : data.length;

    for (var i = 0; i < takeNumber; i++) {
      fragmentForPins.appendChild(createPinElement(data[i]));
    }

    mapPinsListElement.appendChild(fragmentForPins);

  };
})();
