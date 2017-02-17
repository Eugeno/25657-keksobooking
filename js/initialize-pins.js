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

    var showLodgeInfo = function (clickedPin) {
      deactivatePins(pins);
      activatePin(clickedPin);
      window.showCard(hideLodgeInfo);
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
      showLodgeInfo(clickedPin);
    };

    pinMap.addEventListener('click', pinClickHandler);
    pinMap.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEY_CODE) {
        savedPin = evt.target;
        showLodgeInfo(evt.target);
      }
    });
  };
})();
