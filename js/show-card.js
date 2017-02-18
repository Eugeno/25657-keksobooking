'use strict';
(function () {
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  /*var dialog = document.querySelector('.dialog');*/
  /*var dialogClose = dialog.querySelector('.dialog__close');*/

  var dialog;
  var dialogClose;

  window.showCard = function (closeHandler, lodgeData) {
    var onKeyDown = function (e) {
      if ((e.target === dialogClose && e.keyCode === ENTER_KEY_CODE) || e.keyCode === ESCAPE_KEY_CODE) {
        hideCard();
      }
    };

    var hideCard = function () {
      /*dialog.style.display = 'none';*/                        // неактуально, т. к. элемент удаляется, а не прячется
      dialog.remove();
      /*dialogClose.removeEventListener('click', hideCard);*/   // нужно ли это, если элемент исчез?
      /*window.removeEventListener('keydown', onKeyDown);*/     // нужно ли это, если элемент исчез?
      closeHandler();
    };


    var showDialog = function () {
      if (dialog) {
        dialog.remove(); // уберём, если что-то есть
      }

      var dialogTemplate = document.querySelector('#dialog-template');       // находим шаблон
      var dialogToClone = dialogTemplate.content.querySelector('.dialog');   // а в нём то, что будем копировать

      dialog = dialogToClone.cloneNode(true);                                // создали диалог-копию
      dialogClose = dialog.querySelector('.dialog__close');

      document.querySelector('.tokyo').appendChild(dialog);                        // диалог -- на карту

      var lodgeTitle = dialog.querySelector('.lodge__title');
      var dialogTitle = dialog.querySelector('.dialog__title');
      var lodgeAddress = dialog.querySelector('.lodge__address');
      var lodgePrice = dialog.querySelector('.lodge__price');
      var lodgeType = dialog.querySelector('.lodge__type');
      var lodgeRG = dialog.querySelector('.lodge__rooms-and-guests');
      var lodgeCTime = dialog.querySelector('.lodge__checkin-time');
      var lodgeDescription = dialog.querySelector('.lodge__description');
      var lodgeFeatures = dialog.querySelector('.lodge__features');
      var lodgePhotos = dialog.querySelector('.lodge__photos');

      lodgeTitle.innerText = lodgeData.offer.title;

      var dialogTitleImage = document.createElement('img');
      dialogTitleImage.setAttribute('alt', 'Avatar');
      dialogTitleImage.setAttribute('width', '70');
      dialogTitleImage.setAttribute('height', '70');
      dialogTitleImage.setAttribute('src', lodgeData.author.avatar);
      dialogTitle.insertBefore(dialogTitleImage, dialogClose);

      lodgeAddress.innerText = lodgeData.offer.address;
      lodgePrice.innerText = lodgeData.offer.price + ' ₽/ночь';

      switch (lodgeData.type) {
        case 'flat':
          lodgeType.innerText = 'Квартира';
          break;
        case 'bungalo':
          lodgeType.innerText = 'Бунгало';
          break;
        case 'house':
          lodgeType.innerText = 'Дом';
      }

      switch (lodgeData.offer.rooms) {
        case 0:
          lodgeRG.innerText = 'Нет комнат для гостей';
          break;
        case 1:
          switch (lodgeData.offer.guests) {
            case 0:
              lodgeRG.innerText = '1 комната';
              break;
            case 1:
              lodgeRG.innerText = '1 комната для ' + lodgeData.offer.guests + ' гостя';
          }
          break;
        case 2:
          lodgeRG.innerText = lodgeData.offer.rooms + ' комнаты для ' + lodgeData.offer.guests + ' гостей';
          break;
        case 100:
          lodgeRG.innerText = lodgeData.offer.rooms + ' комнат для ' + lodgeData.offer.guests + ' гостей';
          break;
      }

      lodgeCTime.innerText = 'Заезд после ' + lodgeData.offer.checkin + ', выезд до ' + lodgeData.offer.checkout;


      for (var i = 0; i < lodgeData.offer.photos.length; i++) {
        var lodgePhoto = document.createElement('img');
        lodgePhoto.setAttribute('alt', 'Lodge photo');
        lodgePhoto.setAttribute('width', '52');
        lodgePhoto.setAttribute('height', '42');
        lodgePhoto.setAttribute('src', lodgeData.offer.photos[i]);
        lodgePhotos.appendChild(lodgePhoto); // как добавить пробелы?
      }


      for (var j = 0; j < lodgeData.offer.features.length; j++) {
        var lodgeFeature = document.createElement('span');
        lodgeFeature.classList.add('feature__image');
        lodgeFeature.classList.add('feature__image--' + lodgeData.offer.features[j]);
        lodgeFeatures.appendChild(lodgeFeature);
      }


      lodgeDescription.innerText = lodgeData.offer.description;

      /*dialog.style.display = 'block';*/
      dialogClose.addEventListener('click', hideCard);
      dialogClose.setAttribute('aria-pressed', 'false');
      window.addEventListener('keydown', onKeyDown);
    };

    showDialog();
  };
})();
