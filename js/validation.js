'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var roomsQuantitySelect = adForm.querySelector('#room_number');
  var guestsQuantitySelect = adForm.querySelector('#capacity');

  function onAdFormRoomsGuestsChecking(evt) {
    var roomsQuantityValue = roomsQuantitySelect.value;
    var guestsQuantityValue = guestsQuantitySelect.value;

    if (roomsQuantityValue !== guestsQuantityValue) {
      evt.preventDefault();

      roomsQuantitySelect.setCustomValidity('Количество гостей должно соответствовать количеству комнат');

    } else {
      roomsQuantitySelect.setCustomValidity('');
    }
  }

  adForm.addEventListener('submit', function (evt) {
    onAdFormRoomsGuestsChecking(evt);
  });

  roomsQuantitySelect.addEventListener('change', function () {
    roomsQuantitySelect.setCustomValidity('');
  });

  guestsQuantitySelect.addEventListener('change', function () {
    roomsQuantitySelect.setCustomValidity('');
  });
})();
