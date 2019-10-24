/* eslint-disable guard-for-in */
'use strict';

(function () {
  var filterElements = [
    document.querySelector('#housing-type'),
    document.querySelector('#housing-price'),
    document.querySelector('#housing-rooms'),
    document.querySelector('#housing-guests'),

    // document.querySelector('#filter-wifi'),
    // document.querySelector('#filter-dishwasher'),
    // document.querySelector('#filter-parking'),
    // document.querySelector('#filter-washer'),
    // document.querySelector('#filter-elevator'),
    // document.querySelector('#filter-conditioner')
  ];

  var checkbox = document.querySelector('#filter-wifi');

  // Отобразить только те элементы, features которых содержит значение, совпадаемое со значением кликнутого элемента

  // Если массив содержит элемент со значением, равным filterValue, то вернуть массив из 1 этого элемента
  function getFeature(list, filterValue) {
    var result = list.filter(function (it) {
      return it === filterValue;
    });

    if (result[0]) {
      return result[0];
    } else {
      return;
    }
  }

  function checkFeature(list, evt) {
    if (evt.target.checked) {
      filteredList = list.filter(function (it) {
      // Проверим: содержит ли массив features значение filterValue
        return getFeature(it.offer.features, evt.target.value) === evt.target.value;
      });

      console.log(filteredList)
    } else {
      console.log('no')
    }
  }

  // кликаем на элемент
  checkbox.addEventListener('click', function(evt) {
    checkFeature(window.advertisements, evt);
  });

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
      console.log(filteredAdvertisements);

    });
  });

})();
