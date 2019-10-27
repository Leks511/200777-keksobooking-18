'use strict';

(function () {
  var filterIndexes = {
    TYPE: 0,
    PRICE: 1,
    ROOMS: 2,
    GUESTS: 3
  };

  var housingFilters = document.querySelectorAll('select[id^="housing-"]');
  var featureFilters = document.querySelectorAll('input[id ^= "filter-"]');
  var filterElements = document.querySelectorAll('select[id^="housing-"], input[id ^= "filter-"]');

  var filteredList;
  var filters = [];


  // Функция, возвращающая переданное значение, если обработка значения не требуется
  function returnValue(val) {
    return val;
  }

  // Функция, приводящая значение к строковому значению
  function transformToString(val) {
    var newStr = val.toString();
    return newStr;
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
  function checkFeature(list, filterValue, checkbox, counter) {
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


  // Функция, фильтрующая по селектам (#housing-*)
  function checkFilter(list, filterValue, checkbox, counter) {

    var handleValue;
    var selectedValue;

    if (filterValue !== 'any') {
      filteredList = list.filter(function (it) {

        switch (counter) {
          case counter === filterIndexes.TYPE:
            handleValue = returnValue;
            selectedValue = it.offer.type;
            break;

          case counter === filterIndexes.PRICE:
            handleValue = getPriceLabel;
            selectedValue = it.offer.price;
            break;

          case counter === filterIndexes.ROOMS:
            handleValue = transformToString;
            selectedValue = it.offer.rooms;
            break;

          case counter === filterIndexes.GUESTS:
            handleValue = transformToString;
            selectedValue = it.offer.guests;
            break;
        }

        return handleValue(selectedValue) === filterValue;
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

  // Заполним массив фильтрующими функциями
  fillFilteringFunctionList(housingFilters, checkFilter);
  fillFilteringFunctionList(featureFilters, checkFeature);

  filterElements.forEach(function (element) {
    element.addEventListener('change', function () {

// !!!!!!!!!!! ПЕРЕДЕЛАТЬ RETURN!!!

      // Фильтруем массив и возвращаем его
      var filteredAdvertisements = filters.reduce(function (result, filter, index) {
        //return filter(result, filterElements[index].value, filterElements[index], index);
        return filter(result, filterElements, index);
      }, window.advertisements);

      // После сортировки очистим карту от старых пинов для рендеринга новых, а также от popup'а для рендеринга нового
      window.removePins();
      window.removePopup();

      // Перед тем, как отправить массив объявлений на сортировку, проверим на наличие в нём элементов. Т.к. если при сортировке нужных нам вариантов не окажется, нет смысла передавать пустой массив на рендеринг
      if (filteredAdvertisements.length > 0) {
        window.render(filteredAdvertisements);
      }
    });
  });
})();
