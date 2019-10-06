'use strict';

(function () {
  // Данные для включения интерфейса
  var applicationMap = document.querySelector('.map');
  var formAddingYourAdvertise = document.querySelector('.ad-form');
  var fieldsetsFromFormAddingYourAdvertise = formAddingYourAdvertise.querySelectorAll('fieldset');
  var mainMapPin = document.querySelector('.map__pin--main');
  var formWithMapFilters = document.querySelector('.map__filters');
  var mapFiltersFormSelectsAndFieldset = formWithMapFilters.querySelectorAll('fieldset, select');

  // Данные для добавления пинов после включения интерфейса
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinsList = document.querySelector('.map__pins');

  var typesList = ['palace', 'flat', 'house', 'bungalo'];
  var checkinsList = ['12:00', '13:00', '14:00'];
  var checkoutsList = ['12:00', '13:00', '14:00'];
  var photosList = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var featuresList = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var advertisementsList = createAdvertisementsList();

  // Функции для включения/выключения интерфейса

  function setDisabledAttributeToFormElements(elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', 'disabled');
    }
  }

  function removeDisabledAttributeFromFormElements(elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }
  }

  function inactivateApplicationInterface() {
    applicationMap.classList.add('map--faded');
    formAddingYourAdvertise.classList.add('ad-form--disabled');

    setDisabledAttributeToFormElements(fieldsetsFromFormAddingYourAdvertise);
    setDisabledAttributeToFormElements(mapFiltersFormSelectsAndFieldset);
  }

  function activateApplicationInterface() {
    applicationMap.classList.remove('map--faded');
    formAddingYourAdvertise.classList.remove('ad-form--disabled');

    // При включении интерфейса запускаем функцию рендеринга пинов на карте
    createPins(advertisementsList);

    removeDisabledAttributeFromFormElements(fieldsetsFromFormAddingYourAdvertise);
    removeDisabledAttributeFromFormElements(mapFiltersFormSelectsAndFieldset);
  }

  mainMapPin.addEventListener('mousedown', function () {
    activateApplicationInterface();
  });

  mainMapPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      activateApplicationInterface();
    }
  });

  // Функции для отрисовки пинов на странице
  function createPinElement(pin) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px;';
    pinElement.src = pin.author.avatar;
    pinElement.alt = pin.offer.title;

    return pinElement;
  }

  function createPins(advertisements) {
    var fragmentForPins = new DocumentFragment();

    for (var i = 0; i < advertisements.length; i++) {
      fragmentForPins.appendChild(createPinElement(advertisements[i]));
    }

    mapPinsList.appendChild(fragmentForPins);
  }

  function createAdvertisementsList() {
    var list = [];

    for (var i = 0; i < 8; i++) {
      list[i] = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },
        'offer': {
          'title': 'Заголовок ' + (i + 1),
          'address': '600, 350',
          'price': window.util.getRandomNumber(100, 500),
          'type': window.util.createRandomArray(typesList),
          'rooms': window.util.getRandomNumber(1, 7),
          'guests': window.util.getRandomNumber(1, 12),
          'checkin': window.util.createRandomArray(checkinsList),
          'checkout': window.util.createRandomArray(checkoutsList),
          'features': window.util.createRandomArray(featuresList),
          'description': 'Здесь будет описание',
          'photos': window.util.createRandomArray(photosList)
        },
        'location': {
          'x': window.util.getRandomNumber(0, 1200),
          'y': window.util.getRandomNumber(130, 630)
        }
      };
    }
    return list;
  }

  // Изначально интерфейс отключен. Запустим сразу функцию, отключающую интерфейс
  inactivateApplicationInterface();
})();


