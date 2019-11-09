'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var errorMessageElement = document.querySelector('#error').content.querySelector('.error');

  var tryAgainButtonElement;
  var errorMessageTextElement;

  // Убрать обработчики событий для закрытия окна с ошибкой
  function removeOnErrorMessageListeners() {
    tryAgainButtonElement.removeEventListener('click', onTryAgainButtonClick);
    tryAgainButtonElement.removeEventListener('click', onTryAgainButtonEnterPress);
    document.removeEventListener('keydown', onErrorPopupEscPress);
  }

  // Функция, закрывающая окно с ошибкой
  function removeErrorMessage() {
    errorMessageElement.remove();
    removeOnErrorMessageListeners();
  }

  function onErrorPopupClick(evt) {
    if (evt.target !== errorMessageTextElement) {
      removeErrorMessage();
    }
  }

  function onErrorPopupEscPress(evt) {
    if (evt.keyCode === window.Codes.ESC) {
      removeErrorMessage();
    }
  }

  // Функция, закрывающая окно с ошибкой
  function onTryAgainButtonClick(evt) {
    evt.preventDefault();
    removeErrorMessage();
  }

  // Функция, закрывающая окно с ошибкой
  function onTryAgainButtonEnterPress(evt) {
    if (evt.keyCode === window.Codes.ENTER) {
      removeErrorMessage();
    }
  }

  // Функция показа окна с ошибкой при отправке
  window.showError = function () {
    mapElement.appendChild(errorMessageElement);

    tryAgainButtonElement = document.querySelector('.error__button');
    errorMessageTextElement = document.querySelector('.error__message');

    tryAgainButtonElement.addEventListener('click', onTryAgainButtonClick);
    tryAgainButtonElement.addEventListener('click', onTryAgainButtonEnterPress);
    document.addEventListener('keydown', onErrorPopupEscPress);
    document.addEventListener('click', onErrorPopupClick);
  };
})();

