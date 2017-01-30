'use strict';

var pin = document.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');
var dialogClose = dialog.querySelector('.dialog__close');

var deactivatePins = function () {
  for (var i = 0; i < pin.length; i++){
    pin[i].classList.remove('pin--active');
  }
};

for (var i = 0; i < pin.length; i++){
  pin[i].addEventListener('click', function () {
    deactivatePins();
    this.classList.add('pin--active');
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
  formTimeout.selectedIndex = this.selectedIndex;
});

formTimeout.addEventListener('change', function () {
  formTime.selectedIndex = this.selectedIndex;
});

var formType = document.querySelector('#type');
var formPrice = document.querySelector('#price');

formType.addEventListener('change', function () {
  if (this.value === 'flat') {
    formPrice.setAttribute('min', '1000');
  } else if (this.value === 'shack') {
    formPrice.setAttribute('min', '0');
  } else if (this.value === 'palace') {
    formPrice.setAttribute('min', '10000');
  }

  /* Почему не работает это обнуление? */
  if (formPrice.value < formPrice.min) {
    formPrice.value = '';
  }
});

var formRoomNumber = document.querySelector('#room_number');
var formCapacity = document.querySelector('#capacity');

formRoomNumber.addEventListener('change', function () {
  if (this.value === '1') {
    formCapacity.value = '0';
  } else if (this.value === '2' || this.value === '100') {
    formCapacity.value = '3';
  }
});

formCapacity.addEventListener('change', function () {
  if (this.value === '0') {
    formRoomNumber.value = '1';
  } else if (this.value === '3') {
    formRoomNumber.value = '2';
  }
});


