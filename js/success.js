'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mainPinElement = document.querySelector('.map__pin--main');
  var successPopupElement = document.querySelector('#success').content.querySelector('.success');
  var adFormElements = document.querySelectorAll('#title, #price');

  var successMessageTextElement;

  // Функция скрытия сообщения об успешном отправлении формы
  function removeSuccessPopup() {
    successPopupElement.remove();

    document.removeEventListener('click', removeSuccessPopup);
    document.removeEventListener('keydown', onSuccessPopupKeyPress);
  }

  // Обработчик нажатия ESC при открытом сообщении об успехе отправления формы
  function onSuccessPopupKeyPress(evt) {
    if (evt.keyCode === window.code.ESC) {
      removeSuccessPopup();
    }
  }

  function onSuccessPopupClick(evt) {
    if (evt.target !== successMessageTextElement) {
      removeSuccessPopup();
    }
  }

  // Функция показа сообщения об успешном отправлении формы
  function showSuccessPopup() {
    mapElement.appendChild(successPopupElement);

    successMessageTextElement = document.querySelector('.success__message');

    document.addEventListener('click', onSuccessPopupClick);
    document.addEventListener('keydown', onSuccessPopupKeyPress);
  }

  // Функция приведения SPA в изначальное состояние
  window.regainSPA = function () {
    adFormElements.forEach(function (it) {
      it.value = '';
    });
    window.clear();
    window.setDeafultFilterValues();
    window.disableInterface();
    window.setDefaultCoords();
    window.fillAddress(false);
    mainPinElement.removeEventListener('mousedown', window.setDranAndDrop);

    showSuccessPopup();
  };
})();
