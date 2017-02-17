'use strict';
(function () {
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;
  
  var dialog = document.querySelector('.dialog');
  var dialogClose = dialog.querySelector('.dialog__close');

  window.showCard = function (closeHandler) {
    var onKeyDown = function (e) {
      if ((e.target === dialogClose && e.keyCode === ENTER_KEY_CODE) || e.keyCode === ESCAPE_KEY_CODE) {
        hideCard();
      }
    };

    var hideCard = function() {
      dialog.style.display = 'none';
      dialogClose.removeEventListener('click', hideCard);
      window.removeEventListener('keydown', onKeyDown);
      closeHandler();
    };

    dialog.style.display = 'block';
    dialogClose.addEventListener('click', hideCard);
    dialogClose.setAttribute('aria-pressed', 'false');
    window.addEventListener('keydown', onKeyDown);
  };
})();
