import { scrollToTop } from './util';
import setCollapsible from './collapsible';
import './title';

const domElems = {
  collapsibleWrapper: Array.from(document.querySelectorAll('.collapsible-wrapper')),
  topLinks: Array.from(document.querySelectorAll('.top-btn')),
};

document.addEventListener('DOMContentLoaded', () => {
  setCollapsible();

  domElems.topLinks.forEach((elem) => {
    elem.addEventListener('click', (ev) => {
      ev.preventDefault();
      scrollToTop();
    });
  });
});
