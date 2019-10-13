'use strict';

(function () {
  var URL_TO_GET = 'https://js.dump.academy/keksobooking/data';

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000;

      xhr.open('GET', URL_TO_GET);
      xhr.send();
    },
    onErrorFormSubmit: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; width:300px; height:auto; margin-left: -150px; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = '50%';
      node.style.top = '300px';
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
