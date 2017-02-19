'use strict';
(function () {
  window.load = function (url, onLoad) {                // загружаем данные
    var xhr = new XMLHttpRequest();                     // создаём новый запрос
    xhr.open('GET', url);                               // отправляем запрос по ссылке

    xhr.addEventListener('load', function (e) {         // в случае загрузки
      onLoad(e.target.response);                        // колбек в случае загрузки
    });

    xhr.send();                                         // отсылаем
  };
})();
