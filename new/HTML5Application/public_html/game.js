/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

define(['jquery', 'GameState', 'GameBalancing'], function($, GameState, GameBalancing) {
   
   var gameState;
   var balancing;
   var LEVEL;
   //var moneyChanges = [];
   
   function Event(id,time,track,fee,reward,contract,level,trainName,lineNo){
       this.contract=contract;
       this.level=level;
       this.trainName=trainName;
       this.lineNo=lineNo;
       this.track=track;
       this.time=time;
       this.fee=fee;
       this.reward=reward;
       this.id=id;
   }
   
   function init(){
       LEVEL=upgrades.LEVEL;
       
       upgrades.addTrack(LEVEL.LARGE); //make track0
       for(var i=0; i<this.balancing.startTracks; i++){
           upgrades.addTrack(LEVEL.BASIC);
       }
       
       this.gameState.stopped=false;
       changeDay();
       gameLoop();
   };
   
    function initGameState(){
        this.gameState = new GameState;
        this.balancing = new GameBalancing;
    };
    
    function changeMoney(amount){
        $("#moneyChange").text(amount+" $");
        if(amount>0){
            $("#moneyChange").css("color", "green");
        }
        else{
            $("#moneyChange").css("color", "red");
        }
        game.gameState.money += amount;
        $("#money").text(game.gameState.money+" $");
        if(game.gameState.money<0){
            game.gameState.stopped=true;
            //show Game Over
            var htmlString="<h1>Game Over</h1>";
            $("#overlayContent").html(htmlString);
            $("#overlay").fadeIn(200);
            $("#overlay").css("color", "white");
        }
    };
    
    function changeDay(){
        game.gameState.time = 0;
        game.gameState.daysPlayed++;
        $("#day").text("Day "+game.gameState.daysPlayed);
    };
    
    function createEvents(){
       var events=[];
       var id=0;
       $.each(game.gameState.acceptedContracts, function(i,contract){
            for (var x = contract.startingTime; x <= 380; x += (20 * contract.tact)) {
                events[events.length] = new Event(id,x,contract.track,contract.fee,contract.reward,contract.id,contract.level,contract.trainName,contract.lineNo);
                id++;
            }
       });
       //add day traffic here
       this.gameState.events = eventCollision(events);
    };
    
    function addEvents(contractId){
        var events = this.gameState.events;
        var id=this.gameState.events.length;
        var contract=game.gameState.acceptedContracts[contractId];
        for (var x = contract.startingTime; x <= 380; x += (20 * contract.tact)) {
            events[events.length] = new Event(id,x,contract.track,contract.fee,contract.reward,contract.id,contract.level,contract.trainName,contract.lineNo);
            id++;
        }
        this.gameState.events = eventCollision(events);
    }
    
    function eventCollision(events){
        var a=events;
        var b=events;
        for (var i=0; i<a.length;i++){
            for (var j=0; j<b.length;j++){
                if(a[i].id!=b[j].id && a[i].track==b[j].track && a[i].time==b[j].time && a[i].track!=0){
                    console.log("Collision between "+a[i].id+" and"+b[j].id+" at track "+events[j].track+" at time"+events[j].time);
                    events[j].track = 0;
                }
            }
        }
        return events;
    }
    
    function gameLoop(){
        setTimeout(function (){gameLoopCalc();}, game.balancing.standardTime/game.gameState.speed);
    }
    
    function gameLoopCalc(){        
        if (game.gameState.stopped===true) {
        return;
        }

        if (game.gameState.time<380) {
            //change delays
            
            //fees and rewards
            $.each(game.gameState.table, function(i,event){
                 if(event.time===game.gameState.time){
                     if(event.track!==0){
                         game.changeMoney(event.reward);
                     }
                     else{
                         game.changeMoney(event.fee);
                     }
                 }
            });
            draw.createTable();
            game.gameState.time++;
            //console.log("the time is "+ui.displayTime(game.gameState.time));
        } else {
            changeDay();
        }
        gameLoop();
    }
    
    return{
      init: init,
      initGameState: initGameState,
      gameState: gameState,
      balancing: balancing,
      changeMoney: changeMoney,
      createEvents: createEvents,
      addEvents: addEvents
    };
});