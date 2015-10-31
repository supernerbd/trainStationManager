//main.js
'use strict'

game.main = (function(){
	//vars
	var canvas;
	var ctx;
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
		ctx.fillRect(0,0,CANVAS.WIDTH,CANVAS.HEIGHT);
	};

	return {
		init: init,
		CANVAS: CANVAS,
		ctx: ctx,
	}
}());