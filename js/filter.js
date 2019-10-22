'use strict';

(function () {
  var typeElement = document.querySelector('#housing-type');
  var priceElement = document.querySelector('#housing-price');
  var roomsElement = document.querySelector('#housing-rooms');
  var guestsElement = document.querySelector('#housing-guests');

  var filters = [
    function updateOnType(list) {
      var housingType = typeElement.value;

      var filteredList = list.filter(function (it) {
        return it.offer.type === housingType;
      });

      return filteredList;
    },
    function updateOnPrice(list) {
      var housingPrice = priceElement.value;

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
      var housingRooms = roomsElement.value;

      var filteredList = list.filter(function (it) {
        return it.offer.rooms === parseInt(housingRooms, 10);
      });

      return filteredList;
    },
    function updateOnGuests(list) {
      var housingGuests = guestsElement.value;

      var filteredList = list.filter(function (it) {
        return it.offer.guests === parseInt(housingGuests, 10);
      });

      return filteredList;
    }
  ];
})();
