'use strict';
(function () {
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  var tokyoMap = document.querySelector('.tokyo');  // секция с картой

  var dialog;       // переменная, куда будет записана карточка выбранного места
  var dialogClose;  // и её закрывашка

  window.showCard = function (closeHandler, lodgeData) {
    var onKeyDown = function (e) {    // функция проверки нажатия: был ли это esc, или enter по крестику
      if ((e.target === dialogClose && e.keyCode === ENTER_KEY_CODE) || e.keyCode === ESCAPE_KEY_CODE) {
        hideCard();                   // и если да, то прячем диалог
      }
    };

    var hideCard = function () {
      dialogClose.removeEventListener('click', hideCard);  // снимаем слушатель кликов
      window.removeEventListener('keydown', onKeyDown);    // и нажатий
      dialog.remove();                                     // удаляем диалог
      closeHandler();                                      // колбек на закрытие (работа с метками)
    };

    var showDialog = function () {                                          // показ карточки
      if (dialog) {                                                         // если уже есть какая-то
        dialog.remove();                                                    // удалим её
      }

      var dialogTemplate = document.querySelector('#dialog-template');      // находим шаблон карточки
      var dialogToClone = dialogTemplate.content.querySelector('.dialog');  // а в нём то, что будем копировать

      dialog = dialogToClone.cloneNode(true);                               // создали копию карточки
      dialogClose = dialog.querySelector('.dialog__close');                 // в нём нашли крестик

      tokyoMap.appendChild(dialog);                                         // диалог — на карту
                                                                            // переменные для объявления:
      var dialogTitle = dialog.querySelector('.dialog__title');             // аватарка
      var lodgeTitle = dialog.querySelector('.lodge__title');               // заголовок
      var lodgeAddress = dialog.querySelector('.lodge__address');           // адрес
      var lodgePrice = dialog.querySelector('.lodge__price');               // стоимость за ночь
      var lodgeType = dialog.querySelector('.lodge__type');                 // тип жилья
      var lodgeRG = dialog.querySelector('.lodge__rooms-and-guests');       // количество комнат и гостей
      var lodgeCTime = dialog.querySelector('.lodge__checkin-time');        // время заезда и выезда
      var lodgeDescription = dialog.querySelector('.lodge__description');   // описание
      var lodgeFeatures = dialog.querySelector('.lodge__features');         // особенностей контейнер
      var lodgePhotos = dialog.querySelector('.lodge__photos');             // фоток контейнер

      var dialogTitleImage = document.createElement('img');                 // создаём изображение для аватарки
      dialogTitleImage.setAttribute('width', '70');                         // задаём ширину,
      dialogTitleImage.setAttribute('height', '70');                        // высоту,
      dialogTitleImage.setAttribute('alt', 'Avatar');                       // альтернативный текст
      dialogTitleImage.setAttribute('src', lodgeData.author.avatar);        // и адрес
      dialogTitle.insertBefore(dialogTitleImage, dialogClose);              // помещаем перед крестиком

      lodgeTitle.innerText = lodgeData.offer.title;                         // вписываем заголовок,
      lodgeAddress.innerText = lodgeData.offer.address;                     // адрес
      lodgePrice.innerText = lodgeData.offer.price + ' ₽/ночь';             // и цену

      switch (lodgeData.offer.type) {                                       // в зависимости от переданного значения
        case 'flat':                                                        // ставим русские названия типов
          lodgeType.innerText = 'Квартира';
          break;
        case 'bungalo':
          lodgeType.innerText = 'Бунгало';
          break;
        case 'house':
          lodgeType.innerText = 'Дом';
      }

      switch (lodgeData.offer.rooms) {                                      // смотрим, сколько комнат
        case 0:                                                             // нет комнат — нет гостей
          lodgeRG.innerText = 'Нет комнат для гостей';
          break;
        case 1:                                                             // одна комната
          switch (lodgeData.offer.guests) {
            case 0:
              lodgeRG.innerText = '1 комната';
              break;
            case 1:
              lodgeRG.innerText = '1 комната для ' + lodgeData.offer.guests + ' гостя';
          }
          break;
        case 2:                                                             // две
          lodgeRG.innerText = lodgeData.offer.rooms + ' комнаты для ' + lodgeData.offer.guests + ' гостей';
          break;
        case 100:                                                           // или сто (по условиям формы)
          lodgeRG.innerText = lodgeData.offer.rooms + ' комнат для ' + lodgeData.offer.guests + ' гостей';
          break;
      }
                                                                            // пишем про время заезда и выезда
      lodgeCTime.innerText = 'Заезд после ' + lodgeData.offer.checkin + ', выезд до ' + lodgeData.offer.checkout;

      for (var j = 0; j < lodgeData.offer.features.length; j++) {           // смотрим, сколько фич в данных
        var lodgeFeature = document.createElement('span');                  // столько и создаём элементов
        lodgeFeature.classList.add('feature__image');                       // добавляя общий класс
        lodgeFeature.classList.add('feature__image--' + lodgeData.offer.features[j]);  // и конкретный
        lodgeFeatures.appendChild(lodgeFeature);                            // вставляем в контейне с фичами
      }

      lodgeDescription.innerText = lodgeData.offer.description;             // вписываем описение

      for (var i = 0; i < lodgeData.offer.photos.length; i++) {             // смотрим, сколько фоток в данных
        var lodgePhoto = document.createElement('img');                     // столько и создаём их
        lodgePhoto.setAttribute('width', '52');                             // задаём ширину,
        lodgePhoto.setAttribute('height', '42');                            // высоту,
        lodgePhoto.setAttribute('alt', 'Lodge photo');                      // альтернативный текст
        lodgePhoto.setAttribute('src', lodgeData.offer.photos[i]);          // и адрес
        lodgePhotos.appendChild(lodgePhoto);                                // вставляем в контейнер с фотками
      }

      dialogClose.addEventListener('click', hideCard);                      // вешаем обработчик клика на закрывашку
      window.addEventListener('keydown', onKeyDown);                        // обработка нажатий
    };

    showDialog();                                                           // вызываем функцию показа карточки
  };
})();
