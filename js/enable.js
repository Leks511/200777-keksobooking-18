'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var mainMapPinElement = document.querySelector('.map__pin--main');
  var applicationMapElement = document.querySelector('.map');
  var formAddingYourAdvertise = document.querySelector('.ad-form');

  // Все фиелдсеты формы добавления объявления
  var formAddingAdvertiseFieldsets = formAddingYourAdvertise.querySelectorAll('fieldset');
  var mapFilters = formWithMapFilters.querySelectorAll('fieldset, select');

  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

  // функция - обработчик ошибки
  function handleLoadError(errorMessage) {
    var errorMessageElement = errorMessageTemplate.cloneNode(true);
    errorMessageElement.querySelector('.error__message').textContent = errorMessage;
    mainElement.appendChild(errorMessageElement);
  }

  // Функция для удаления disabled со списка элементов
  function removeDisabledAttributeFromFormElements(elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }
  }

  // функция для активации интерфейса
  function enableApplicationInterface() {
    applicationMapElement.classList.remove('map--faded');
    formAddingYourAdvertise.classList.remove('ad-form--disabled');


    // При включении интерфейса получаем данные с сервера и запускаем рендеринг пинов при успехе, при ошибке - обработчик ошибки
    window.backend.load(window.render, handleLoadError);

    // Активируем формы сортировки
    removeDisabledAttributeFromFormElements(formAddingAdvertiseFieldsets);
    removeDisabledAttributeFromFormElements(mapFiltersFormSelectsAndFieldset);
  }

  // Прослушка активации SPA при нажатии на главный пин
  mainMapPinElement.addEventListener('mousedown', function () {
    enableApplicationInterface();
  });

  mainMapPinElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      enableApplicationInterface();
    }
  });
})();
