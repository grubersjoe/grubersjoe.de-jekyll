export function getHeight(elem) {
  const style = getComputedStyle(elem);

  if (style.display !== 'none') {
    return elem.clientHeight;
  }

  elem.style.display = 'block';
  elem.style.height = 'auto';
  elem.style.visibility = 'hidden';

  const height = elem.clientHeight;

  elem.style.display = 'none';
  elem.style.height = '0px';
  elem.style.visibility = 'visible';

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
