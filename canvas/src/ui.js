//ui.js
'use strict'

game.ui = (function(){
	//vars
	var CANVAS;
	var ctx;
	var buttonsMainMenu = [];
	//objs
	function Button(name,x,y,width,height,action){
		this.name= name;
		this.x=x;
		this.y=y;
		this.width=width;
		this.height=height;
		this.action=action;
		return this;
	}
	//methods
	
	function init(ctx1){
		CANVAS=game.main.CANVAS;
		ctx=ctx1;
		createButtons();
	};
	
	function createButtons(){
		var height= (CANVAS.HEIGHT/100)*20; //20% of screen
		var width= (CANVAS.WIDTH/100)*20; //20% of screen
		//create all Buttons in here and store them in array buttons. On mouse click search array
		buttonsMainMenu[0]=new Button ("tracks",0,CANVAS.HEIGHT-height,width,height,function(){console.log("tracks");});
		buttonsMainMenu[1]=new Button ("contracts",width,CANVAS.HEIGHT-height,width,height,function(){console.log("contracts");});
		buttonsMainMenu[2]=new Button ("newContract",width*2,CANVAS.HEIGHT-height,width,height,function(){console.log("newContract");});
	};
	
	function doMousedown(e){ //event handler for mousedown. Used in the menu
		var mouse=getMouse(e);
		//console.log("mouse click at " + mouse.x + " " + mouse.y);
		for(var i=0; i<buttonsMainMenu.length; i++){
			if(pointInside(buttonsMainMenu[i],mouse)){
				buttonsMainMenu[i].action();
			}
		}
	};
	
	function drawMenu(){
		/*var height= (CANVAS.HEIGHT/100)*20; //20% of screen
		var width= (CANVAS.WIDTH/100)*20; //20% of screen
		ctx.fillStyle="white";
		ctx.fillRect(0,CANVAS.HEIGHT-height, width,height);
		//ctx.fillRect(0,CANVAS.HEIGHT-100,100,100);*/
		for(var i=0; i<buttonsMainMenu.length; i++){
			ctx.fillStyle="white";
			ctx.fillRect(buttonsMainMenu[i].x, buttonsMainMenu[i].y, buttonsMainMenu[i].width, buttonsMainMenu[i].height);
			ctx.strokeRect(buttonsMainMenu[i].x, buttonsMainMenu[i].y, buttonsMainMenu[i].width, buttonsMainMenu[i].height);
		}
	};
	
	function getMouse(e){
		var mouse = {} // make an object
		mouse.x = e.pageX - e.target.offsetLeft;
		mouse.y = e.pageY - e.target.offsetTop;
		return mouse;
	};
	
	function pointInside(button,m){ //is mouse click in box?
		if( m.x >= button.x && m.x <= button.x + button.width && m.y >= button.y && m.y <= button.y + button.height ){
			return true;
		}
		else{
			return false;
		}
	};
	return {
		init: init,
		drawMenu: drawMenu,
		doMousedown: doMousedown,
	}
}());