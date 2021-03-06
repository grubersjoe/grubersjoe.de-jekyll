export function findSibling(elem, selector) {
  let next = elem.nextElementSibling;

  while (next) {
    if (next.matches(selector)) {
      return next;
    }

    next = next.nextElementSibling;
  }

  return null;
}

export function calcElemDimensions(elem) {
  const style = getComputedStyle(elem);

  if (style.display !== 'none') {
    return elem.scrollHeight;
  }

  const { display, visibility } = elem.style;

  elem.style.display = 'block';
  elem.style.visibility = 'hidden';

  const width = elem.offsetWidth;
  const height = elem.scrollHeight;

  // restore original style
  elem.style.display = display;
  elem.style.visibility = visibility;

  return { width, height };
}

export function debounce(func, wait, immediate) {
  let timeout;
  return () => {
    const later = () => {
      timeout = null;
      if (!immediate) {
        func.call(this, wait, immediate);
      }
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait || 200);

    if (callNow) {
      func.call(this, wait, immediate);
    }
  };
}

export function scrollToTop(duration = 2000) {
  const cosParam = window.scrollY / 2;
  let scrollCount = 0;
  let prevTimestamp = performance.now();

  function step(curTimestamp) {
    scrollCount += Math.PI / (duration / (curTimestamp - prevTimestamp));

    if (scrollCount >= Math.PI) {
      window.scrollTo(0, 0);
    }

    if (window.scrollY === 0) {
      return;
    }

    window.scrollTo(0, Math.round(cosParam + (cosParam * Math.cos(scrollCount))));
    prevTimestamp = curTimestamp;

    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
