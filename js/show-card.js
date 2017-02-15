'use strict';
(function () {
  var dialog = document.querySelector('.dialog');
  var dialogClose = dialog.querySelector('.dialog__close');

  var ESCAPE_KEY_CODE = 27;

  window.openDialog = function (hideLodgeInfo) {
    dialog.style.display = 'block';
    dialogClose.setAttribute('aria-pressed', 'false');
    window.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ESCAPE_KEY_CODE) {
          hideLodgeInfo();
        }
    });

    dialogClose.addEventListener('click', hideLodgeInfo);
  };
})();
