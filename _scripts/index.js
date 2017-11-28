$(() => {
  const viewport = $('html, body');

  function easeInOutCubic(t) {
    // eslint-disable-next-line no-mixed-operators
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  function scrollTo(top, dur = 2000) {
    viewport.stop().animate({ scrollTop: top }, dur, easeInOutCubic);
  }

  $('.to-top').click(() => {
    scrollTo(0);
    return false;
  });

  viewport.on('scroll mousedown wheel keydown touchstart', () => {
    viewport.stop();
  });

  $('.collapsible').click(function handler() {
    $(this).toggleClass('open');
    $(this).find('.collapse').stop().slideToggle();
  });
});

// TODO: try max-height approach
// window.getHeight = function (elem) {
//   let style = getComputedStyle(elem);
//
//   if (style.display !== 'none') {
//     return elem.clientHeight;
//   }
//
//   elem.style.display = 'block';
//   elem.style.visibility = 'hidden';
//
//   let height = elem.clientHeight;
//
//   elem.style.display = 'none';
//   elem.style.visibility = 'visible';
//
//   return height;
// };
