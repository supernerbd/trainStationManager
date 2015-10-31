//ui.js
'use strict'

game.ui = (function(){
	//vars
	var CANVAS;
	var ctx;
	var buttons = [];
	//objs
	function Button(name,x,y,width,height,action){
		this.name: name,
		this.x=x;
		this.y=y;
		this.width=width;
		this.height=height;
		this.action=action;
		return this;
	}
	//methods
	
	function init(){
		CANVAS=game.main.CANVAS;
		ctx=game.main.ctx;
	};
	
	function createButtons(){
		//create all Buttons in here and store them in array buttons. On mouse click search array
	};
	return {
		init: init,
	}
}());