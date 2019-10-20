'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var roomsQuantitySelectElement = adForm.querySelector('#room_number');
  var guestsQuantitySelectElement = adForm.querySelector('#capacity');

  // Функция обработки изменений полей гостей и комнат
  function handleRoomsGeustsChecking(evt) {
    var roomsQuantityValue = roomsQuantitySelectElement.value;
    var guestsQuantityValue = guestsQuantitySelectElement.value;

    if (roomsQuantityValue !== guestsQuantityValue) {
      evt.preventDefault();

      roomsQuantitySelectElement.setCustomValidity('Количество гостей должно соответствовать количеству комнат');

    } else {
      roomsQuantitySelectElement.setCustomValidity('');
    }
  }

  // Обработка гостей и комнат по изменению значения
  roomsQuantitySelectElement.addEventListener('change', function () {
    roomsQuantitySelectElement.setCustomValidity('');
  });

  // Обработка гостей и комнат по изменению значения
  guestsQuantitySelectElement.addEventListener('change', function () {
    roomsQuantitySelectElement.setCustomValidity('');
  });

  // Обработка гостей и комнат по отправке формы
  adForm.addEventListener('submit', function (evt) {
    handleRoomsGeustsChecking(evt);
  });
})();
