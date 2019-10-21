/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
'use strict';

(function () {
  var typeElement = document.querySelector('#housing-type');
  var housingType;

  window.updateAdvertisements = function () {
    window.removePins();

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

  typeElement.addEventListener('change', function () {
    housingType = typeElement.value;
    window.updateAdvertisements();
  });
})();
