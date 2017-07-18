let viewport = $('html, body');

function clamp(n, min, max) {
	return Math.min(Math.max(n, min), max);
}

function easeInOutQuart(t) {
	return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
}

function scrollTo(top) {
	// FIXME: subtract navbar height
	viewport.stop().animate({scrollTop: top}, 2000, easeInOutQuart);
}

$('.to-top').click(function () {
	scrollTo(0);
	return false;
});

viewport.on('scroll mousedown wheel keydown touchstart', function () {
	viewport.stop();
});
