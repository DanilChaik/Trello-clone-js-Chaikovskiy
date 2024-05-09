
let cardMoving = false;
function setDragLists() {
  if(!cardMoving) {
    const dragLists = document.querySelectorAll('.dragList');
    const dragListsCont = document.getElementById('listsArray');
    
    dragLists.forEach( dragList => {
      dragList.addEventListener('dragstart', (e) => {
        dragList.classList.add('list-dragging');
      });
  
      dragList.addEventListener('dragend', (e) => {
        dragList.classList.remove('list-dragging');
      });
    });
  
    dragListsCont.addEventListener('dragover', e => {
      e.preventDefault();
      const passedElement = getPassedList(dragListsCont, e.clientX);
      console.log('lol');
      const draggable = document.querySelector('.list-dragging');
      dragListsCont.insertBefore(draggable, passedElement);
      
      if (passedElement == null) {
        modListtoEnd(draggable);
      } else {
        modList(draggable, passedElement);
      }
    });
  }
  
  function getPassedList(container, x) {
    const dragElements = [...container.querySelectorAll('.dragList:not(.list-dragging')];
  
    return dragElements.reduce( (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = x - box.right /* - (box.width/2) */;
      //console.log(offset);
  
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child}
      } else return closest
    }, {offset: Number.NEGATIVE_INFINITY}).element;
  }
}
