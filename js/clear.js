'use strict';
(function () {
  window.clear = function () {
    var elements = document.querySelectorAll('.map__pin--added, .map__card');

    elements.forEach(function (element) {
      element.remove();
    });
  };
})();

