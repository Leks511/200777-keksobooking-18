'use strict';

(function () {
  window.setMapInterface = function () {
    var pins = document.querySelectorAll('.map__pin--added');
    var popups = document.querySelectorAll('.map__card');
    var closePopupBtn;

    // При открытом popup закрыть его по нажатию на ESC
    function onPopupESCPress(evt) {
      if (evt.keyCode === window.code.ESC) {
        hidePopups();
      }
    }

    // Функция, скрывающая карточки
    function hidePopups() {
      popups.forEach(function (popup) {
        popup.style.display = 'none';
      });

      if (closePopupBtn) {
        closePopupBtn.removeEventListener('click', hidePopups);
      }

      document.removeEventListener('keydown', onPopupESCPress);
    }

    // Функция, показывающая карточку
    function showPopup(element) {
      hidePopups();
      element.style.display = 'block';

      closePopupBtn = element.querySelector('.popup__close');

      closePopupBtn.addEventListener('click', hidePopups);
      document.addEventListener('keydown', onPopupESCPress);
    }

    // По нажатию на пин откроем соответствующую карточку
    pins.forEach(function (pin, index) {
      pin.addEventListener('click', function () {
        showPopup(popups[index]);
      });

      pin.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.code.ENTER) {
          showPopup(popups[index]);
        }
      });
    });

    // Сразу скроем карточки
    hidePopups();
  };
})();
