'use strict';

var pinMap = document.querySelector('.tokyo__pin-map');
var pins = pinMap.querySelectorAll('.pin');
window.initializePins(pinMap, pins);

var formTime = document.querySelector('#time');
var formTimeout = document.querySelector('#timeout');
var formTimeValues = ['12', '13', '14'];
var formTimeoutValues = ['12', '13', '14'];
window.synchronizeFields(formTime, formTimeValues, formTimeoutValues, function (newValue) {
  formTimeout.value = newValue;
});
window.synchronizeFields(formTimeout, formTimeoutValues, formTimeValues, function (newValue) {
  formTime.value = newValue;
});

var formType = document.querySelector('#type');
var formPrice = document.querySelector('#price');
var formTypeValues = ['flat', 'shack', 'palace'];
var formPriceValues = ['1000', '0', '10000'];
window.synchronizeFields(formType, formTypeValues, formPriceValues, function (newValue) {
  formPrice.min = newValue;
});

var formRoomNumber = document.querySelector('#room_number');
var formCapacity = document.querySelector('#capacity');
var formRoomNumberValues = ['1', '2', '100'];
var formCapacityValues = ['0', '3', '3'];
window.synchronizeFields(formRoomNumber, formRoomNumberValues, formCapacityValues, function (newValue) {
  formCapacity.value = newValue;
});
window.synchronizeFields(formCapacity, formCapacityValues, formRoomNumberValues, function (newValue) {
  formRoomNumber.value = newValue;
});
