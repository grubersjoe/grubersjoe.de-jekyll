import { scrollToTop } from './util';
import setCollapsible from './collapsible';

const domElems = {
  collapsibleWrapper: Array.from(document.querySelectorAll('.collapsible-wrapper')),
  topLinks: Array.from(document.querySelectorAll('.top-btn')),
};

setCollapsible(domElems.collapsibleWrapper);

domElems.topLinks.forEach((elem) => {
  elem.addEventListener('click', (ev) => {
    ev.preventDefault();
    scrollToTop();
  });
});
