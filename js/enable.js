'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var adFormElement = document.querySelector('.ad-form');
  var mapElement = document.querySelector('.map');
  var filterElements = document.querySelectorAll('.ad-form input, .ad-form select, .map__filters input, .map__filters select, #description');

  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

  // функция - обработчик ошибки
  function handleLoadError(errorMessage) {
    var errorMessageElement = errorMessageTemplate.cloneNode(true);
    errorMessageElement.querySelector('.error__message').textContent = errorMessage;
    mainElement.appendChild(errorMessageElement);
  }

  function handleLoadSuccess(data) {
    // Сохраним сразу в глобальную область видимости все объявления для последующего использования при сортировке
    window.advertisements = data;
    // Отдадим на рендеринг копию, которую получили при включении интерфейса
    window.render(data);
  }

  // Функции включения интерфейса
  window.enableInterface = function () {
    mapElement.classList.remove('map--faded');
    adFormElement.classList.remove('ad-form--disabled');

    filterElements.forEach(function (it) {
      it.removeAttribute('disabled');
    });

    // При включении интерфейса получаем данные с сервера и запускаем рендеринг пинов при успехе, при ошибке - обработчик ошибки
    window.backend.load(handleLoadSuccess, handleLoadError);
  };
})();
