'use strict';

(function () {
  var popupTemplateElement = document.querySelector('#card').content.querySelector('.popup');

  function getHousingType(housingType) {
    if (housingType === 'flat') {
      return 'Квартира';
    } else if (housingType === 'bungalo') {
      return 'Бунгало';
    } else if (housingType === 'house') {
      return 'Дом';
    } else {
      return 'Дворец';
    }
  }

  window.createPopup = function (advertise) {
    var popup = popupTemplateElement.cloneNode(true);

    popup.querySelector('.popup__title').textContent = advertise.offer.title;

    popup.querySelector('.popup__text--address').textContent = advertise.offer.address;

    popup.querySelector('.popup__text--price').textContent = advertise.offer.price.toString() + '₽/ночь';

    popup.querySelector('.popup__type').textContent = getHousingType(advertise.offer.type);

    popup.querySelector('.popup__text--capacity').textContent = advertise.offer.rooms.toString() + ' комнаты для ' + advertise.offer.guests.toString() + ' гостей';

    popup.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertise.offer.checkin.toString() + ', выезд до ' + advertise.offer.checkout.toString();

    popup.querySelector('.popup__features').textContent = advertise.offer.features.join(', ');

    popup.querySelector('.popup__description').textContent = advertise.offer.description;

    // Сделать массив изображений

    popup.querySelector('.popup__avatar').setAttribute('src', advertise.author.avatar);

    return popup;
  };
})();
