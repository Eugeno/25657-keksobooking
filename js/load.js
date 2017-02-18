'use strict';
(function () {
  window.load = function (url, onLoad) {
    var xhr = new XMLHttpRequest();      // создаём новый запрос
    xhr.open('GET', url);                // отправляем запрос по ссылке
                                         // после загрузки
    xhr.addEventListener('load', function (e) {
      try {
        onLoad(e.target.response);       // колбек в случае загрузки
      } catch(err) {}                    // проверка на ошибку
      /*console.log(e.target.response);*/
    });

    xhr.addEventListener('error', function () {
      console.log('Something\'s went wrong');
    });

    xhr.addEventListener('timeout', function () {
      console.log('Time\'s up!');
    });

    xhr.send();
  };
})();
