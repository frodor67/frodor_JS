'use strict';


const books = document.querySelectorAll('.book'),
      adv   = document.querySelector('.adv'),
      links = document.getElementsByTagName('a'),
      elems = document.querySelectorAll('li'),
      ulEl  = document.querySelectorAll('ul');

console.log(elems, ulEl);

// 1.

books[1].after(books[0]);
books[2].before(books[4]);
books[5].before(books[3]);
books[5].after(books[2]);

// 2.

document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

// 3.

links[2].textContent ='Книга 3. this и Прототипы Объектов';

// 4.

adv.remove();

// 5.

elems[3].after(elems[6]);
elems[6].after(elems[8]);
elems[9].after(elems[2]);
elems[49].before(elems[55]);
elems[50].after(elems[48]);
elems[53].after(elems[51]);

// 6.

elems[25].insertAdjacentHTML('afterend', '<li>Глава 8: За пределами ES6</li>');

