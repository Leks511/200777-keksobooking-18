/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
'use strict';

(function () {
  var typeElement = document.querySelector('#housing-type');

  window.updateAdvertisements = function (evt) {
    var value = evt.target.value;
    window.removePins();

    // Если тип жилья не ровняется "any", то в рендеринг передаются отфильтрованные объявления
    if (value !== 'any') {
      window.render(
          window.advertisements
            .filter(function (it) {
              return it.offer.type === value;
            })
      );
    } else {
      window.render(window.advertisements);
    } // Иначе - как были получены
  };

  typeElement.addEventListener('change', window.updateAdvertisements);
})();
