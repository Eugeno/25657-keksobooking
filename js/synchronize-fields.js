'use strict';
(function () {
  window.synchronizeFields = function (fieldIn, fieldOut, arrayIn, arrayOut, callback) {
    fieldIn.addEventListener('change', function () {
      callback(arrayOut[arrayIn.indexOf(fieldIn.value)]);
    });
  };
})();
