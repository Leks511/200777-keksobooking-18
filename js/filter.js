'use strict';

(function () {
  var filterElements = {
    type: document.querySelector('#housing-type'),
    price: document.querySelector('#housing-price'),
    rooms: document.querySelector('#housing-rooms'),
    guests: document.querySelector('#housing-guests'),
  };


  var filters = [
    function updateOnType(list) {
      window.removePins();

      var housingType = filterElements.type.value;

      var filteredList = list.filter(function (it) {
        return it.offer.type === housingType;
      });

      return filteredList;
    },
    function updateOnPrice(list) {
      window.removePins();

      var housingPrice = filterElements.price.value;

      // Функция приведения значения цены объявления к сравниваемому виду
      function getPriceLabel(price) {
        if (price < 10000) {
          price = 'low';
        } else if (price >= 10000 && price <= 50000) {
          price = 'middle';
        } else {
          price = 'high';
        }
        return price;
      }

      var filteredList = list.filter(function (it) {
        return getPriceLabel(it.offer.price) === housingPrice;
      });

      return filteredList;
    },
    function updateOnRooms(list) {
      window.removePins();

      var housingRooms = filterElements.rooms.value;

      var filteredList = list.filter(function (it) {
        return it.offer.rooms === parseInt(housingRooms, 10);
      });

      return filteredList;
    },
    function updateOnGuests(list) {
      window.removePins();

      var housingGuests = filterElements.guests.value;

      var filteredList = list.filter(function (it) {
        return it.offer.guests === parseInt(housingGuests, 10);
      });

      return filteredList;
    }
  ];

  var filteredAdvertisements = filters.reduce(function (result, filter) {
    return filter(result);
  }, window.advertisements);

  filterElements.forEach(function (element) {
    element.addEventListener('change', function () {
      window.render(filteredAdvertisements);
    });
  });
})();