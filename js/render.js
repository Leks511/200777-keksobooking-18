'use strict';

(function () {
  var advertisements = [];
  var pinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinsListElement = document.querySelector('.map__pins');

  function createPinElement(advertise) {
    var pin = pinTemplateElement.cloneNode(true);

    pin.style = 'left: ' + advertise.location.x + 'px; top: ' + advertise.location.y + 'px;';
    pin.src = advertise.author.avatar;
    pin.alt = advertise.offer.title;

    return pin;
  }

  window.render = function (data) {
    advertisements = data;

    var fragmentForPins = new DocumentFragment();

    for (var i = 0; i < advertisements.length; i++) {
      fragmentForPins.appendChild(createPinElement(advertisements[i]));
    }

    mapPinsListElement.appendChild(fragmentForPins);
  }
})();
