'use strict';

(function () {
  var minPrices = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var adFormElement = document.querySelector('.ad-form');
  var roomsElement = adFormElement.querySelector('#room_number');

  var guestsSelectElement = adFormElement.querySelector('#capacity');
  var guestsOptionElements = adFormElement.querySelectorAll('#capacity option');

  var typeElement = adFormElement.querySelector('#type');
  var priceElement = adFormElement.querySelector('#price');

  var timeinElement = adFormElement.querySelector('#timein');
  var timeoutElement = adFormElement.querySelector('#timeout');


  var roomsQuantity = parseInt(roomsElement.value, 10);

  // Функция, задающая аналогичное значение элементу въезда/выезда
  function equalizeTimeValue(element1, element2) {
    element2.value = element1.value;
  }

  // Функция обработки изменений полей гостей и комнат
  function handleRoomsGeustsChecking(rooms) {
    // В селект с гостями добавим изначальный набор для дальнейшей сортировки, перед этим очистив от результатов прошлой
    guestsSelectElement.innerHTML = '';
    guestsOptionElements.forEach(function (it) {
      guestsSelectElement.appendChild(it);
    });

    // Найдём вновь добавленные элементы внутри селекта и начнём их обрабатывать
    var addedGuestsOptionElements = guestsSelectElement.querySelectorAll('option');

    if (parseInt(rooms, 10) === 100) {
      for (var i = 0; i < addedGuestsOptionElements.length; i++) {
        if (parseInt(addedGuestsOptionElements[i].value, 10) > 0) {
          addedGuestsOptionElements[i].remove();
        }
      }
    } else {
      addedGuestsOptionElements[addedGuestsOptionElements.length - 1].remove();

      for (var j = 0; j < addedGuestsOptionElements.length; j++) {
        if (parseInt(addedGuestsOptionElements[j].value, 10) > rooms) {
          addedGuestsOptionElements[j].remove();
        }
      }
    }
  }

  // Обработка гостей и комнат по изменению значения
  roomsElement.addEventListener('change', function (evt) {
    roomsElement.setCustomValidity('');

    handleRoomsGeustsChecking(evt.target.value);
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

  // Синхронизуем поля даты въезда/выезда
  timeinElement.addEventListener('change', function () {
    equalizeTimeValue(timeinElement, timeoutElement);
  });
  timeoutElement.addEventListener('change', function () {
    equalizeTimeValue(timeoutElement, timeinElement);
  });

  // Вызовем проверку сразу
  handleRoomsGeustsChecking(roomsQuantity);

  adFormElement.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function (response) {

    });
    evt.preventDefault();
  });
})();
