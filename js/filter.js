'use strict';

(function () {
  var filterElements = document.querySelectorAll('select[id^="housing-"], input[id ^= "filter-"]');
  var filteredList;

  // Если массив содержит элемент со значением, равным filterValue, то вернуть этот элемент для дальнейшего сравнения
  function getFeature(list, filterValue) {
    var result = list.filter(function (it) {
      return it === filterValue;
    });

    if (result[0]) {
      return result[0];
    } else {
      return null;
    }
  }

  // Функция, фильтрующая по чекбоксам (features)
  function checkFeature(list, filterValue, checkbox) {
    if (checkbox.checked) {
      filteredList = list.filter(function (it) {
      // Проверим: содержит ли массив features значение filterValue
        return getFeature(it.offer.features, filterValue) === filterValue;
      });

    } else {
      filteredList = list;
    }

    return filteredList;
  }

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

  // Массив функций с параметрами для фильтрации входного массива по селектам
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

  // Добавим в массив функций-фильтров другие однотипные функции-фильтры для чекбоксов по их числу
  for (var i = 0; i < document.querySelectorAll('input[id ^= "filter-"]').length; i++) {
    filters.push(checkFeature);
  }

  filterElements.forEach(function (element) {
    element.addEventListener('change', function () {

      var filteredAdvertisements = filters.reduce(function (result, filter, index) {
        window.removePins();
        return filter(result, filterElements[index].value, filterElements[index]);
      }, window.advertisements);
      window.render(filteredAdvertisements);
    });
  });
})();
