'use strict';

var pin = document.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');
var dialogClose = dialog.querySelector('.dialog__close');

var deactivatePins = function () {
  for (var i = 0; i < pin.length; i++) {
    pin[i].classList.remove('pin--active');
  }
};

for (var i = 0; i < pin.length; i++) {
  pin[i].addEventListener('click', function (e) {
    deactivatePins();
    e.currentTarget.classList.add('pin--active');
    dialog.style.display = 'block';
  });
}

dialogClose.addEventListener('click', function () {
  deactivatePins();
  dialog.style.display = 'none';
});

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


