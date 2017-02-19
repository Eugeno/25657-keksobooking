'use strict';
(function () {
  window.initializePins = function (pinMap, pins) {
    var ENTER_KEY_CODE = 13;

    var savedPin;

    var deactivatePins = function () {                  // деактивация меток
      for (var i = 0; i < pins.length; i++) {           // проходимся по всем меткам
        pins[i].classList.remove('pin--active');        // убираем класс
        pins[i].setAttribute('aria-pressed', 'false');  // отжимаем
      }
    };

    var activatePin = function (clickedPin) {           // активация метки
      clickedPin.classList.add('pin--active');          // добавляем класс
      clickedPin.setAttribute('aria-pressed', 'true');  // ставим аттрибут
    };

    var showLodgeInfo = function (clickedPin, lodgeData) {  // активация объявления
      deactivatePins(pins);                                 // деактивируем все метки
      activatePin(clickedPin);                              // активируем выбранную
      window.showCard(hideLodgeInfo, lodgeData);            // показываем карточку, колбек на закрытие и дальше передаём данные
    };

    var hideLodgeInfo = function () {  // деактивация объявления
      deactivatePins(pins);            // деактивируем все метки
      if (savedPin) {                  // если в памяти есть метки (открывали с клавиатуры)
        savedPin.focus();              // то ставим на неё фокус
        savedPin = null;               // и убираем из памяти
      }
    };

    var pinClickHandler = function (e) {                                          // смотрим, куда нажали
      var clickedPin;                                                             // переменная, куда запишем нажатую метку
      if (e.target.classList.contains('pin')) {                                   // если нажали прямо на метку
        clickedPin = e.target;                                                    // её и запишем в переменную
      } else {                                                                    // а если попали по картинке
        clickedPin = e.target.parentNode;                                         // то её родитель — метку — в переменную
      }
      showLodgeInfo(clickedPin, lodgeData[clickedPin.getAttribute('data-pin')]);  // активируем объявления с выбранной метку и её данными
    };

    var pinKeydownHandler = function (e) {                                          // если нажали
      if (e.keyCode === ENTER_KEY_CODE) {                                           // на enter
        var clickedPin = e.target;
        savedPin = clickedPin;                                                      // текущий пин — в память
        showLodgeInfo(clickedPin, lodgeData[clickedPin.getAttribute('data-pin')]);  // пробуем передать инфу
      }
    };

    var similarApartments = [];              // создаём массив, где будут все данные
    var onLoad = function (data) {           // когда произойдёт их загрузка
      similarApartments = JSON.parse(data);  // записываем в массив данные, полученные из JSON
      renderPins();                          // рисуем метки с данными
    };

    var pinDataUrl = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';  // откуда будем брать данные
    window.load(pinDataUrl, onLoad);                                                             // загружаем данные, колбек на то, что будем делать после

    var pinTemplate = document.querySelector('#pin-template');                 // находим шаблон
    var pinToClone = pinTemplate.content.querySelector('.pin');                // а в нём то, что будем копировать

    var lodgeData = [];                                                        // создаём массив, где будут данные по рисуемым меткам
    var renderPins = function () {                                             // рисуем новые метки
      for (var i = 0; i < 3; i++) {                                            // три штуки
        var newPin = pinToClone.cloneNode(true);                               // новый пин — копия из шаблона
        pinMap.appendChild(newPin);                                            // метку — на карту
        newPin.querySelector('img').src = similarApartments[i].author.avatar;  // задаём аватар
        newPin.style.left = similarApartments[i].location.x + 'px';            // икс
        newPin.style.top = similarApartments[i].location.y + 'px';             // игрек

        pins = pinMap.querySelectorAll('.pin');                                // соберём заново массив пинов

        newPin.setAttribute('data-pin', i);                                    // каждой новой метке даём опознавательный знак
        lodgeData[i] = similarApartments[i];                                   // формируем массив с данными
      }

      pins = pinMap.querySelectorAll('.pin');                                  // соберём заново массив пинов
      pinMap.addEventListener('click', pinClickHandler);                       // повесим обработчик клика на контейнер с пинами
      pinMap.addEventListener('keydown', pinKeydownHandler);                   // и на нажатие
    };
  };
})();
