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
   
   function Event(id,time,track,fee,reward,contract,level,trainName,lineNo,reschedulePunishment){
       this.contract=contract;
       this.level=level;
       this.trainName=trainName;
       this.lineNo=lineNo;
       this.track=track;
       this.time=time;
       this.fee=fee;
       this.reward=reward;
       this.id=id;
       this.delay=0;
       this.reschedulePunishment=reschedulePunishment;
   }
   
   function init(){
       LEVEL=upgrades.LEVEL;
       
       upgrades.addTrack(LEVEL.LARGE); //make track0
       for(var i=0; i<this.balancing.startTracks; i++){
           upgrades.addTrack(LEVEL.BASIC);
       }
       
       this.gameState.stopped=false;
       changeMoney(this.balancing.startMoney);
       changeDay();
       gameLoop();
   };
   
    function initGameState(){
        this.gameState = new GameState;
        this.balancing = new GameBalancing;
    };
    
    function changeMoney(amount){ //game.gameState.moneyStack amount+" $"
        game.gameState.money += amount;
        game.gameState.moneyStack.shift();
        game.gameState.moneyStack[2] = amount;
            var htmlString="<ul>";
        for (var i=2; i>=0; i--){
            if(game.gameState.moneyStack[i]>0){
                htmlString+="<li class='plus'>"+game.gameState.moneyStack[i]+"</li>";
            }
            else{
                htmlString+="<li class='minus'>"+game.gameState.moneyStack[i]+"</li>";
            }   
        }
        htmlString+="</ul>";
        $("#moneyChange").html(htmlString);
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
        resetEvents();
        createEvents();
        game.gameState.time = 0;
        game.gameState.daysPlayed++;
        $("#day").text("Day "+game.gameState.daysPlayed);
    };
    
    function createEvents(){
       var events=[];
       var id=0;
       $.each(game.gameState.acceptedContracts, function(i,contract){
            for (var x = contract.startingTime; x <= 380; x += (20 * contract.tact)) {
                events[events.length] = new Event(id,x,contract.track,contract.fee,contract.reward,contract.id,contract.level,contract.trainName,contract.lineNo,contract.reschedulePunishment);
                id++;
            }
       });
       //add day traffic here
       game.gameState.events = eventCollision(events);
    };
    
    function addEvents(contractId){
        var events = this.gameState.events;
        var id=this.gameState.events.length;
        var contract=game.gameState.acceptedContracts[contractId];
        for (var x = contract.startingTime; x <= 380; x += (20 * contract.tact)) {
            events[events.length] = new Event(id,x,contract.track,contract.fee,contract.reward,contract.id,contract.level,contract.trainName,contract.lineNo,contract.reschedulePunishment);
                id++;
            id++;
        }
        this.gameState.events = eventCollision(events);
    }
    
    function resetEvents(){
        game.gameState.events = [];
    }
    
    function changeEvent(id){
        $.each(game.gameState.table, function(i,event){
            if(event.id===id){
                var htmlString="";
                var trackCounter=0;
                switch(event.delay){
                    case 0:
                        htmlString+="<div class='delay' id='delay1'>Delay 3 Min</div><div class='delay' id='delay2'>Delay 6 Min</div><div class='delay' id='delay3'>Delay 9 Min</div>";
                        break;
                    case 1:
                        htmlString+="<div class='delay' id='delay0'>Back to normal</div><div class='delay' id='delay2'>Delay 6 Min</div><div class='delay' id='delay3'>Delay 9 Min</div>";
                        break;
                    case 2: 
                        htmlString+="<div class='delay' id='delay0'>Back to normal</div><div class='delay' id='delay1'>Delay 3 Min</div><div class='delay' id='delay3'>Delay 9 Min</div>";
                        break;
                    case 3:
                        htmlString+="<div class='delay' id='delay0'>Back to normal</div><div class='delay' id='delay1'>Delay 3 Min</div><div class='delay' id='delay2'>Delay 6 Min</div>";
                        break;
                }
                for (var i=0;game.gameState.tracks.length>i;i++){
                    if(!changeEventCollision(i, event.time) && trackCounter<=4){
                        if(i===0){
                            htmlString+="<div class='track' id='track"+i+"'>Change to not scheduled</div>";
                        }
                        else{
                            htmlString+="<div class='track' id='track"+i+"'>Change to Track "+i+"</div>";
                        }
                        trackCounter++;
                    }
                }
                htmlString+="<div id='close'>Close</div>";
                $("#overlayContent").html(htmlString);
                $("#overlay").fadeIn(200);
                $("#overlay").css("color", "white");
                //event handler
                switch(event.delay){ //bug: need to check that player can't schedule around current time
                    case 0:                        
                        $("#delay1").click(function(){
                            event.delay=1;
                            event.time+=1;
                            changeMoney(event.reschedulePunishment);
                            $("#overlay").fadeOut(200);
                        });
                        $("#delay2").click(function(){
                            event.delay=2;
                            event.time+=2;
                            changeMoney(event.reschedulePunishment);
                            $("#overlay").fadeOut(200);
                        });
                        $("#delay3").click(function(){
                            event.delay=3;
                            event.time+=3;
                            changeMoney(event.reschedulePunishment);
                            $("#overlay").fadeOut(200);
                        });
                        break;
                    case 1:
                        $("#delay0").click(function(){
                            event.delay=0;
                            event.time-=1;
                            changeMoney(event.reschedulePunishment);
                            $("#overlay").fadeOut(200);
                        });
                        $("#delay2").click(function(){
                            event.delay=2;
                            event.time+=1;
                            changeMoney(event.reschedulePunishment);
                            $("#overlay").fadeOut(200);
                        });
                        $("#delay3").click(function(){
                            event.delay=3;
                            event.time+=2;
                            changeMoney(event.reschedulePunishment);
                            $("#overlay").fadeOut(200);
                        });
                        break;
                    case 2:
                        $("#delay0").click(function(){
                            event.delay=0;
                            event.time-=2;
                            changeMoney(event.reschedulePunishment);
                            $("#overlay").fadeOut(200);
                        });
                        $("#delay1").click(function(){
                            event.delay=1;
                            event.time-=1;
                            changeMoney(event.reschedulePunishment);
                            $("#overlay").fadeOut(200);
                        });
                        $("#delay3").click(function(){
                            event.delay=3;
                            event.time+=1;
                            changeMoney(event.reschedulePunishment);
                            $("#overlay").fadeOut(200);
                        });
                        break;
                    case 3:
                        $("#delay0").click(function(){
                            event.delay=0;
                            event.time-=3;
                            changeMoney(event.reschedulePunishment);
                            $("#overlay").fadeOut(200);
                        });
                        $("#delay1").click(function(){
                            event.delay=1;
                            event.time-=2;
                            changeMoney(event.reschedulePunishment);
                            $("#overlay").fadeOut(200);
                        });
                        $("#delay2").click(function(){
                            event.delay=2;
                            event.time-=1;
                            changeMoney(event.reschedulePunishment);
                            $("#overlay").fadeOut(200);
                        });
                        break;
                }
                trackCounter=0;
                $.each(game.gameState.tracks, function(i,track){
                    if(!changeEventCollision(track.id, event.time) && trackCounter<=4){
                        $("#track"+track.id).click(function(){
                           changeTrackEvent(event.id,track.id);
                           $("#overlay").fadeOut(200);
                        });
                        trackCounter++;
                    }
                });
                $("#close").click(function(){
                    $("#overlay").fadeOut(200);
                });
            }
        });
    }
    
    function changeTrackEvent(eventId, toTrack){
        $.each(game.gameState.table, function(i,event){
            if(eventId===event.id){
                event.track = toTrack;
            }
        });
    }
    
    function changeEvents(contractId){
        var track = game.gameState.acceptedContracts[contractId].track;
        var events = game.gameState.events;
        $.each(events, function(i,event){
            if(event.contract===contractId){
                event.track=track;
            }
        });
        game.gameState.events = eventCollision(events);
    }
    
    function changeEventCollision(track, time){
        for (var i=0;game.gameState.table.length>i;i++){
            if(game.gameState.table[i].time===time&&game.gameState.table[i].track===track){
                return true;
            }
        }
        return false;
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
    
    function createOutsideDelay(trainName){
        var delay = "0"; //just 0 is false. If I want a possible delay at every iteration I could use 0 instead of "0"
        $.each(game.balancing.trainTypes, function(i,type){
            if(trainName===type.name){
                if (Math.random() < type.delay.probablity){
                    delay = Math.floor(Math.random() * type.delay.factor / 3) + 1;
                }
            }
        });
        return delay;
    }
    
    return{
      init: init,
      initGameState: initGameState,
      gameState: gameState,
      balancing: balancing,
      changeMoney: changeMoney,
      createEvents: createEvents,
      addEvents: addEvents,
      changeEvent: changeEvent,
      changeEvents: changeEvents,
      createOutsideDelay: createOutsideDelay
    };
});