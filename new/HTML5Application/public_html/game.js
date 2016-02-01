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
        console.log("change money");
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
            //change time and delays
            //check if fees or rewards apply
                                /*for (var i = 0; i < gameState.events.length; i++){ //actual calc things
                                var jlength = gameState.events[i].length;
                                for (var j = 0; j<jlength; j++){
                                        if (gameState.time === gameState.events[i][j].time){
                                                if (gameState.events[i][j].platform !== 0){
                                                        changeMoney(gameState.events[i][j].reward);
                                                } else {
                                                        changeMoney(-gameState.events[i][j].fee);
                                                        gameState.events[i][j].hide = true;
                                                }
                                        }
                                }
                        }*/
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