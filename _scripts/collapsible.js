import { calcHeight } from './util';

function collapse(elem, callback) {
  const sectionHeight = elem.scrollHeight;
  const { transition } = elem.style;

  elem.style.transition = null; // temporarily disable the transition

  requestAnimationFrame(() => {
    elem.style.height = `${sectionHeight}px`;
    elem.style.transition = transition;

    requestAnimationFrame(() => {
      elem.style.height = `${0}px`;

      elem.addEventListener('transitionend', function listener() {
        elem.removeEventListener('transitionend', listener);
        elem.setAttribute('data-collapsed', 'true');
        elem.style.display = 'none';

        if (typeof callback === 'function') {
          callback();
        }
      });
    });
  });
}

function expand(elem, callback) {
  const sectionHeight = calcHeight(elem);

  elem.style.display = 'block';
  elem.style.height = `${0}px`;

  requestAnimationFrame(() => {
    elem.style.height = `${sectionHeight}px`;

    elem.addEventListener('transitionend', function listener() {
      elem.removeEventListener('transitionend', listener);
      elem.setAttribute('data-collapsed', 'false');
      elem.style.height = null;

      if (typeof callback === 'function') {
        callback();
      }
    });
  });
}

export default function setCollapsible(wrappers) {
  wrappers.forEach((wrapper) => {
    const collapsible = wrapper.querySelector('.collapsible');

    if (!collapsible) {
      return;
    }

    collapsible.setAttribute('data-collapsed', 'true'); // init

    wrapper.addEventListener('click', () => {
      const isCollapsed = collapsible.getAttribute('data-collapsed') === 'true';

      if (isCollapsed) {
        expand(collapsible, () => wrapper.classList.add('open'));
      } else {
        collapse(collapsible, () => wrapper.classList.remove('open'));
      }
    });
  });
}
