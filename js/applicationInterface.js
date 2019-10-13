'use strict';

(function () {
  // Данные для включения интерфейса
  var main = document.querySelector('main');
  var applicationMap = document.querySelector('.map');
  var formAddingYourAdvertise = document.querySelector('.ad-form');
  var fieldsetsFromFormAddingYourAdvertise = formAddingYourAdvertise.querySelectorAll('fieldset');
  var mainMapPin = document.querySelector('.map__pin--main');
  var formWithMapFilters = document.querySelector('.map__filters');
  var mapFiltersFormSelectsAndFieldset = formWithMapFilters.querySelectorAll('fieldset, select');
  // Данные для добавления пинов после включения интерфейса
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinsList = document.querySelector('.map__pins');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');


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


    // При включении интерфейса получаем данные с сервера и запускаем рендеринг пинов при успехе, при ошибке - обработчик ошибки
    window.backend.load(createPins, handleLoadError);

    // Активируем формы сортировки
    removeDisabledAttributeFromFormElements(fieldsetsFromFormAddingYourAdvertise);
    removeDisabledAttributeFromFormElements(mapFiltersFormSelectsAndFieldset);
  }

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

  // функция - обработчик ошибки
  function handleLoadError(errorMessage) {
    var elementWithErrorText = errorMessageTemplate.cloneNode(true);
    elementWithErrorText.querySelector('.error__message').textContent = errorMessage;
    main.appendChild(elementWithErrorText);
  }

  // Прослушка активации SPA при нажатии на главный пин

  mainMapPin.addEventListener('mousedown', function () {
    activateApplicationInterface();
  });

  mainMapPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      activateApplicationInterface();
    }
  });

  // Изначально интерфейс отключен. Запустим сразу функцию, отключающую интерфейс
  inactivateApplicationInterface();
})();


