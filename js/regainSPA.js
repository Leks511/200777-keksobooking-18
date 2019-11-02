'use strict';

(function () {
  var adFormElements = document.querySelectorAll('#title, #price');

  window.regainSPA = function () {
    adFormElements.forEach(function (it) {
      it.value = '';
    });
    window.clear();
    window.disableInterface();
    window.setDefaultCoords();
    window.fillAddress(false);
  };
})();
