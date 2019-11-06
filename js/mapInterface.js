'use strict';

(function () {
  window.setMapInterface = function () {
    var pins = document.querySelectorAll('.map__pin--added');
    var popups = document.querySelectorAll('.map__card');
    var closePopupButton;

    function disablePins() {
      pins.forEach(function (it) {
        it.classList.remove('map__pin--active');
      });
    }

    function setActiveToPin(pin) {
      pin.classList.add('map__pin--active');
    }

    function disableActiveAdvertisement() {
      disablePins();
      hidePopups();
    }

    // При открытом popup закрыть его по нажатию на ESC
    function onPopupESCPress(evt) {
      if (evt.keyCode === window.code.ESC) {
        disableActiveAdvertisement();
      }
    }

    // Функция, скрывающая карточки
    function hidePopups() {
      popups.forEach(function (popup) {
        popup.style.display = 'none';
      });

      if (closePopupButton) {
        closePopupButton.removeEventListener('click', hidePopups);
      }

      document.removeEventListener('keydown', onPopupESCPress);
    }

    // Функция, показывающая карточку
    function showPopup(element) {
      hidePopups();
      element.style.display = 'block';

      closePopupButton = element.querySelector('.popup__close');

      closePopupButton.addEventListener('click', disableActiveAdvertisement);
      document.addEventListener('keydown', onPopupESCPress);
    }

    function changeAdvertisement(pin, popup) {
      disablePins();
      setActiveToPin(pin);
      showPopup(popup);
    }

    function onPinKeydownPress(evt, pin, popup) {
      if (evt.keyCode === window.code.ENTER) {
        disablePins();
        setActiveToPin(pin);
        showPopup(popup);
      }
    }

    // По нажатию на пин откроем соответствующую карточку
    pins.forEach(function (pin, index) {
      pin.addEventListener('click', function () {
        changeAdvertisement(pin, popups[index]);
      });

      pin.addEventListener('keydown', function (evt) {
        onPinKeydownPress(evt, pin, popups[index]);
      });
    });

    // Сразу скроем карточки
    hidePopups();
  };
})();
