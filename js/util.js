'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomValueByList: function (list) {
      return list[window.util.getRandomNumber(0, list.length - 1)];
    },
    createRandomArray: function (list) {
      var newArray = [];
      var randomQuantityOfElements = this.getRandomNumber(0, list.length);

      for (var i = 0; i < randomQuantityOfElements; i++) {
        newArray[i] = window.util.getRandomValueByList(list);
      }
      return newArray;
    }
  };
})();
