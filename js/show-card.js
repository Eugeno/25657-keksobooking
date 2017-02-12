'use strict';
(function () {
  window.openDialog = function (dialog, dialogClose, dialogKeydownHandler) {
    dialog.style.display = 'block';
    dialogClose.setAttribute('aria-pressed', 'false');
    window.addEventListener('keydown', dialogKeydownHandler);
  };
})();
