'use strict';
(function () {
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;
  
  var dialog = document.querySelector('.dialog');
  var dialogClose = dialog.querySelector('.dialog__close');

  window.showCard = function (closeHandler) {             // сначала смотрим строку 23, где движуха
    var onKeyDown = function (e) {                        // а тут смотрим, что же нажалось
                                                          // ниже хитрое условие: либо esc, либо enter по крестику
      if ((e.target === dialogClose && e.keyCode === ENTER_KEY_CODE) || e.keyCode === ESCAPE_KEY_CODE) {
        hideCard();                                       // и если это так, то вызываем функцию прятания
      }
    };

    var hideCard = function() {                           // вот и функция прятания
      dialog.style.display = 'none';                      // скрываем диалог
      dialogClose.removeEventListener('click', hideCard); // не ждём кликов по крестику
      window.removeEventListener('keydown', onKeyDown);   // или чего-то с клавиатуры
      closeHandler();                                     // а вот он и коллбек, благодаря ему мы уже и будем прятать пины, я понял!
    };
    
    dialog.style.display = 'block';                       // показали сам диалог
    dialogClose.addEventListener('click', hideCard);      // теперь можем ожидать клика на крестик, что вызывает прятание
    window.addEventListener('keydown', onKeyDown);        // или что-то с клавиатуры (идём на строку 9)

    dialogClose.setAttribute('aria-pressed', 'false');
    
  };
})();
