'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var errorMessageElement = document.querySelector('#error').content.querySelector('.error');

  var tryAgainButton;
  var errorMessageTextElement;

  // Убрать обработчики событий для закрытия окна с ошибкой
  function removeOnErrorMessageListeners() {
    tryAgainButton.removeEventListener('click', onTryAgainButtonClick);
    tryAgainButton.removeEventListener('click', onTryAgainButtonEnterPress);
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
    if (evt.keyCode === window.code.ESC) {
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
    if (evt.keyCode === window.code.ENTER) {
      removeErrorMessage();
    }
  }

  // Функция показа окна с ошибкой при отправке
  window.showError = function () {
    mapElement.appendChild(errorMessageElement);

    tryAgainButton = document.querySelector('.error__button');
    errorMessageTextElement = document.querySelector('.error__message');

    tryAgainButton.addEventListener('click', onTryAgainButtonClick);
    tryAgainButton.addEventListener('click', onTryAgainButtonEnterPress);
    document.addEventListener('keydown', onErrorPopupEscPress);
    document.addEventListener('click', onErrorPopupClick);
  };
})();

