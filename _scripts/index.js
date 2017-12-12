import { getHeight, scrollToTop } from './util';

const domElems = {
  collapsible: Array.from(document.querySelectorAll('.collapsible')),
  topLinks: Array.from(document.querySelectorAll('.top-btn')),
};

domElems.collapsible.forEach((button) => {
  button.addEventListener('click', (ev) => {
    ev.preventDefault();
    button.classList.toggle('open');
    const list = button.querySelector('.collapse');
    list.style.display = 'block';
    list.style.height = `${getHeight(list)}px`;
  });
});

domElems.topLinks.forEach((elem) => {
  elem.addEventListener('click', (ev) => {
    ev.preventDefault();
    scrollToTop();
  });
});

// $(() => {
//   $('.collapsible').click(function handler() {
//     $(this).toggleClass('open');
//     $(this).find('.collapse').stop().slideToggle();
//   });
// });
