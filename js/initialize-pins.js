'use strict';
(function () {
  var ENTER_KEY_CODE = 13;
  var formFilter = document.querySelector('.tokyo__filters-container');
  var similarApartments = [];
  var pinTemplate = document.querySelector('#pin-template');
  var pinToClone = pinTemplate.content.querySelector('.pin');
  var tokyoMap = document.querySelector('.tokyo');
  var pinMain = tokyoMap.querySelector('.pin__main');
  var addressInput = document.querySelector('#address');

  var startPoint;
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startPoint.x - moveEvt.clientX,
      y: startPoint.y - moveEvt.clientY
    };
    if (pinMain.offsetTop - shift.y < 0) {
      pinMain.style.top = 0;
    } else if (tokyoMap.offsetHeight - (pinMain.offsetTop + pinMain.offsetHeight - shift.y) < 0) {
      pinMain.style.top = tokyoMap.offsetHeight - pinMain.offsetHeight + 'px';
    } else {
      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
    }
    if (pinMain.offsetLeft - shift.x < 0) {
      pinMain.style.left = 0;
    } else if (tokyoMap.offsetWidth - (pinMain.offsetLeft + pinMain.offsetWidth - shift.x) < 0) {
      pinMain.style.left = tokyoMap.offsetWidth - pinMain.offsetWidth + 'px';
    } else {
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
    }
    startPoint = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    addressInput.value = 'x: ' + (startPoint.x + parseInt(pinMain.offsetWidth / 2, 10)) + ', y: ' + (startPoint.y + pinMain.offsetHeight);
  };

  var isDragging = false;
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    isDragging = false;
  };

  var dragPinHandler = function (evt) {
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

  var getFilters = function () {
    return {
      'type': formFilter.querySelector('#housing_type').value,
      'price': formFilter.querySelector('#housing_price').value,
      'rooms': formFilter.querySelector('#housing_room-number').value,
      'guests': formFilter.querySelector('#housing_guests-number').value,
      'features': {
        'wifi': formFilter.querySelector('[value=wifi]').checked,
        'dishwasher': formFilter.querySelector('[value=dishwasher]').checked,
        'parking': formFilter.querySelector('[value=parking]').checked,
        'washer': formFilter.querySelector('[value=washer]').checked,
        'elevator': formFilter.querySelector('[value=elevator]').checked,
        'conditioner': formFilter.querySelector('[value=conditioner]').checked
      }
    };
  };

  var pinIsValid = function (apartmentData, filterData) {
    return (
      (filterData.type === 'any' || filterData.type === apartmentData.offer.type) &&
      (
        (filterData.price === 'low' && apartmentData.offer.price < 10000) ||
        (filterData.price === 'middle' && apartmentData.offer.price >= 10000 && +apartmentData.offer.price <= 50000) ||
        (filterData.price === 'high' && apartmentData.offer.price > 50000)
      ) &&
      (filterData.rooms === 'any' || +filterData.rooms === apartmentData.offer.rooms) &&
      (filterData.guests === 'any' || +filterData.guests === apartmentData.offer.guests) &&
      (!filterData.features.wifi || filterData.features && apartmentData.offer.features.indexOf('wifi') !== -1) &&
      (!filterData.features.dishwasher || filterData.features && apartmentData.offer.features.indexOf('dishwasher') !== -1) &&
      (!filterData.features.parking || filterData.features && apartmentData.offer.features.indexOf('parking') !== -1) &&
      (!filterData.features.washer || filterData.features && apartmentData.offer.features.indexOf('washer') !== -1) &&
      (!filterData.features.elevator || filterData.features && apartmentData.offer.features.indexOf('elevator') !== -1) &&
      (!filterData.features.conditioner || filterData.features && apartmentData.offer.features.indexOf('conditioner') !== -1)
    );
  };

  var updatePins = function (oldPins, pinsContainer, maxPins) {
    var filterData = getFilters();
    var pins = [];
    oldPins.forEach(function (oldPin) {
      oldPin.remove();
    });
    window.card.hide();

    var createPinElement = function (apartment, i) {
      newPin = pinToClone.cloneNode(true);
      pinsContainer.appendChild(newPin);
      newPin.querySelector('img').src = apartment.author.avatar;
      newPin.style.left = apartment.location.x + 'px';
      newPin.style.top = apartment.location.y + 'px';
      newPin.setAttribute('data-pin', i.toString());
      return newPin;
    };

    for (var i = 0; i < similarApartments.length; i++) {
      var apartment = similarApartments[i];
      if (pinIsValid(apartment, filterData)) {
        var newPin = createPinElement(apartment, i);
        pins.push(newPin);
      }
      if (pins.length === maxPins) {
        break;
      }
    }

    return pins;
  };

  window.initializePins = function (pinMap) {
    var pins = [];
    var savedPin;
    var PIN_DARA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';
    pinMain.addEventListener('mousedown', dragPinHandler);

    var activatePin = function (clickedPin) {
      clickedPin.classList.add('pin--active');
      clickedPin.setAttribute('aria-pressed', 'true');
    };

    var deactivatePins = function () {
      for (var i = 0; i < pins.length; i++) {
        pins[i].classList.remove('pin--active');
        pins[i].setAttribute('aria-pressed', 'false');
      }
    };

    var showLodgeInfo = function (clickedPin, curLodgeData) {
      deactivatePins(pins);
      window.card.show(hideLodgeInfo, curLodgeData);
      activatePin(clickedPin);
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
      if (!e.target.classList.contains('pin__main') && !e.target.parentNode.classList.contains('pin__main')) {
        if (e.target.hasAttribute('data-pin')) {
          clickedPin = e.target;
        } else if (e.target.parentNode.hasAttribute('data-pin')) {
          clickedPin = e.target.parentNode;
        }
        showLodgeInfo(clickedPin, similarApartments[clickedPin.getAttribute('data-pin')]);
      }
    };

    var pinKeydownHandler = function (e) {
      if (e.keyCode === ENTER_KEY_CODE) {
        var clickedPin = e.target;
        savedPin = clickedPin;
        showLodgeInfo(clickedPin, similarApartments[clickedPin.getAttribute('data-pin')]);
      }
    };

    var onLoad = function (data) {
      var MAX_PINS_COUNT = 3;
      similarApartments = JSON.parse(data);
      pins = updatePins(pins, pinMap, MAX_PINS_COUNT);
    };

    formFilter.addEventListener('change', function () {
      pins = updatePins(pins, pinMap);
    });

    window.load(PIN_DARA_URL, onLoad);

    pinMap.addEventListener('click', pinClickHandler);
    pinMap.addEventListener('keydown', pinKeydownHandler);
  };
})();
