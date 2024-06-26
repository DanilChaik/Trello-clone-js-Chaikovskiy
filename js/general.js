let listsArr = JSON.parse(sessionStorage.getItem('listsArr'));
if (listsArr === null) {
  listsArr = [];
}

function renderBoard() {

  document.getElementById('listsArray').innerHTML = "";

  listsArr.forEach( (list, index) => {
    const listInfo = injectList(list);
    listInfo[0].button.addEventListener('click', () => {
      if (listInfo[0].value.value.length) {
        list.cards.push(listInfo[0].value.value);
        listInfo[0].value.value = '';
        renderBoard();
      };
    });
    document.addEventListener('keydown', (e) => {
      if (listInfo[0].value.value.length && e.key === 'Enter') {
        list.cards.push(listInfo[0].value.value);
        listInfo[0].value.value = '';
        renderBoard();
      };
    });

    listInfo[0].edit.addEventListener('click', () => {
      listInfo[1].modalWrapper.classList.remove('edit-list-hidden');
      
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') listInfo[1].modalWrapper.classList.add('edit-list-hidden');
      });
      listInfo[1].renameButton.addEventListener('click', () => {
        if(listInfo[1].renameInput.value.length) {
          list.title = listInfo[1].renameInput.value;
          renderBoard();
          listInfo[1].modalWrapper.classList.add('edit-list-hidden');
        }
      });
      //if we press delete button, remove list from listArr and renderBoard
      listInfo[1].deleteButton.addEventListener('click', () => {
        listsArr.splice(index, 1);
        renderBoard();
        listInfo[1].modalWrapper.classList.add('edit-list-hidden');
      });
    });
  }); 
  setDragLists(); 
  /* setDragCards(); */

  sessionStorage.setItem('listsArr', JSON.stringify(listsArr));
}

window.addEventListener("load", () => {
  renderBoard();
});

function deleteCard(listTitle, cardIndex) {
  const listIndex = listsArr.findIndex( list => list.title === listTitle);
  listsArr[listIndex].cards.splice(cardIndex, 1);
  renderBoard();
}


//Add list to listArr
function addList(listTitle) {
  //console.log(`List Created with title: ${listTitle}`)
  let list = {
    title: listTitle,
    cards: []
  }
  listsArr.push(list);
  renderBoard();

  document.querySelector('.newList').value = '';
}

//modify listPosition in array, needed for the drag operations
function modList (current, next) {
  const currentTitle = current.firstChild.firstChild.innerText;
  const nextTitle = next.firstChild.firstChild.innerText;  
  const currentIndex = listsArr.findIndex( list => list.title === currentTitle);
  element = listsArr.splice(currentIndex, 1);
  const nextIndex = listsArr.findIndex( list => list.title === nextTitle);
  listsArr.splice(nextIndex, 0, element[0]);

  sessionStorage.setItem('listsArr', JSON.stringify(listsArr));

}
//If the card needs to be last, only remove it and push to array
function modListtoEnd (current) {
  const currentTitle = current.innerText;
  const currentIndex = listsArr.findIndex( list => list.title === currentTitle);
  element = listsArr.splice(currentIndex, 1);
  listsArr.push(element[0]);

  sessionStorage.setItem('listsArr', JSON.stringify(listsArr));
}

//listener for the add list button
document.getElementById("list-creator-button").addEventListener('click', () => {
  if (document.querySelector('.newList').value.length) {
    addList(document.querySelector('.newList').value);
    document.querySelector('.newList').focus();
  };
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && document.querySelector('.newList').value.length) {
    addList(document.querySelector('.newList').value);
    document.querySelector('.newList').focus();
  } 
});



//Listen for the header buttons
const headerButtonsList = document.querySelectorAll('.header-buttons');
headerButtonsList.forEach( (button) => {
  button.addEventListener('click', () => {
    let tooltip = button.childNodes[3];
    if (tooltip.classList.contains('tooltip-clicked')) {
      tooltip.classList.remove('tooltip-clicked');
    }
    else {
      eraseTooltips();
      tooltip.classList.add('tooltip-clicked');
    }

    //Listener for clicks outside button for closing tooltip
    document.addEventListener('click', (e) => {
      //console.log(e.target.classList.value);
      if(e.target.classList.value != 'header-buttons') {
        tooltip.classList.remove('tooltip-clicked');
      }
    });

  });
});

const retract = document.getElementById('retract-button');
const sidebar = document.getElementById('sidebar');

retract.addEventListener('click', () => {
  if (!sidebar.classList.contains('sidebar-out')) {
    sidebar.classList.add('sidebar-out');
  } else {
    sidebar.classList.remove('sidebar-out');
  }
});

