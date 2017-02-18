'use strict';
(function () {
  window.initializePins = function (pinMap, pins) {
    var ENTER_KEY_CODE = 13;
    var savedPin;

    var deactivatePins = function () {
      for (var i = 0; i < pins.length; i++) {
        pins[i].classList.remove('pin--active');
        pins[i].setAttribute('aria-pressed', 'false');
      }
    };

    var activatePin = function (clickedPin) {
      clickedPin.classList.add('pin--active');
      clickedPin.setAttribute('aria-pressed', 'true');
    };

    var showLodgeInfo = function (clickedPin, lodgeData) {
      deactivatePins(pins);
      activatePin(clickedPin);
      window.showCard(hideLodgeInfo, lodgeData);
    };

    var hideLodgeInfo = function () {
      deactivatePins(pins);
      if (savedPin) {
        savedPin.focus();
        savedPin = null;
      }
    };

    var pinClickHandler = function (e) {
      var clickedPin;
      if (e.target.classList.contains('pin')) {
        clickedPin = e.target;
      } else {
        clickedPin = e.target.parentNode;
      }
      showLodgeInfo(clickedPin, lodgeData[clickedPin.getAttribute('data-pin')]);
    };

    /*pinMap.addEventListener('click', pinClickHandler);*/      // унесли обработчик в renderPins
    /*pinMap.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEY_CODE) {
        savedPin = evt.target;
        showLodgeInfo(evt.target);
      }
    });*/

    var similarApartments = [];
    var onLoad = function (data) {
      similarApartments = JSON.parse(data);  // записываем в массив данные, полученные из JSON
      renderPins();
    };
    window.load('https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data', onLoad);

    var pinTemplate = document.querySelector('#pin-template');    // находим шаблон
    var pinToClone = pinTemplate.content.querySelector('.pin');   // а в нём то, что будем копировать

    var lodgeData = [];
    var renderPins = function () {            // рисуем новые метки
      for (var i = 0; i < 3; i++) {           // три штуки
        var newPin = pinToClone.cloneNode(true);                                // новый пин -- копия из шаблона
        pinMap.appendChild(newPin);                                             // метку -- на карту
        newPin.querySelector('img').src = similarApartments[i].author.avatar;   // задаём аватар
        newPin.style.left = similarApartments[i].location.x + 'px';             // икс
        newPin.style.top = similarApartments[i].location.y + 'px';              // игрек


        newPin.setAttribute('data-pin', i);                     // дадим дата-аттрибуты пинам, чтобы
        lodgeData[i] = similarApartments[i];                    // потом в массиве информаций брать нужный подмассив
        newPin.addEventListener('click', pinClickHandler);              // обработчик на каждый новый пин
        newPin.addEventListener('keydown', function (e) {
          if (e.keyCode === ENTER_KEY_CODE) {
            savedPin = e.target;
            showLodgeInfo(e.target, lodgeData[e.target.getAttribute('data-pin')]);      // пробуем передать инфу
          }
        });
      }

      pins = pinMap.querySelectorAll('.pin');                         // соберём заново массив пинов
    };
  };
})();
