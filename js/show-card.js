'use strict';
(function () {
  window.openDialog = function () {
    dialog.style.display = 'block';
    dialogClose.setAttribute('aria-pressed', 'false');
    window.addEventListener('keydown', dialogKeydownHandler);
  };
})();
