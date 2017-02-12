'use strict';
(function () {
  window.initializePins = function (pinMap, pins, dialog, dialogClose) {
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

    /* var openDialog = function () {
      dialog.style.display = 'block';
      dialogClose.setAttribute('aria-pressed', 'false');
      window.addEventListener('keydown', dialogKeydownHandler);
    }; */

    var closeDialog = function () {
      dialog.style.display = 'none';
      dialogClose.setAttribute('aria-pressed', 'true');
      window.removeEventListener('keydown', dialogKeydownHandler);
    };

    var ENTER_KEY_CODE = 13;
    var ESCAPE_KEY_CODE = 27;

    var showLodgeInfo = function (clickedPin) {
      deactivatePins(pins);
      activatePin(clickedPin);
      openDialog(dialog, dialogClose, dialogKeydownHandler);
    };

    var hideLodgeInfo = function () {
      deactivatePins(pins);
      closeDialog(dialog, dialogClose);
    };

    var dialogKeydownHandler = function (evt) {
      if (evt.keyCode === ESCAPE_KEY_CODE) {
        hideLodgeInfo();
      }
    };

    if (dialog.style.display !== 'none') {
      window.addEventListener('keydown', dialogKeydownHandler);
    }

    dialogClose.addEventListener('click', hideLodgeInfo);

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
        showLodgeInfo(evt.currentTarget);
      }
    });
  };
})();
