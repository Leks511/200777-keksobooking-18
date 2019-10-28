'use strict';

// ОСТАЛОСЬ ДОПИСАТЬ ВАЛИДАЦИЮ КОЛИЧЕСТВА КОМНАТ И КОЛИЧЕСТВА МЕСТ ПРИ ОТПРАВКЕ!!!!

(function () {
  var minPrices = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var adFormElement = document.querySelector('.ad-form');
  var roomsElement = adFormElement.querySelector('#room_number');
  var guests = adFormElement.querySelectorAll('#capacity option');

  var typeElement = adFormElement.querySelector('#type');
  var priceElement = adFormElement.querySelector('#price');

  var timeinElement = adFormElement.querySelector('#timein');
  var timeoutElement = adFormElement.querySelector('#timeout');

  // Функция, добавляющая disabled недоступному полю
  function setDisable(element) {
    element.setAttribute('disabled', 'disabled');
  }

  // Функция обработки изменений полей гостей и комнат
  function handleRoomsGeustsChecking(rooms) {
    // Уберём disabled у всех элементов для того, чтобы после добавить в соответствии с изменённым значением
    guests.forEach(function (option) {
      option.removeAttribute('disabled');
    });

    if (rooms === 100) {
      for (var i = 0; i < guests.length; i++) {
        if (parseInt(guests[i].value, 10) > 0) {
          setDisable(guests[i]);
        }
      }
    } else {
      setDisable(guests[guests.length - 1]);

      for (var j = 0; j < guests.length; j++) {
        if (parseInt(guests[j].value, 10) > rooms) {
          setDisable(guests[j]);
        }
      }
    }
  }

  // Обработка гостей и комнат по изменению значения
  roomsElement.addEventListener('change', function () {
    roomsElement.setCustomValidity('');

    var roomsQuantity = parseInt(roomsElement.value, 10);

    handleRoomsGeustsChecking(roomsQuantity);
  });

  // При изменении поля "Тип" задаётся соответствующее минимальное значение для поля "Цена за ночь"
  typeElement.addEventListener('change', function () {
    if (typeElement.value === 'bungalo') {
      priceElement.setAttribute('min', minPrices.BUNGALO);
    }

    if (typeElement.value === 'flat') {
      priceElement.setAttribute('min', minPrices.FLAT);
    }

    if (typeElement.value === 'house') {
      priceElement.setAttribute('min', minPrices.HOUSE);
    }

    if (typeElement.value === 'palace') {
      priceElement.setAttribute('min', minPrices.PALACE);
    }
  });

  // Функция, задающая аналогичное значение элементу въезда/выезда
  function equalizeTimeValue(element1, element2) {
    element2.value = element1.value;
  }

  // Синхронизуем поля даты въезда/выезда
  timeinElement.addEventListener('change', function () {
    equalizeTimeValue(timeinElement, timeoutElement);
  });
  timeoutElement.addEventListener('change', function () {
    equalizeTimeValue(timeoutElement, timeinElement);
  });

})();
