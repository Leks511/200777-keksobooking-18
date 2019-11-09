'use strict';

(function () {
  window.setMapInterface = function () {
    var pinElements = document.querySelectorAll('.map__pin--added');
    var popupElements = document.querySelectorAll('.map__card');
    var closePopupButton;

    function disablePins() {
      pinElements.forEach(function (it) {
        it.classList.remove('map__pin--active');
      });
    }

    function setActiveToPin(pin) {
      pin.classList.add('map__pin--active');
    }

    function onClosePopupButtonClick() {
      disablePins();
      hidePopups();
    }

    // При открытом popup закрыть его по нажатию на ESC
    function onPopupESCPress(evt) {
      if (evt.keyCode === window.Codes.ESC) {
        onClosePopupButtonClick();
      }
    }

    // Функция, скрывающая карточки
    function hidePopups() {
      popupElements.forEach(function (popup) {
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

      closePopupButton.addEventListener('click', onClosePopupButtonClick);
      document.addEventListener('keydown', onPopupESCPress);
    }

    function changeAdvertisement(pin, popup) {
      disablePins();
      setActiveToPin(pin);
      showPopup(popup);
    }

    // По нажатию на пин откроем соответствующую карточку
    pinElements.forEach(function (pin, index) {
      pin.addEventListener('click', function () {
        changeAdvertisement(pin, popupElements[index]);
      });
    });
    // Сразу скроем карточки
    hidePopups();
  };
})();
