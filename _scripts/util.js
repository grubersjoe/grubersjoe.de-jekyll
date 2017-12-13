export function calcHeight(elem) {
  const style = getComputedStyle(elem);

  if (style.display !== 'none') {
    return elem.scrollHeight;
  }

  const { display, visibility } = elem.style;

  elem.style.display = 'block';
  elem.style.visibility = 'hidden';

  const height = elem.scrollHeight;

  elem.style.display = display;
  elem.style.visibility = visibility;

  return height;
}


// Ease in and out
export function scrollToTop(duration = 2000) {
  const cosParam = window.scrollY / 2;
  let scrollCount = 0;
  let tOld = performance.now();

  function step(tNew) {
    scrollCount += Math.PI / (duration / (tNew - tOld));

    if (scrollCount >= Math.PI) {
      window.scrollTo(0, 0);
    }

    if (window.scrollY === 0) {
      return;
    }

    window.scrollTo(0, Math.round(cosParam + (cosParam * Math.cos(scrollCount))));
    tOld = tNew;
    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
