'use strict';
(function () {
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  var tokyoMap = document.querySelector('.tokyo');

  var dialogTemplate = document.querySelector('#dialog-template');
  var dialogToClone = dialogTemplate.content.querySelector('.dialog');

  var dialog;
  var dialogClose;
  var dialogHandler;

  var getOfferTypeText = function (lodgeType) {
    var retVal = '';
    switch (lodgeType) {
      case 'flat':
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

    switch (rooms % 10) {
      case 0:
        roomsText = 'Нет комнат';
        break;
      case 1:
        roomsText = rooms + ' комната';
        break;
      case 2:
      case 3:
      case 4:
        roomsText = rooms + ' комнаты';
        break;
      default:
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

  var removeOldDialog = function (oldDialog) {
    if (oldDialog) {
      oldDialog.remove();
    }
  };

  var fillDialog = function (newDialog, lodgeData) {
    var dialogTitle = newDialog.querySelector('.dialog__title');
    var lodgeTitle = newDialog.querySelector('.lodge__title');
    var lodgeAddress = newDialog.querySelector('.lodge__address');
    var lodgePrice = newDialog.querySelector('.lodge__price');
    var lodgeType = newDialog.querySelector('.lodge__type');
    var lodgeRG = newDialog.querySelector('.lodge__rooms-and-guests');
    var lodgeCTime = newDialog.querySelector('.lodge__checkin-time');
    var lodgeDescription = newDialog.querySelector('.lodge__description');
    var lodgeFeatures = newDialog.querySelector('.lodge__features');
    var lodgePhotos = newDialog.querySelector('.lodge__photos');
    var i;

    var dialogTitleImage = document.createElement('img');
    dialogTitleImage.setAttribute('width', '70');
    dialogTitleImage.setAttribute('height', '70');
    dialogTitleImage.setAttribute('alt', 'Avatar');
    dialogTitleImage.setAttribute('src', lodgeData.author.avatar);
    dialogTitle.insertBefore(dialogTitleImage, dialogTitle.firstChild);

    lodgeTitle.innerText = lodgeData.offer.title;
    lodgeAddress.innerText = lodgeData.offer.address;
    lodgePrice.innerText = lodgeData.offer.price + ' ₽/ночь';

    lodgeType.innerText = getOfferTypeText(lodgeData.offer.type);
    lodgeRG.innerText = getOfferRoomsText(lodgeData.offer.rooms, lodgeData.offer.guests);

    lodgeCTime.innerText = 'Заезд после ' + lodgeData.offer.checkin + ', выезд до ' + lodgeData.offer.checkout;

    for (i = 0; i < lodgeData.offer.features.length; i++) {
      var lodgeFeature = document.createElement('span');
      lodgeFeature.classList.add('feature__image');
      lodgeFeature.classList.add('feature__image--' + lodgeData.offer.features[i]);
      lodgeFeatures.appendChild(lodgeFeature);
    }

    lodgeDescription.innerText = lodgeData.offer.description;

    for (i = 0; i < lodgeData.offer.photos.length; i++) {
      var lodgePhoto = document.createElement('img');
      lodgePhoto.setAttribute('width', '52');
      lodgePhoto.setAttribute('height', '42');
      lodgePhoto.setAttribute('alt', 'Lodge photo');
      lodgePhoto.setAttribute('src', lodgeData.offer.photos[i]);
      lodgePhotos.appendChild(lodgePhoto);
    }
  };

  var onKeyDown = function (e) {
    if ((e.target === dialogClose && e.keyCode === ENTER_KEY_CODE) || e.keyCode === ESCAPE_KEY_CODE) {
      hideCard();
    }
  };

  var closeHandler;

  var startPoint;
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startPoint.x - moveEvt.clientX,
      y: startPoint.y - moveEvt.clientY
    };
    if (dialog.offsetTop - shift.y < 0) {
      dialog.style.top = 0;
    } else if (tokyoMap.offsetHeight - (dialog.offsetTop + dialog.offsetHeight - shift.y) < 0) {
      dialog.style.top = tokyoMap.offsetHeight - dialog.offsetHeight + 'px';
    } else {
      dialog.style.top = (dialog.offsetTop - shift.y) + 'px';
    }
    if (dialog.offsetLeft - shift.x < 0) {
      dialog.style.left = 0;
    } else if (tokyoMap.offsetWidth - (dialog.offsetLeft + dialog.offsetWidth - shift.x) < 0) {
      dialog.style.left = tokyoMap.offsetWidth - dialog.offsetWidth + 'px';
    } else {
      dialog.style.left = (dialog.offsetLeft - shift.x) + 'px';
    }
    startPoint = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
  };

  var isDragging = false;
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    isDragging = false;
  };

  var dragDialogHandler = function (evt) {
    evt.preventDefault();
    if (isDragging) {
      onMouseUp();
    }
    isDragging = true;
    startPoint = {
      x: evt.clientX,
      y: evt.clientY
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var showCard = function (closeCallback, lodgeData) {
    closeHandler = closeCallback;
    removeOldDialog(dialog);
    dialog = dialogToClone.cloneNode(true);
    dialogClose = dialog.querySelector('.dialog__close');
    fillDialog(dialog, lodgeData);
    tokyoMap.appendChild(dialog);
    dialogClose.addEventListener('click', hideCard);
    window.addEventListener('keydown', onKeyDown);
    dialogHandler = dialog.querySelector('.dialog__title img');
    dialogHandler.addEventListener('mousedown', dragDialogHandler);
  };

  var hideCard = function () {
    if (dialogClose) {
      dialogClose.removeEventListener('click', hideCard);
    }
    window.removeEventListener('keydown', onKeyDown);
    removeOldDialog(dialog);
    if (closeHandler) {
      closeHandler();
    }
    dialogHandler.removeEventListener('mousedown', dragDialogHandler);
  };

  window.card = {
    show: showCard,
    hide: hideCard
  };
})();
