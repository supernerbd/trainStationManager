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
