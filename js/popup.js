'use strict';

(function () {
  var popupTemplateElement = document.querySelector('#card').content.querySelector('.popup');
  var imgExampleElement = popupTemplateElement.querySelector('.popup__photos img');

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

  function createImgElement(address) {
    var imgElement = imgExampleElement.cloneNode(true);
    imgElement.setAttribute('src', address);
    return imgElement;
  }

  function setImages(listElement, photosList) {
    var fragmentForPhotos = new DocumentFragment();
    listElement.innerHTML = '';

    // Наполняем фрагмент изображениями
    photosList.forEach(function (srcAddress) {
      fragmentForPhotos.appendChild(createImgElement(srcAddress));
    });

    listElement.appendChild(fragmentForPhotos);
  }

  window.createPopup = function (advertise) {
    var popup = popupTemplateElement.cloneNode(true);
    var popupPhotosElement = popup.querySelector('.popup__photos');

    // Наполняем карточку объявления информацией с объекта объявления

    popup.querySelector('.popup__title').textContent = advertise.offer.title;

    popup.querySelector('.popup__text--address').textContent = advertise.offer.address;

    popup.querySelector('.popup__text--price').textContent = advertise.offer.price.toString() + '₽/ночь';

    popup.querySelector('.popup__type').textContent = getHousingType(advertise.offer.type);

    popup.querySelector('.popup__text--capacity').textContent = advertise.offer.rooms.toString() + ' комнаты для ' + advertise.offer.guests.toString() + ' гостей';

    popup.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertise.offer.checkin.toString() + ', выезд до ' + advertise.offer.checkout.toString();

    popup.querySelector('.popup__features').textContent = advertise.offer.features.join(', ');

    popup.querySelector('.popup__description').textContent = advertise.offer.description;

    setImages(popupPhotosElement, advertise.offer.photos);

    popup.querySelector('.popup__avatar').setAttribute('src', advertise.author.avatar);

    return popup;
  };
})();
