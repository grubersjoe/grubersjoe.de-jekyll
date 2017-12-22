import { calcElemHeight, findSibling } from './util';

function collapse(elem, callback) {
  const sectionHeight = elem.scrollHeight;
  const { transition } = elem.style;

  elem.style.transition = null; // temporarily disable the transition

  requestAnimationFrame(() => {
    elem.style.height = `${sectionHeight}px`;
    elem.style.transition = transition;

    requestAnimationFrame(() => {
      elem.addEventListener('transitionend', function listener() {
        elem.removeEventListener('transitionend', listener);
        elem.setAttribute('data-collapsed', 'true');
        elem.style.display = 'none';

        if (typeof callback === 'function') {
          callback();
        }
      });

      requestAnimationFrame(() => {
        elem.style.height = `${0}px`;
      });
    });
  });
}

function expand(elem, callback) {
  const sectionHeight = calcElemHeight(elem);

  elem.style.display = 'block';
  elem.style.height = `${0}px`;

  requestAnimationFrame(() => {
    elem.addEventListener('transitionend', function listener() {
      elem.removeEventListener('transitionend', listener);
      elem.setAttribute('data-collapsed', 'false');
      elem.style.height = null;

      if (typeof callback === 'function') {
        callback();
      }
    });

    requestAnimationFrame(() => {
      elem.style.height = `${sectionHeight}px`;
    });
  });
}

export default function initCollapsibles() {
  const toggleBtns = document.querySelectorAll('.collapsible-toggle');

  toggleBtns.forEach((btn) => {
    const target = document.querySelector(btn.getAttribute('data-target'));
    const collapsible = target || findSibling(btn, '.collapsible');

    if (!collapsible) {
      return;
    }

    collapsible.setAttribute('data-collapsed', 'true'); // init

    btn.addEventListener('click', () => {
      const isCollapsed = collapsible.getAttribute('data-collapsed') === 'true';

      if (isCollapsed) {
        expand(collapsible, () => btn.classList.add('open'));
      } else {
        collapse(collapsible, () => btn.classList.remove('open'));
      }
    });
  });
}
