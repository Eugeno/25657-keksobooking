'use strict';
(function () {
  window.load = function (url, onLoad) {                // загружаем данные
    var xhr = new XMLHttpRequest();                     // создаём новый запрос
    xhr.open('GET', url);                               // отправляем запрос по ссылке

    xhr.addEventListener('load', function (e) {         // в случае загрузки
      try {
        onLoad(e.target.response);                      // колбек в случае загрузки
      } catch(err) {}
    });

    xhr.addEventListener('error', function () {
      console.log('Something\'s went wrong');
    });

    xhr.addEventListener('timeout', function () {
      console.log('Time\'s up!');
    });

    xhr.send();                                         // отсылаем
  };
})();
