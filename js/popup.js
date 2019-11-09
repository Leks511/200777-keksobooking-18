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
    }

    return 'Дворец';
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

    return fragmentForPhotos;
  }

  function checkExsistance(data) {
    if (data) {
      return data;
    }

    return undefined;
  }

  function formatePrice(data) {
    if (data) {
      return data.toString() + '₽/ночь';
    }

    return undefined;
  }

  function formateCapacity(rooms, guests) {
    if (rooms && guests) {
      return rooms.toString() + ' комнаты для ' + guests.toString() + ' гостей';
    }

    return undefined;
  }

  function formateTime(checkin, checkout) {
    if (checkin && checkout) {
      return 'Заезд после ' + checkin.toString() + ', выезд до ' + checkout.toString();
    }

    return undefined;
  }

  // Нужно добавить соответствующую feature в соответствующий элемент с одноимённым по модификатору классом

  function formateFeatures(features, featuresListElement) {
    featuresListElement.innerHTML = '';

    if (features.length) {
      var featuresFragment = new DocumentFragment();
      // Возьмём в текстовом формате каждое feature
      features.forEach(function (it) {
        var featureListItem = document.createElement('li');
        featureListItem.classList.add('popup__feature', 'popup__feature--' + it);
        featureListItem.textContent = it;
        featuresFragment.appendChild(featureListItem);
      });

      featuresListElement.appendChild(featuresFragment);

      return featuresListElement;
    }

    return undefined;
  }

  window.createPopup = function (advertise) {
    var popup = popupTemplateElement.cloneNode(true);

    var popupOfferElements = {
      title: popup.querySelector('.popup__title'),
      address: popup.querySelector('.popup__text--address'),
      price: popup.querySelector('.popup__text--price'),
      type: popup.querySelector('.popup__type'),
      capacity: popup.querySelector('.popup__text--capacity'),
      time: popup.querySelector('.popup__text--time'),
      features: popup.querySelector('.popup__features'),
      description: popup.querySelector('.popup__description'),
      images: popup.querySelector('.popup__photos')
    };

    popupOfferElements.title.textContent = checkExsistance(advertise.offer.title);

    popupOfferElements.address.textContent = checkExsistance(advertise.offer.address);

    popupOfferElements.price.textContent = formatePrice(checkExsistance(advertise.offer.price));

    popupOfferElements.type.textContent = getHousingType(checkExsistance(advertise.offer.type));

    popupOfferElements.capacity.textContent = formateCapacity(checkExsistance(advertise.offer.rooms), checkExsistance(advertise.offer.guests));

    popupOfferElements.time.textContent = formateTime(advertise.offer.checkin, advertise.offer.checkout);





    formateFeatures(checkExsistance(advertise.offer.features), popupOfferElements.features);





    popupOfferElements.description.textContent = checkExsistance(advertise.offer.description);

    popupOfferElements.images.appendChild(setImages(popupOfferElements.images, checkExsistance(advertise.offer.photos)));

    for (var prop in popupOfferElements) {
      if (popupOfferElements[prop].innerHTML === '' || popupOfferElements[prop].textContent === '') {
        popupOfferElements[prop].remove();
      }
    }

    popup.querySelector('.popup__avatar').setAttribute('src', advertise.author.avatar);

    return popup;
  };
})();
