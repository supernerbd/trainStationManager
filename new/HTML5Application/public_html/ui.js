/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

define(['jquery'], function($) {
     
     var currentScreen;
     
     function init(){
         currentScreen = "main";
         $("#"+currentScreen).fadeIn(100);
         //set click event listeners for buttons
         $("#buttonMain").click(function(){
             if(currentScreen!="main"){
                 $("#"+currentScreen).fadeOut(100);
                 currentScreen="main";
                 $("#"+currentScreen).fadeIn(100);
             }
         });
         $("#buttonUpgrades").click(function(){
             if(currentScreen!="upgrades"){
                 $("#"+currentScreen).fadeOut(100);
                 currentScreen="upgrades";
                 $("#"+currentScreen).fadeIn(100);
             }
         });
         $("#buttonContractsOffert").click(function(){
             if(currentScreen!="contractsOffert"){
                 $("#"+currentScreen).fadeOut(100);
                 currentScreen="contractsOffert";
                 $("#"+currentScreen).fadeIn(100);
             }
         });
         $("#buttonContractsTaken").click(function(){
             if(currentScreen!="contractsTaken"){
                 $("#"+currentScreen).fadeOut(100);
                 currentScreen="contractsTaken";
                 $("#"+currentScreen).fadeIn(100);
             }
         });
         $("#timeSlider").change(function(){
             game.gameState.speed = $("#timeSlider").val();
             console.log($("#timeSlider").val());
         });
         showMainMenu();
         window.addEventListener("keyup",function(e){
            if(e.keyCode===27){//esc
                showMainMenu();
            } 
         });
         document.querySelector("canvas").addEventListener("click", function(e){canvasClick(e);});
     }
     
     function showMainMenu(){
         $("#overlay").fadeIn(200);
         if(!game.gameState || game.gameState.stopped){
            var htmlString="<button id='buttonStartGame'>Start Game</button>";
            $("#overlayContent").html(htmlString);
            $("#buttonStartGame").click(function(){
                $("#overlay").fadeOut(200);
                game.init();
            });
         }
         else{ //pause/unpause?
            var htmlString="<button id='buttonResumeGame'>Resume Game</button>";
            $("#overlayContent").html(htmlString);
            $("#buttonResumeGame").click(function(){
                $("#overlay").fadeOut(200);
                
            });
         }
     }
     
     function canvasClick(e){
         var mouse = getMouse(e);
         //console.log("click@"+mouse.x+" "+mouse.y);
         $.each(game.gameState.table, function(i,event){
             if(event.x>0){
                if(pointInside(event,mouse)){
                    //console.log("inside");
                    game.changeEvent(event.id);
                }
             }  
         });
     }
     
     function getMouse(e){
	var mouse = {};
	mouse.x = e.pageX - e.target.offsetLeft;
	mouse.y = e.pageY - $("#buttonDiv").innerHeight()//e.target.offsetTop;
	return mouse;
    }
    
    function pointInside(button,m){ //is mouse click in box?
	if( m.x >= button.x && m.x <= button.x + button.width && m.y >= button.y && m.y <= button.y + button.height ){
		return true;
	}
	else{
		return false;
	}
    };
     
     function displayTime(n) {
	var hours = Math.floor(n / 20) + 4; // Train station opens for business at 4am
	var minutes = (n % 20) * 3; // Three minute intervals

	return "" + hours + "." + ((minutes < 10) ? "0" : "") + minutes;
      }
     
     return{
         init: init,
         displayTime: displayTime
     };
});
