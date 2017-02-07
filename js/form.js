'use strict';

var pinMap = document.querySelector('.tokyo__pin-map');
var pins = pinMap.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');
var dialogClose = dialog.querySelector('.dialog__close');

var ENTER_KEY_CODE = 13;
var ESCAPE_KEY_CODE = 27;

var showLodgeInfo = function (clickedPin) {
  deactivatePins(pins);
  activatePin(clickedPin);
  openDialog(dialog, dialogClose);
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

dialogClose.addEventListener('click', hideLodgeInfo);

var formTime = document.querySelector('#time');
var formTimeout = document.querySelector('#timeout');

formTime.addEventListener('change', function () {
  formTimeout.selectedIndex = formTime.selectedIndex;
});

formTimeout.addEventListener('change', function () {
  formTime.selectedIndex = formTimeout.selectedIndex;
});

var formType = document.querySelector('#type');
var formPrice = document.querySelector('#price');

formType.addEventListener('change', function () {
  if (formType.value === 'flat') {
    formPrice.setAttribute('min', '1000');
  } else if (formType.value === 'shack') {
    formPrice.setAttribute('min', '0');
  } else if (formType.value === 'palace') {
    formPrice.setAttribute('min', '10000');
  }

  if (parseInt(formPrice.value, 10) < parseInt(formPrice.min, 10)) {
    formPrice.value = '';
  }
});

var formRoomNumber = document.querySelector('#room_number');
var formCapacity = document.querySelector('#capacity');

formRoomNumber.addEventListener('change', function () {
  if (formRoomNumber.value === '1') {
    formCapacity.value = '0';
  } else if (formRoomNumber.value === '2' || formRoomNumber.value === '100') {
    formCapacity.value = '3';
  }
});

formCapacity.addEventListener('change', function () {
  if (formCapacity.value === '0') {
    formRoomNumber.value = '1';
  } else if (formCapacity.value === '3') {
    formRoomNumber.value = '2';
  }
});


