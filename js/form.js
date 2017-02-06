'use strict';

var pinMap = document.querySelector('.tokyo__pin-map');
var pin = pinMap.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');
var dialogClose = dialog.querySelector('.dialog__close');

var ENTER_KEY_CODE = 13;
var ESCAPE_KEY_CODE = 27;

var deactivatePins = function () {
  for (var i = 0; i < pin.length; i++) {
    pin[i].classList.remove('pin--active');
    pin[i].setAttribute('aria-pressed', 'false');
  }
};

var activateDialog = function (e) {
  deactivatePins();
  e.classList.add('pin--active');
  e.setAttribute('aria-pressed', 'true');
  dialog.style.display = 'block';
  dialogClose.setAttribute('aria-pressed', 'false');
  window.addEventListener('keydown', dialogKeydownHandler);
};

var deactivateDialog = function () {
  deactivatePins();
  dialog.style.display = 'none';
  dialogClose.setAttribute('aria-pressed', 'true');
  window.removeEventListener('keydown', dialogKeydownHandler);
};

var dialogKeydownHandler = function (evt) {
  if (evt.keyCode === ESCAPE_KEY_CODE) {
    deactivateDialog();
  }
};

if (dialog.style.display !== 'none') {
  window.addEventListener('keydown', dialogKeydownHandler)
}

var pinClickHandler = function (e) {
  var clickedPin;
  if (e.target.classList.contains('pin')) {
    clickedPin = e.target;
  } else {
    clickedPin = e.target.parentNode;
  }
  activateDialog(clickedPin);
};

pinMap.addEventListener('click', pinClickHandler);

for (var i = 0; i < pin.length; i++) {
  pin[i].setAttribute('role', 'button');
  pin[i].setAttribute('tabindex', '0');

  pin[i].addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      activateDialog(evt.currentTarget);
    }
  });
}

dialogClose.addEventListener('click', deactivateDialog);

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


