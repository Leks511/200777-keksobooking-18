/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
'use strict';

(function () {
  var guestsElement = document.querySelector('#housing-guests');

  window.updateAdvertisements = function (evt) {
    window.removePins();
    var housingGuests = evt.target.value;

    // Если цена жилья не ровняется "any", то в рендеринг передаются отфильтрованные объявления
    if (housingGuests !== 'any') {
      window.render(
          window.advertisements
            .filter(function (it) {
              return it.offer.guests === parseInt(housingGuests, 10);
            })
      );
    } else {
      window.render(window.advertisements);
    } // Иначе - как были получены
  };

  guestsElement.addEventListener('change', window.updateAdvertisements);
})();
