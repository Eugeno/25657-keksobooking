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

    var pinTemplate = document.querySelector('#pin-template');                 // находим шаблон
    var pinToClone = pinTemplate.content.querySelector('.pin');                // а в нём то, что будем копировать

    var lodgeData = [];                                                        // создаём массив, где будут данные по рисуемым меткам

    var pinFilter = document.querySelector('.tokyo__filters-container');
    var filterType = pinFilter.querySelector('#housing_type');
    var filterPrice = pinFilter.querySelector('#housing_price');
    var filterRooms = pinFilter.querySelector('#housing_room-number');
    var filterGuests = pinFilter.querySelector('#housing_guests-number');
    var filterFeatures = pinFilter.querySelector('#housing_features');
    var filterFeatureWifi = filterFeatures.querySelector('[value=wifi]');
    var filterFeatureDishwacher = filterFeatures.querySelector('[value=dishwasher]');
    var filterFeatureParking = filterFeatures.querySelector('[value=parking]');
    var filterFeatureWasher = filterFeatures.querySelector('[value=washer]');
    var filterFeatureElevator = filterFeatures.querySelector('[value=elevator]');
    var filterFeatureConditioner = filterFeatures.querySelector('[value=conditioner]');

    var pinFilters = {};

    var refreshFilters = function () {
      pinFilters = {
        'type': filterType.value,
        'price': filterPrice.value,
        'rooms': filterRooms.value,
        'guests': filterGuests.value,
        'features': {
          'wifi': filterFeatureWifi.checked,
          'dishwasher': filterFeatureDishwacher.checked,
          'parking': filterFeatureParking.checked,
          'washer': filterFeatureWasher.checked,
          'elevator': filterFeatureElevator.checked,
          'conditioner': filterFeatureConditioner.checked
        }
      };
    };
    refreshFilters();

    pinFilter.addEventListener('change', function () {
      refreshFilters();
      renderPins(pinFilters);
    });

    var similarApartments = [];              // создаём массив, где будут все данные
    var onLoad = function (data) {           // когда произойдёт их загрузка
      similarApartments = JSON.parse(data);  // записываем в массив данные, полученные из JSON
      renderPins(pinFilters);                          // рисуем метки с данными
    };

    var pinDataUrl = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';  // откуда будем брать данные
    window.load(pinDataUrl, onLoad);                                                             // загружаем данные, колбек на то, что будем делать после

    var renderPins = function (pinFilters) {                                   // рисуем новые метки
      var maxPin = 3;                                                          // максимальное количество отображаемых меток
      if (maxPin > similarApartments.length) {                                 // если данных получили меньше,
        maxPin = similarApartments.length;                                     // то не создаём пустых элементов
      }

      for (var p = 0; p < pins.length; p++) {
        pins[p].remove();                                                      // уберём прошлые метки
      }
      var dialog = document.querySelector('.dialog');                          // и карточку, если есть
      if (dialog) {
        dialog.remove();
      }

      for (var i = 0; i < maxPin; i++) {
        var pinIsValid = function () {                                           // проверка соответствия метки
          return (
            (pinFilters.type === 'any' || pinFilters.type === similarApartments[i].offer.type) &&
            (
              (pinFilters.price === 'low' && similarApartments[i].offer.price < 10000) ||
              (pinFilters.price === 'middle' && similarApartments[i].offer.price >= 10000 && +similarApartments[i].offer.price <= 50000) ||
              (pinFilters.price === 'high' && similarApartments[i].offer.price > 50000)
            ) &&
            (pinFilters.rooms === 'any' || +pinFilters.rooms === similarApartments[i].offer.rooms) &&
            (pinFilters.guests === 'any' || +pinFilters.guests === similarApartments[i].offer.guests) &&
            (!pinFilters.features.wifi || pinFilters.features && similarApartments[i].offer.features.indexOf('wifi') !== -1) &&
            (!pinFilters.features.dishwasher || pinFilters.features && similarApartments[i].offer.features.indexOf('dishwasher') !== -1) &&
            (!pinFilters.features.parking || pinFilters.features && similarApartments[i].offer.features.indexOf('parking') !== -1) &&
            (!pinFilters.features.washer || pinFilters.features && similarApartments[i].offer.features.indexOf('washer') !== -1) &&
            (!pinFilters.features.elevator || pinFilters.features && similarApartments[i].offer.features.indexOf('elevator') !== -1) &&
            (!pinFilters.features.conditioner || pinFilters.features && similarApartments[i].offer.features.indexOf('conditioner') !== -1)
          );
        };

        if (pinIsValid()) {                                                        // если ничего не передали или метка подходит
          var newPin = pinToClone.cloneNode(true);                                 // новый пин — копия из шаблона
          pinMap.appendChild(newPin);                                              // метку — на карту
          newPin.querySelector('img').src = similarApartments[i].author.avatar;    // задаём аватар
          newPin.style.left = similarApartments[i].location.x + 'px';              // икс
          newPin.style.top = similarApartments[i].location.y + 'px';               // игрек

          newPin.setAttribute('data-pin', i);                                      // каждой новой метке даём опознавательный знак
          lodgeData[i] = similarApartments[i];                                     // формируем массив с данными
        } else {
          if (maxPin < similarApartments.length) {                                 // проверив, есть ли ещё метки
            maxPin++;                                                              // будем смотреть дальше
          }
        }
      }

      pins = pinMap.querySelectorAll('.pin');                                  // соберём заново массив пинов
      pinMap.addEventListener('click', pinClickHandler);                       // повесим обработчик клика на контейнер с пинами
      pinMap.addEventListener('keydown', pinKeydownHandler);                   // и на нажатие
    };

  };
})();
