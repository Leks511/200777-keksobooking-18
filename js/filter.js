/* eslint-disable guard-for-in */
'use strict';

(function () {
  var filterElements = [
    document.querySelector('#housing-type'),
    document.querySelector('#housing-price'),
    document.querySelector('#housing-rooms'),
    document.querySelector('#housing-guests'),
  ];

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

  // Массив функций с параметрами для фильтрации входного массива
  var filters = [
    function (list, filterValue) {
      // Фильтрация по типу

      if (filterValue !== 'any') {
        filteredList = list.filter(function (it) {
          return it.offer.type === filterValue;
        });
      } else {
        filteredList = list;
      }

      return filteredList;
    },
    function (list, filterValue) {
      // Фильтрация по цене

      if (filterValue !== 'any') {
        filteredList = list.filter(function (it) {
          return getPriceLabel(it.offer.price) === filterValue;
        });
      } else {
        filteredList = list;
      }

      return filteredList;
    },
    function (list, filterValue) {
      // Фильтрация по количеству комнат

      if (filterValue !== 'any') {
        filteredList = list.filter(function (it) {
          return it.offer.rooms === parseInt(filterValue, 10);
        });
      } else {
        filteredList = list;
      }

      return filteredList;
    },
    function (list, filterValue) {
      // Фильтрация по количеству гостей

      if (filterValue !== 'any') {
        filteredList = list.filter(function (it) {
          return it.offer.guests === parseInt(filterValue, 10);
        });
      } else {
        filteredList = list;
      }

      return filteredList;
    }
  ];

  filterElements.forEach(function (element) {
    element.addEventListener('change', function () {

      var filteredAdvertisements = filters.reduce(function (result, filter, index) {
        window.removePins();

        return filter(result, filterElements[index].value);
      }, window.advertisements);

      window.render(filteredAdvertisements);
    });
  });

})();
