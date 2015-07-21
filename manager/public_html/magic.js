function getTimelineWidth() {
	var tl = document.getElementById("timeline");

	return parseInt(window.getComputedStyle(tl).width);
}

function getSlotWidth() {
	var ref = document.getElementById("0.1");

	return parseInt(window.getComputedStyle(ref).width);
}

function getNumSlotsDisplayed() {

	return Math.floor(getTimelineWidth()/getSlotWidth());
}

function getCurrentSlotAbsPos() {

	return document.getElementById("0." + time).offsetLeft
		- document.getElementById("timeline").scrollLeft;
}

function scrollToPercent(x) {
	/*
	 * XXX: Doesn't work as expected, needs to be factor corrected
	 */

	var tl = document.getElementById("timeline");
	var tracks = document.getElementById("gleise");
	var advance = window.innerWidth / 100 * x;
	var sw = getSlotWidth();

	tl.scrollLeft = tracks.scrollLeft = time * sw + advance;
}