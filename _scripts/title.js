import Typed from 'typed.js';
import { debounce, findSibling } from './util';

const TITLE_WIDTH = {
  sm: 327,
  lg: 546,
};
const SM_BREAKPOINT = 768;

document.addEventListener('DOMContentLoaded', () => {
  const initialScreenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const typedElem = document.getElementById('typed');
  const border = document.getElementById('typed-border');

  if (!typedElem) {
    return;
  }

  // hide no JS fallback
  document.getElementById('title-fallback').setAttribute('hidden', 'hidden');

  function hideCursor() {
    const cursor = findSibling(typedElem, '.typed-cursor');
    cursor.style.animationIterationCount = '3';
    cursor.style.animationName = 'blink';

    cursor.addEventListener('animationend', () => {
      requestAnimationFrame(() => {
        cursor.addEventListener('transitionend', cursor.remove);
        requestAnimationFrame(() => {
          cursor.style.opacity = '0';
        });
      });
    });
  }

  // eslint-disable-next-line no-unused-vars
  const typed = new Typed(typedElem, {
    strings: ['Jonathan Gruber'],
    startDelay: 700,
    typeSpeed: 100,
    cursorChar: '_',
    fadeOut: true, // required for blinking cursor: see https://github.com/mattboldt/typed.js/issues/332
    preStringTyped: () => {
      const width = initialScreenWidth < SM_BREAKPOINT ? TITLE_WIDTH.sm : TITLE_WIDTH.lg;
      border.style.width = `${width}px`;
    },
    onComplete: hideCursor,
  });

  window.addEventListener('resize', debounce(() => {
    const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const width = screenWidth < SM_BREAKPOINT ? TITLE_WIDTH.sm : TITLE_WIDTH.lg;
    border.style.transitionDuration = '0.1s';
    border.style.width = `${width}px`;
  }, 200));
});
