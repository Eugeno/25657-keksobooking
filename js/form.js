'use strict';

var pinMap = document.querySelector('.tokyo__pin-map');
var pins = pinMap.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');
var dialogClose = dialog.querySelector('.dialog__close');

window.initializePins(pinMap, pins, dialog, dialogClose);

var formTime = document.querySelector('#time');
var formTimeout = document.querySelector('#timeout');

window.synchronizeFields(formTime, formTimeout, ['12', '13', '14'], ['12', '13', '14'], 'value');
window.synchronizeFields(formTimeout, formTime, ['12', '13', '14'], ['12', '13', '14'], 'value');

var formType = document.querySelector('#type');
var formPrice = document.querySelector('#price');

window.synchronizeFields(formType, formPrice, ['flat', 'shack', 'palace'], ['1000', '0', '10000'], 'min');

var formRoomNumber = document.querySelector('#room_number');
var formCapacity = document.querySelector('#capacity');

window.synchronizeFields(formRoomNumber, formCapacity, ['1', '2', '100'], ['0', '3', '3'], 'value');
window.synchronizeFields(formCapacity, formRoomNumber, ['0', '3', '3'], ['1', '2', '100'], 'value');

