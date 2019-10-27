'use strict';
(function () {
  window.clear = function (elementSelector) {
    var elements = document.querySelectorAll(elementSelector);
    if (elements) {
      elements.forEach(function (element) {
        element.remove();
      });
    }
  };
})();

