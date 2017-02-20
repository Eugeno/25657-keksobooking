'use strict';
(function () {
  var ENTER_KEY_CODE = 13;
  var formFilter = document.querySelector('.tokyo__filters-container');
  var similarApartments = [];
  var pinTemplate = document.querySelector('#pin-template');
  var pinToClone = pinTemplate.content.querySelector('.pin');
  var lodgeData = [];

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
        (filterData.price === 'middle' && apartmentData.offer.price >= 10000 && +similarApartments.offer.price <= 50000) ||
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

  var updatePins = function (oldPins, pinsContainer) {
    var filterData = getFilters();
    var pins = [];
    var MAX_PINS_COUNT = 3;
    var pinsCount = MAX_PINS_COUNT;
    var i;
    var oldDialog = document.querySelector('.dialog');
    for (i = 0; i < oldPins.length; i++) {
      oldPins[i].remove();
    }
    if (oldDialog) {
      oldDialog.remove();
    }

    if (MAX_PINS_COUNT > similarApartments.length) {
      pinsCount = similarApartments.length;
    }

    for (i = 0; i < pinsCount; i++) {
      if (pinIsValid(similarApartments[i], filterData)) {
        var newPin = pinToClone.cloneNode(true);
        pinsContainer.appendChild(newPin);
        newPin.querySelector('img').src = similarApartments[i].author.avatar;
        newPin.style.left = similarApartments[i].location.x + 'px';
        newPin.style.top = similarApartments[i].location.y + 'px';
        newPin.setAttribute('data-pin', i.toString());
        pins.push(newPin);
        lodgeData[i] = similarApartments[i];
      } else {
        if (pinsCount < similarApartments.length) {
          pinsCount++;
        }
      }
    }

    return pins;
  };

  window.initializePins = function (pinMap) {
    var pins = [];
    var savedPin;
    var PIN_DARA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';

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
      activatePin(clickedPin);
      window.showCard(hideLodgeInfo, curLodgeData);
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
      if (e.target.hasAttribute('data-pin')) {
        clickedPin = e.target;
      } else if (e.target.parentNode.hasAttribute('data-pin')) {
        clickedPin = e.target.parentNode;
      }
      showLodgeInfo(clickedPin, lodgeData[clickedPin.getAttribute('data-pin')]);
    };

    var pinKeydownHandler = function (e) {
      if (e.keyCode === ENTER_KEY_CODE) {
        var clickedPin = e.target;
        savedPin = clickedPin;
        showLodgeInfo(clickedPin, lodgeData[clickedPin.getAttribute('data-pin')]);
      }
    };

    var onLoad = function (data) {
      similarApartments = JSON.parse(data);
      pins = updatePins(pins, pinMap);
    };

    formFilter.addEventListener('change', function () {
      pins = updatePins(pins, pinMap);
    });

    window.load(PIN_DARA_URL, onLoad);

    pinMap.addEventListener('click', pinClickHandler);
    pinMap.addEventListener('keydown', pinKeydownHandler);
  };
})();
