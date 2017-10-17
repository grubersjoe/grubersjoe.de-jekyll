$(document).ready(() => {
    let viewport = $('html, body');

    function easeInOutCubic(t) {
        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    }

    function scrollTo(top, dur) {
        dur = dur || 2000;
        viewport.stop().animate({scrollTop: top}, dur, easeInOutCubic);
    }

    $('.to-top').click(function () {
        scrollTo(0);
        return false;
    });

    viewport.on('scroll mousedown wheel keydown touchstart', function () {
        viewport.stop();
    });

    $('.collapse-list').click(function () {
        $(this).find('.fa').toggleClass('open');
        $(this).next('ul, ol').stop().slideToggle();
    });

    console.log(`TODO: Set language to ${navigator.language}`)
});

// TODO: try max-height approach
// window.getHeight = function (elem) {
// 	let style = getComputedStyle(elem);
//
// 	if (style.display !== 'none') {
// 		return elem.clientHeight;
// 	}
//
// 	elem.style.display = 'block';
// 	elem.style.visibility = 'hidden';
//
// 	let height = elem.clientHeight;
//
// 	elem.style.display = 'none';
// 	elem.style.visibility = 'visible';
//
// 	return height;
// };