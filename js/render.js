'use strict';

(function () {
  var mainElement = document.querySelector('.map');
  var filterBlockElement = document.querySelector('.map__filters-container');
  var pinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinsListElement = document.querySelector('.map__pins');

  // Функция, создающая пин на карте
  function createPinElement(advertise) {
    var pin = pinTemplateElement.cloneNode(true);

    pin.style = 'left: ' + advertise.location.x + 'px; top: ' + advertise.location.y + 'px;';
    pin.src = advertise.author.avatar;
    pin.alt = advertise.offer.title;

    return pin;
  }

  // Функция, наполняющая пинами карту
  window.render = function (data) {

    // Если в переданных данных что-то лежит, то отправим это на рендеринг
    if (data) {
      var pinsFragment = new DocumentFragment();
      var popupFragment = new DocumentFragment();
      var quantityOfAdvertisementsOnMap = data.length > 5 ? 5 : data.length;

      for (var i = 0; i < quantityOfAdvertisementsOnMap; i++) {
        // Если в объекте объявления есть поле offer, то отрендерим
        if (data[i].offer) {
          pinsFragment.appendChild(createPinElement(data[i]));
          popupFragment.appendChild(window.createPopup(data[i]));
        } else {
          continue;
        }
      }

      // Выведем в DOM popup'ы на основе данных полученных на рендеринг

      mapPinsListElement.appendChild(pinsFragment);
      mainElement.insertBefore(popupFragment, filterBlockElement);
      window.setMapInterface();
    }
  };
})();
