'use strict';

var pinMap = document.querySelector('.tokyo__pin-map');
var pins = pinMap.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');
var dialogClose = dialog.querySelector('.dialog__close');
window.initializePins(pinMap, pins, dialog, dialogClose);

var formTime = document.querySelector('#time');
var formTimeout = document.querySelector('#timeout');
var formTimeValues = ['12', '13', '14'];
var formTimeoutValues = ['12', '13', '14'];
window.synchronizeFields(formTime, formTimeout, formTimeValues, formTimeoutValues, 'value');
window.synchronizeFields(formTimeout, formTime, formTimeoutValues, formTimeValues, 'value');

var formType = document.querySelector('#type');
var formPrice = document.querySelector('#price');
var formTypeValues = ['flat', 'shack', 'palace'];
var formPriceValues = ['1000', '0', '10000'];
window.synchronizeFields(formType, formPrice, formTypeValues, formPriceValues, 'min');

var formRoomNumber = document.querySelector('#room_number');
var formCapacity = document.querySelector('#capacity');
var formRoomNumberValues = ['1', '2', '100'];
var formCapacityValues = ['0', '3', '3'];
window.synchronizeFields(formRoomNumber, formCapacity, formRoomNumberValues, formCapacityValues, 'value');
window.synchronizeFields(formCapacity, formRoomNumber, formCapacityValues, formRoomNumberValues, 'value');

