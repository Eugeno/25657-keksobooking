window.synchronizeFields = function(fieldIn, fieldOut, arrayIn, arrayOut, valueOut) {
  fieldIn.addEventListener('change', function () {
    fieldOut[valueOut] = arrayOut[arrayIn.indexOf(fieldIn.value)];
  });
};