'use strict';
(function () {
  window.synchronizeFields = function (fieldIn, arrayIn, arrayOut, callback) {
    fieldIn.addEventListener('change', function () {
      callback(arrayOut[arrayIn.indexOf(fieldIn.value)]);
    });
  };
})();
