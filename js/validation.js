'use strict';

(function () {
  var minPrices = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var adFormElement = document.querySelector('.ad-form');

  var formElements = {
    title: adFormElement.querySelector('#title'),
    rooms: adFormElement.querySelector('#room_number'),
    guestsSelect: adFormElement.querySelector('#capacity'),
    guestsOptions: adFormElement.querySelectorAll('#capacity option'),
    type: adFormElement.querySelector('#type'),
    price: adFormElement.querySelector('#price'),
    timein: adFormElement.querySelector('#timein'),
    timeout: adFormElement.querySelector('#timeout')
  };

  var roomsQuantity = parseInt(formElements.rooms.value, 10);

  // Функция, задающая аналогичное значение элементу въезда/выезда
  function equalizeTimeValue(element1, element2) {
    element2.value = element1.value;
  }

  // Функция обработки изменений полей гостей и комнат
  function handleRoomsGeustsChecking(rooms) {
    // В селект с гостями добавим изначальный набор для дальнейшей сортировки, перед этим очистив от результатов прошлой
    formElements.guestsSelect.innerHTML = '';
    formElements.guestsOptions.forEach(function (it) {
      formElements.guestsSelect.appendChild(it);
    });

    // Найдём вновь добавленные элементы внутри селекта и начнём их обрабатывать
    var addedGuestsOptionElements = formElements.guestsSelect.querySelectorAll('option');

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
  formElements.rooms.addEventListener('change', function (evt) {
    handleRoomsGeustsChecking(evt.target.value);
  });

  // При изменении поля "Тип" задаётся соответствующее минимальное значение для поля "Цена за ночь"
  formElements.type.addEventListener('change', function () {
    if (formElements.type.value === 'bungalo') {
      formElements.price.setAttribute('min', minPrices.BUNGALO);
    }

    if (formElements.type.value === 'flat') {
      formElements.price.setAttribute('min', minPrices.FLAT);
    }

    if (formElements.type.value === 'house') {
      formElements.price.setAttribute('min', minPrices.HOUSE);
    }

    if (formElements.type.value === 'palace') {
      formElements.price.setAttribute('min', minPrices.PALACE);
    }
  });

  // Синхронизуем поля даты въезда/выезда
  formElements.timein.addEventListener('change', function () {
    equalizeTimeValue(formElements.timein, formElements.timeout);
  });
  formElements.timeout.addEventListener('change', function () {
    equalizeTimeValue(formElements.timeout, formElements.timein);
  });

  // Вызовем проверку сразу
  handleRoomsGeustsChecking(roomsQuantity);

  adFormElement.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(adFormElement), window.regainSPA);

    evt.preventDefault();
  });
})();
