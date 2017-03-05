'use strict';
(function () {
  var startPoint;
  var dragHandler;

  var startDnD = function (draggedElement, handlerElement, boundingBox, updateCallback) {
    dragHandler = function (evt) {
      evt.preventDefault();
      if (isDragging) {
        onMouseUp();
      }
      isDragging = true;
      startPoint = {
        x: evt.clientX,
        y: evt.clientY
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    handlerElement.addEventListener('mousedown', dragHandler);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startPoint.x - moveEvt.clientX,
        y: startPoint.y - moveEvt.clientY
      };
      if (draggedElement.offsetTop - shift.y < 0) {
        draggedElement.style.top = 0;
      } else if (boundingBox.offsetHeight - (draggedElement.offsetTop + draggedElement.offsetHeight - shift.y) < 0) {
        draggedElement.style.top = boundingBox.offsetHeight - draggedElement.offsetHeight + 'px';
      } else {
        draggedElement.style.top = (draggedElement.offsetTop - shift.y) + 'px';
      }
      if (draggedElement.offsetLeft - shift.x < 0) {
        draggedElement.style.left = 0;
      } else if (boundingBox.offsetWidth - (draggedElement.offsetLeft + draggedElement.offsetWidth - shift.x) < 0) {
        draggedElement.style.left = boundingBox.offsetWidth - draggedElement.offsetWidth + 'px';
      } else {
        draggedElement.style.left = (draggedElement.offsetLeft - shift.x) + 'px';
      }
      startPoint = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      if (updateCallback) {
        updateCallback();
      }
    };

    var isDragging = false;
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      isDragging = false;
    };
  };

  var stoprDnD = function (handlerElement) {
    handlerElement.removeEventListener('mousedown', dragHandler);
  };

  window.dragAndDrop = {
    start: startDnD,
    stop: stoprDnD
  };
})();
