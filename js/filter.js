'use strict';

(function () {
  var filterElements = {
    type: document.querySelector('#housing-type'),
    price: document.querySelector('#housing-price'),
    rooms: document.querySelector('#housing-rooms'),
    guests: document.querySelector('#housing-guests'),
  };


  var filters = [
    function(list) {
      window.removePins();

      var housingType = filterElements.type.value;
      var filteredList;

      // Фильтрация взятого массива по правилу
      if (housingType !== 'any') {
        filteredList = list.filter(function (it) {
          return it.offer.type === housingType;
        });
      } else {
        filteredList = list;
      }

      return filteredList;
    },
    function(list) {
      window.removePins();

      var housingPrice = filterElements.price.value;
      var filteredList;

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

      // Фильтрация взятого массива по правилу
      if (housingPrice !== 'any') {
        filteredList = list.filter(function (it) {
          return getPriceLabel(it.offer.price) === housingPrice;
        });
      } else {
        filteredList = list;
      }

      return filteredList;
    },
    function(list) {
      window.removePins();

      var housingRooms = filterElements.rooms.value;
      var filteredList;

      if (housingRooms !== 'any') {
        filteredList = list.filter(function (it) {
          return it.offer.rooms === parseInt(housingRooms, 10);
        });
      } else {
        filteredList = list;
      }

      return filteredList;
    },
    function(list) {
      window.removePins();

      var housingGuests = filterElements.guests.value;
      var filteredList;

      if (housingGuests !== 'any') {
        filteredList = list.filter(function (it) {
          return it.offer.guests === parseInt(housingGuests, 10);
        });
      } else {
        filteredList = list;
      }

      return filteredList;
    }
  ];

  for (var element in filterElements) {
    filterElements[element].addEventListener('change', function (){

      var filteredAdvertisements = filters.reduce(function(result, filter) {
        var filtered = filter(result);
        return filtered;
      }, window.advertisements);

      console.log(filteredAdvertisements);
      window.render(filteredAdvertisements);
    });
  }

})();
