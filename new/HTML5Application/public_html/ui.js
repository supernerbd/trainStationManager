/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

define(['jquery'], function($) {
     
     var currentScreen;
     var mainMenu;
     var startMenu;
     
     function init(){
         mainMenu=false;
         startMenu=true;
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
         $("#day, #moneyChange, #money").click(function(){
             game.showMoneyOverview();
         });
         $("#timeSlider").change(function(){
             game.gameState.speed = $("#timeSlider").val();
             console.log($("#timeSlider").val());
         });
         showStartMenu();
         window.addEventListener("keyup",function(e){
            if(e.keyCode===27){//esc
                if(startMenu===false){
                    if(mainMenu){
                       $("#overlay").fadeOut(200);
                       mainMenu=false;
                       game.gameState.stopped= false;
                   }
                   else{
                       showMainMenu();
                   }
               }
            } 
         });
         document.querySelector("canvas").addEventListener("click", function(e){canvasClick(e);});
     }
     
     function showMainMenu(){
         $("#overlay").fadeIn(200);
         mainMenu = true;
            game.gameState.stopped=true;
            var htmlString="<button id='save'>Save Game</button><br><button id='load'>Load Game</button><p id='infobar'> </p><br><button id='buttonResumeGame'>Resume Game</button>";
            $("#overlayContent").html(htmlString);
            $("#buttonResumeGame").click(function(){
                $("#overlay").fadeOut(200);
                mainMenu=false;
                game.gameState.stopped= false;
            });
            $("#save").click(function(){
                store.save();
                $("#infobar").text("Game saved!");
            });
            $("#load").click(function(){
                store.load();
                $("#infobar").text("Game loaded!");
            });
     }
     
     function showStartMenu(){
         $("#overlay").fadeIn(200);
         var htmlString="";
         htmlString+="<h1>Welcome!</h1 class='onboarding'><p>Your new job is the Manager of this little train station. If you make the right decisions it will grow and be eventually the bigget station in the city!";
         htmlString+=" Your primary job is to keep cash positive. The CEO of your railway company doesn't except a station with less than 0$ at any given time. So be aware. ";
         htmlString+="<br>You have got several tools to run this station:</p>";
         htmlString+="<p class='onboarding'>- The track overview: This tool gives you the overview of the trains running at the current time. With a click on a train event you can change the track or delay the entrance of the train. Beware: If you delay a train it costs a fee. There is also a big fee in case a train is marked as not scheduled. Green events are on time. Orange one are delayed, but not because of you. There is no penalty for these trains. Red events were delayed by you. You already payed a fee and will again, if you change the delay. </p>";
         htmlString+="<p class='onboarding'>- The upgrade view: Here you can upgrade your station. Construct new tracks (you can get up to 10) or update your station. Each upgrade costs an amount of money and a daily maintenance fee. This fee is due at the end of each day.</p>";
         htmlString+="<p class='onboarding'>- The offert Contracts view shows the contracts you can accept or refuse. Refusing a contract may cost a fee. You need to sign contracts, to get your station into the railway schedules.</p>";
         htmlString+="<p class='onboarding'>- The contracts taken view: Shows all accepted contracts.</p>";
         htmlString+="<p class='onboarding'>- The balance sheet: With a click on your current amount of money you can see a balance sheet. Check it from time to time to see how you are doing.</p>";
         htmlString+="<button id='buttonStartGame'>Start Game</button>";
         $("#overlayContent").html(htmlString);
         $("#buttonStartGame").click(function(){
              $("#overlay").fadeOut(200);
              startMenu=false;
              game.init();
         });
     }
     /*Welcome!
      * You are the Manager of this little Train Station. Nurture it right and it will flourish. Your primäry Job is to keep cash positive. 
      * The CEOs of your Railway Company don't except a Station with less than 0 $ at any time. So be aware.
      * To run this Stations your Tools are: ...
      * Always keep the maintenance costs in mind. They are due at the end of each day. 
      */
     
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
