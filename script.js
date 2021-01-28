'use strict';

const selectAll = document.querySelectorAll('.field-select');

/*===ФУНКЦИИ===*/
/* функция, расставляет data-attr для <label> в селекте*/
function setDataAttr(select) {
  // передаю сюда отдельный select
  //в этом select найти все input
  let inputs = select.querySelectorAll('.field-select__input'); // найти  коллекцию inputs в селекте

  inputs.forEach((elem) => {
    if (elem.checked) {
      elem.parentElement.lastElementChild.setAttribute('data-state', 'checked'); // находит родителя elem (т.е <li>), далее надит последнего ребенка родителя (т.е <label>), и этому <label> li,добавляет data-attr
    }
    if (elem.disabled) {
      elem.parentElement.lastElementChild.setAttribute('data-state', 'disabled'); // нахоит родителя elem (т.е <li>), далее надит последнего ребенка родителя (т.е <label>), и этому <label> lj,добавляет data-attr
    }
  });
}

/* функция для шапки, записать textContent в шапку*/
function setTextContent(select) {
  // передаю сюда отдельный select
  //в этом select найти все label
  //пройтись циклом по label, и найти тот, который data-state = 'checked';
  //далее записать text.content этого label в text.content шапки

  let labels = select.querySelectorAll('.field-select__label'),
    title = select.querySelector('.field-select__title');

  for (let i = 0; i < labels.length; i++) {
    if (labels[i].dataset.state == 'checked') {
      title.textContent = labels[i].textContent;
      break;
    }
  }
}

/* функция для шапки, показать шапку, т.к. шапки изначальнео скрыты*/
function showTitle(select) {
  // передаю сюда отдельный select
  let title = select.querySelector('.field-select__title');
  title.classList.remove('field-select__title--hide');
}

/* функция для контента, показать-скрыть блок контента */
function contentShowHide(select) {
  // передаю сюда отдельный select
  select.querySelector('.field-select__content').classList.toggle('field-select__content--hide');
}

/* функция для конкретной шапки, перекючить стрелку вверx-вниз */
function titleToggle(target) {
  target.classList.toggle('field-select__title--open'); // вращение псевдоэлемента
}
/*===END ФУНКЦИИ===*/

/*==================*/
/*==================*/
selectAll.forEach((item) => {
  /*начальные действия*/
  setDataAttr(item); // расставить data-attr
  setTextContent(item); // textContent от label записать в шапку
  showTitle(item); // шапку показать
  contentShowHide(item); // контент скрыть

  /*действия по клику на шапку*/
  let title = item.querySelector('.field-select__title');
  title.addEventListener('click', (event) => {
    titleToggle(event.target); //шапка - перекючить стрелку вверx-вниз
    contentShowHide(item); // контент скрыть / показать
  });

  /*действия по клику на option*/
  let labels = item.querySelectorAll('.field-select__label');
  labels.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      if (event.target.dataset.state !== 'disabled') {
        title.textContent = event.target.textContent; //записать в шапку textContent от label
        contentShowHide(item); // контент скрыть / показать
      }
    });
  });
});

/*Reset шапки*/
const reset = document.querySelector('.reset');
reset.addEventListener('click', () => {
  selectAll.forEach((item) => {
    setTextContent(item); //  записать textContent в шапку
  });
});
