'use strict';

(function () {
  var filterIndexes = {
    TYPE: 0,
    PRICE: 1,
    ROOMS: 2,
    GUESTS: 3
  };

  var housingFilterElements = document.querySelectorAll('select[id^="housing-"]');
  var featureFilterElements = document.querySelectorAll('input[id ^= "filter-"]');
  var filterElements = document.querySelectorAll('select[id^="housing-"], input[id ^= "filter-"]');

  var filteredList;
  var filters = [];

  var transformingFunctions = {
    // Функция, возвращающая переданное значение, если обработка значения не требуется
    returnValue: function (val) {
      return val;
    },
    // Функция, приводящая значение к строковому значению
    transformToString: function (val) {
      var newStr = val.toString();
      return newStr;
    },
    // Функция приведения значения цены объявления к сравниваемому виду
    getPriceLabel: function (price) {
      if (price < 10000) {
        price = 'low';
      } else if (price >= 10000 && price <= 50000) {
        price = 'middle';
      } else {
        price = 'high';
      }
      return price;
    }
  };

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
  function checkFeature(list, index) {
    if (filterElements[index].checked) {
      filteredList = list.filter(function (it) {
        // Проверим: содержит ли массив features значение filterValue
        return getFeature(it.offer.features, filterElements[index].value) === filterElements[index].value;
      });
    } else {
      filteredList = list;
    }
    return filteredList;
  }

  // Функция, фильтрующая по селектам (#housing-*)
  function checkFilter(list, index) {
    var handleValue = function () {};
    var selectedValue;

    if (filterElements[index].value !== 'any') {
      filteredList = list.filter(function (it) {

        if (index === filterIndexes.TYPE) {
          handleValue = transformingFunctions.returnValue;
          selectedValue = it.offer.type;
        } else if (index === filterIndexes.PRICE) {
          handleValue = transformingFunctions.getPriceLabel;
          selectedValue = it.offer.price;
        } else if (index === filterIndexes.ROOMS) {
          handleValue = transformingFunctions.transformToString;
          selectedValue = it.offer.rooms;
        } else if (index === filterIndexes.GUESTS) {
          handleValue = transformingFunctions.transformToString;
          selectedValue = it.offer.guests;
        }

        return handleValue(selectedValue) === filterElements[index].value;
      });
    } else {
      filteredList = list;
    }
    return filteredList;
  }

  // Функция заполнения массива фильтрующими функциями
  function fillFilteringFunctionList(filteringElements, handler) {
    for (var i = 0; i < filteringElements.length; i++) {
      filters.push(handler);
    }
  }

  // Функция, запускающая фильтр массива объявлений
  function filterAdvertisements() {
    var filteredAdvertisements = filters.reduce(function (result, filter, index) {
      return filter(result, index);
    }, window.advertisements);

    return filteredAdvertisements;
  }

  // Функция, показывающая новый отфильтрованный массив объявлений
  function showResult() {
    // Фильтруем массив и возвращаем его
    var filteredResult = filterAdvertisements();
    // Отдадим фильтрованный массив данных на отображение
    window.render(filteredResult);
  }

  // Заполним массив фильтрующими функциями
  fillFilteringFunctionList(housingFilterElements, checkFilter);
  fillFilteringFunctionList(featureFilterElements, checkFeature);

  // При изменении значений фильтров очистим карту от результатов предыдущего фильтрования, отсортируем массив объявлений и отобразим новый результат, если таковой имеется
  filterElements.forEach(function (element) {
    element.addEventListener('change', function () {
      // Очистим карту от старых пинов для рендеринга новых, а также от popup'а для рендеринга нового
      window.clear();

      (window.debounce(function () {
        showResult();
      }))();
    });
  });
})();
