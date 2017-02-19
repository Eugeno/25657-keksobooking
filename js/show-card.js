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

    if (dialog) {       // если уже есть какая-то карточка
      dialog.remove();  // удалим её
    }

    var dialogTemplate = document.querySelector('#dialog-template');      // находим шаблон карточки
    var dialogToClone = dialogTemplate.content.querySelector('.dialog');  // а в нём то, что будем копировать

    dialog = dialogToClone.cloneNode(true);                               // создали копию карточки
    dialogClose = dialog.querySelector('.dialog__close');                 // в нём нашли крестик

    tokyoMap.appendChild(dialog);                                         // диалог — на карту

    var getOfferTypeText = function (type) {
      var retVal = '';                        // то, что будем возвращать
      switch (type) {                         // в зависимости от переданного значения
        case 'flat':                          // ставим русские названия типов
          retVal = 'Квартира';
          break;
        case 'bungalo':
          retVal = 'Бунгало';
          break;
        case 'house':
          retVal = 'Дом';
      }
      return retVal;
    };

    var getOfferRoomsText = function (rooms, guests) {
      var roomsText = '';
      var guestsText = '';

      if (rooms === 0) {
        roomsText = 'Нет комнат';
      } else if (rooms % 10 === 1) {
        roomsText = rooms + ' комната';
      } else if (rooms % 10 === 2 || rooms % 10 === 3 || rooms % 10 === 4) {
        roomsText = rooms + ' комнаты';
      } else {
        roomsText = rooms + ' комнат';
      }

      if (guests === 0) {
        guestsText = '';
      } else if (guests % 10 === 1) {
        guestsText = 'для ' + guests + ' гостя';
      } else {
        guestsText = 'для ' + guests + ' гостей';
      }

      return roomsText + ' ' + guestsText;
    };
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

    lodgeType.innerText = getOfferTypeText(lodgeData.offer.type);         // типа жилья
    lodgeRG.innerText = getOfferRoomsText(lodgeData.offer.rooms, lodgeData.offer.guests);  // комнаты и гости

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
})();
