/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
'use strict';

(function () {
  var typeElement = document.querySelector('#housing-type');

  window.updateAdvertisements = function (evt) {
    window.removePins();
    var housingType = evt.target.value;
    // Если тип жилья не ровняется "any", то в рендеринг передаются отфильтрованные объявления
    if (housingType !== 'any') {
      window.render(
          window.advertisements
            .filter(function (it) {
              return it.offer.type === housingType;
            })
      );
    } else {
      window.render(window.advertisements);
    } // Иначе - как были получены
  };

  typeElement.addEventListener('change', window.updateAdvertisements);
})();
