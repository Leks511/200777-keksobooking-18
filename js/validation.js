'use strict';

(function () {
  var MinPrices = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var BIG_QUANTITY_OF_GUESTS = 100;

  var adFormElement = document.querySelector('.ad-form');

  var FormElements = {
    title: adFormElement.querySelector('#title'),
    rooms: adFormElement.querySelector('#room_number'),
    guestsSelect: adFormElement.querySelector('#capacity'),
    guestsOptions: adFormElement.querySelectorAll('#capacity option'),
    type: adFormElement.querySelector('#type'),
    price: adFormElement.querySelector('#price'),
    timein: adFormElement.querySelector('#timein'),
    timeout: adFormElement.querySelector('#timeout')
  };

  var roomsQuantity = parseInt(FormElements.rooms.value, 10);

  // Функция, изменяющая атрибуты поля "Цена за ночь" в adForm
  function changePriceElement(typeValue) {
    FormElements.price.setAttribute('min', typeValue);
    FormElements.price.setAttribute('placeholder', typeValue);
  }

  // Функция, проверяющая тип жилья в объявлении
  window.checkTypeOfHousing = function () {
    if (FormElements.type.value === 'bungalo') {
      changePriceElement(MinPrices.BUNGALO);
    }

    if (FormElements.type.value === 'flat') {
      changePriceElement(MinPrices.FLAT);
    }

    if (FormElements.type.value === 'house') {
      changePriceElement(MinPrices.HOUSE);
    }

    if (FormElements.type.value === 'palace') {
      changePriceElement(MinPrices.PALACE);
    }
  };

  // Функция - обработчик изменения типа жилья
  function onFormElementsTypeChange() {
    window.checkTypeOfHousing();
  }

  // Функция, выполняемая при успешной отправке формы
  function handleSuccessSubmit() {
    window.regainSPA();
    window.showSuccessPopup();
  }

  // Функция, задающая аналогичное значение элементу въезда/выезда
  function equalizeTimeValue(element1, element2) {
    element2.value = element1.value;
  }

  // Функция обработки изменений полей гостей и комнат
  function handleRoomsGeustsChecking(rooms) {
    // В селект с гостями добавим изначальный набор для дальнейшей сортировки, перед этим очистив от результатов прошлой
    FormElements.guestsSelect.innerHTML = '';
    FormElements.guestsOptions.forEach(function (it) {
      FormElements.guestsSelect.appendChild(it);
    });

    // Найдём вновь добавленные элементы внутри селекта и начнём их обрабатывать
    var addedGuestsOptionElements = FormElements.guestsSelect.querySelectorAll('option');

    if (parseInt(rooms, 10) === BIG_QUANTITY_OF_GUESTS) {
      addedGuestsOptionElements.forEach(function (it) {
        if (parseInt(it.value, 10) > 0) {
          it.remove();
        }
      });
    } else {
      addedGuestsOptionElements[addedGuestsOptionElements.length - 1].remove();

      addedGuestsOptionElements.forEach(function (it) {
        if (parseInt(it.value, 10) > rooms) {
          it.remove();
        }
      });
    }
  }

  // Обработка гостей и комнат по изменению значения
  FormElements.rooms.addEventListener('change', function (evt) {
    handleRoomsGeustsChecking(evt.target.value);
  });

  // При изменении поля "Тип" задаётся соответствующее минимальное значение для поля "Цена за ночь"
  FormElements.type.addEventListener('change', onFormElementsTypeChange);

  // Синхронизуем поля даты въезда/выезда
  FormElements.timein.addEventListener('change', function () {
    equalizeTimeValue(FormElements.timein, FormElements.timeout);
  });
  FormElements.timeout.addEventListener('change', function () {
    equalizeTimeValue(FormElements.timeout, FormElements.timein);
  });

  adFormElement.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(adFormElement), handleSuccessSubmit, window.showError);

    evt.preventDefault();
  });

  // Вызовем проверку сразу
  handleRoomsGeustsChecking(roomsQuantity);
  window.checkTypeOfHousing();
})();
