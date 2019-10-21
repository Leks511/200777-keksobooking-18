'use strict';

(function () {
  var adFormElement = document.querySelector('.ad-form');
  var roomsElement = document.querySelector('#room_number');
  var guestsElement = document.querySelector('#capacity');

  // Функция обработки изменений полей гостей и комнат
  function handleRoomsGeustsChecking(evt) {
    var roomsValue = roomsElement.value;
    var guestsValue = guestsElement.value;

    if (roomsValue !== guestsValue) {
      evt.preventDefault();

      roomsElement.setCustomValidity('Количество гостей должно соответствовать количеству комнат');
    } else {
      roomsElement.setCustomValidity('');
    }
  }

  // Обработка гостей и комнат по изменению значения
  roomsElement.addEventListener('change', function () {
    roomsElement.setCustomValidity('');
  });

  // Обработка гостей и комнат по изменению значения
  guestsElement.addEventListener('change', function () {
    roomsElement.setCustomValidity('');
  });

  // Обработка гостей и комнат по отправке формы
  adFormElement.addEventListener('submit', function (evt) {
    handleRoomsGeustsChecking(evt);
  });
})();
