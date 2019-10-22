/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
'use strict';

(function () {
  var roomsElement = document.querySelector('#housing-rooms');

  window.updateAdvertisements = function (evt) {
    window.removePins();
    var housingRooms = evt.target.value;

    // Если количество комнат не ровняется "any", то в рендеринг передаются отфильтрованные объявления
    if (housingRooms !== 'any') {
      window.render(
          window.advertisements
            .filter(function (it) {
              return it.offer.rooms === parseInt(housingRooms, 10);
            })
      );
    } else {
      window.render(window.advertisements);
    } // Иначе - как были получены
  };

  roomsElement.addEventListener('change', window.updateAdvertisements);
})();
