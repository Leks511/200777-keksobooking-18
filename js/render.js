/* eslint-disable no-unused-vars */
'use strict';

(function () {
  var advertisements = [];
  var pinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinsListElement = document.querySelector('.map__pins');
  var QUANITITY_TO_RENDER;

  // Функция, создающая пин на карте
  function createPinElement(advertise) {
    var pin = pinTemplateElement.cloneNode(true);

    pin.style = 'left: ' + advertise.location.x + 'px; top: ' + advertise.location.y + 'px;';
    pin.src = advertise.author.avatar;
    pin.alt = advertise.offer.title;

    return pin;
  }

  window.render = function (data) {
    advertisements = data;
    QUANITITY_TO_RENDER = 5;

    var fragmentForPins = new DocumentFragment();

    for (var i = 0; i < QUANITITY_TO_RENDER; i++) {
      fragmentForPins.appendChild(createPinElement(advertisements[i]));
    }

    mapPinsListElement.appendChild(fragmentForPins);
  }
})();
