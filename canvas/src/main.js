//main.js
'use strict'

game.main = (function(){
	//vars
	var canvas;
	var ctx;
	var ui;
	//constants
	var CANVAS = Object.freeze({
		HEIGHT: window.innerHeight,
		WIDTH: window.innerWidth,
	}); 
	//objs
	
	//methods
	
	function init(){
		canvas = document.querySelector('canvas');
		canvas.width = CANVAS.WIDTH;
		canvas.height = CANVAS.HEIGHT;
		ctx = canvas.getContext('2d');
		ui=game.ui;
		ui.init(ctx);
		canvas.onmousedown = ui.doMousedown;
		ctx.fillRect(0,0,CANVAS.WIDTH,CANVAS.HEIGHT);
		ui.drawMenu();
	};

	return {
		init: init,
		CANVAS: CANVAS,
		ctx: ctx,
	}
}());