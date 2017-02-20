'use strict';
(function () {
  window.load = function (url, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.addEventListener('load', function (e) {
      onLoad(e.target.response);
    });

    xhr.send();
  };
})();
