/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
'use strict';

(function () {
  var priceElement = document.querySelector('#housing-price');

  // Функция, сортирующая цену объявления по критерию
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

  window.updateAdvertisements = function (evt) {
    window.removePins();
    var housingPrice = evt.target.value;
    // Если цена жилья не ровняется "any", то в рендеринг передаются отфильтрованные объявления
    if (housingPrice !== 'any') {
      window.render(
          window.advertisements
            .filter(function (it) {
              return getPriceLabel(it.offer.price) === housingPrice;
            })
      );
    } else {
      window.render(window.advertisements);
    } // Иначе - как были получены
  };

  priceElement.addEventListener('change', window.updateAdvertisements);
})();
