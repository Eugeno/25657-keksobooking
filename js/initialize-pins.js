(function(){
  window.deactivatePins = function (pins) {
    for (var i = 0; i < pins.length; i++) {
      pins[i].classList.remove('pin--active');
      pins[i].setAttribute('aria-pressed', 'false');
    }
  };

  window.activatePin = function (clickedPin) {
    clickedPin.classList.add('pin--active');
    clickedPin.setAttribute('aria-pressed', 'true');
  };

  window.openDialog = function (dialog, dialogClose) {
    dialog.style.display = 'block';
    dialogClose.setAttribute('aria-pressed', 'false');
    window.addEventListener('keydown', dialogKeydownHandler);
  };

  window.closeDialog = function (dialog, dialogClose) {
    dialog.style.display = 'none';
    dialogClose.setAttribute('aria-pressed', 'true');
    window.removeEventListener('keydown', dialogKeydownHandler);
  };
})();