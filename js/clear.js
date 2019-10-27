'use strict';

(function () {
  var renderedResults = document.querySelectorAll('.map__pin--added, .popup');

  console.log(renderedResults);
  window.clear = function () {
    if (renderedResults) {
      renderedResults.forEach(function (element) {
        element.remove();
      });
    }
  }
})();

