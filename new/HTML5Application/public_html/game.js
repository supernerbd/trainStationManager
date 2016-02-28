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
   
   function Billing(){
       this.maintenance = 0;
       this.upgrades = 0;
       this.refuseContract = 0;
       this.reschedule=0;
       this.notScheduled = 0;
       this.rewards = 0;
       this.day = 0;
   }
   
   function init(){
       LEVEL=upgrades.LEVEL;
       
       upgrades.addTrack(LEVEL.LARGE); //make track0
       for(var i=0; i<this.balancing.startTracks; i++){
           upgrades.addTrack(LEVEL.BASIC);
       }
       upgrades.showUpgrades();
       
       this.gameState.stopped=false;
       changeDay();
       changeMoney(this.balancing.startMoney, "rewards");
       gameLoop();
   };
   
    function initGameState(){
        this.gameState = new GameState;
        this.balancing = new GameBalancing;
    };
    
    function changeMoney(amount, reason){
        
        if(!reason){
            console.log("noreason");
        }
        else{
            game.gameState.billing[0][reason]+=amount;
        }
        
        game.gameState.money += amount;
        game.gameState.moneyStack.shift();
        game.gameState.moneyStack[2] = amount;
            var htmlString="<ul>";
        for (var i=2; i>=0; i--){
            if(game.gameState.moneyStack[i]>0){
                htmlString+="<li class='plus'>"+game.gameState.moneyStack[i]+" $</li>";
            }
            else{
                htmlString+="<li class='minus'>"+game.gameState.moneyStack[i]+" $</li>";
            }   
        }
        htmlString+="</ul>";
        $("#moneyChange").html(htmlString);
        $("#money").text(game.gameState.money+" $");
        if(game.gameState.money<0){
            game.gameState.stopped=true;
            //show Game Over
            var htmlString="<h1>Game Over</h1><p>Try it again!</p><button id='restart'>Restart Game</button>";
            $("#overlayContent").html(htmlString);
            $("#overlay").fadeIn(200);
            $("#overlay").css("color", "white");
            $("#restart").click(function(){
                document.location.reload();
            });
        }
    };
    
    function changeDay(){
        if(game.gameState.daysPlayed>=1){
            upgrades.maintenanceCosts();
        }
        
        if(game.gameState.billing.length<3){
            var b = new Billing();
            game.gameState.billing.unshift(b);
            game.gameState.billing[0].day = game.gameState.daysPlayed+1;
        }
        else{
            var b = new Billing();
            game.gameState.billing.unshift(b);
            game.gameState.billing[0].day = game.gameState.daysPlayed+1;
            game.gameState.billing.pop();
        }
        
        resetEvents();
        createEvents();
        game.gameState.time = 0;
        game.gameState.daysPlayed++;
        $("#day").text("Day "+game.gameState.daysPlayed);
    };
    
    function getBalance(day){
        var balance;
        if(day===0){
            balance = upgrades.predictMaintenanceCosts() + game.gameState.billing[day].upgrades + game.gameState.billing[day].refuseContract + game.gameState.billing[day].reschedule + game.gameState.billing[day].notScheduled + game.gameState.billing[day].rewards;
        }
        else{
            balance = game.gameState.billing[day].maintenance + game.gameState.billing[day].upgrades + game.gameState.billing[day].refuseContract + game.gameState.billing[day].reschedule + game.gameState.billing[day].notScheduled + game.gameState.billing[day].rewards;
        }
        return balance;
    }
    
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
                            if(delayCollision(event.track, event.time+1, event.id)){
                                $("#delay1").text("Not possible");
                                $("#delay1").css("background-color", "red");
                            }
                            else{
                                event.delay=1;
                                event.time+=1;
                                changeMoney(event.reschedulePunishment, "reschedule");
                                $("#overlay").fadeOut(200);
                            }
                        });
                        $("#delay2").click(function(){
                            if(delayCollision(event.track, event.time+2, event.id)){
                                $("#delay2").text("Not possible");
                                $("#delay2").css("background-color", "red");
                            }
                            else{
                                event.delay=2;
                                event.time+=2;
                                changeMoney(event.reschedulePunishment, "reschedule");
                                $("#overlay").fadeOut(200);
                            }
                        });
                        $("#delay3").click(function(){
                            if(delayCollision(event.track, event.time+3, event.id)){
                                $("#delay3").text("Not possible");
                                $("#delay3").css("background-color", "red");
                            }
                            else{
                                event.delay=3;
                                event.time+=3;
                                changeMoney(event.reschedulePunishment, "reschedule");
                                $("#overlay").fadeOut(200);
                            }
                        });
                        break;
                    case 1:
                        $("#delay0").click(function(){
                            if(delayCollision(event.track, event.time-1, event.id)){
                                $("#delay0").text("Not possible");
                                $("#delay0").css("background-color", "red");
                            }
                            else{
                                event.delay=0;
                                event.time-=1;
                                changeMoney(event.reschedulePunishment, "reschedule");
                                $("#overlay").fadeOut(200);
                            }
                        });
                        $("#delay2").click(function(){
                            if(delayCollision(event.track, event.time+1, event.id)){
                                $("#delay2").text("Not possible");
                                $("#delay2").css("background-color", "red");
                            }
                            else{
                                event.delay=2;
                                event.time+=1;
                                changeMoney(event.reschedulePunishment, "reschedule");
                                $("#overlay").fadeOut(200);
                            }
                        });
                        $("#delay3").click(function(){
                            if(delayCollision(event.track, event.time+2, event.id)){
                                $("#delay3").text("Not possible");
                                $("#delay3").css("background-color", "red");
                            }
                            else{
                                event.delay=3;
                                event.time+=2;
                                changeMoney(event.reschedulePunishment, "reschedule");
                                $("#overlay").fadeOut(200);
                            }
                        });
                        break;
                    case 2:
                        $("#delay0").click(function(){
                            if(delayCollision(event.track, event.time-2, event.id)){
                                $("#delay0").text("Not possible");
                                $("#delay0").css("background-color", "red");
                            }
                            else{
                                event.delay=0;
                                event.time-=2;
                                changeMoney(event.reschedulePunishment, "reschedule");
                                $("#overlay").fadeOut(200);
                            }
                        });
                        $("#delay1").click(function(){
                            if(delayCollision(event.track, event.time-1, event.id)){
                                $("#delay1").text("Not possible");
                                $("#delay1").css("background-color", "red");
                            }
                            else{
                                event.delay=1;
                                event.time-=1;
                                changeMoney(event.reschedulePunishment, "reschedule");
                                $("#overlay").fadeOut(200);
                            }
                        });
                        $("#delay3").click(function(){
                            if(delayCollision(event.track, event.time+1, event.id)){
                                $("#delay3").text("Not possible");
                                $("#delay3").css("background-color", "red");
                            }
                            else{
                                event.delay=3;
                                event.time+=1;
                                changeMoney(event.reschedulePunishment, "reschedule");
                                $("#overlay").fadeOut(200);
                            }
                        });
                        break;
                    case 3:
                        $("#delay0").click(function(){
                            if(delayCollision(event.track, event.time-3, event.id)){
                                $("#delay0").text("Not possible");
                                $("#delay0").css("background-color", "red");
                            }
                            else{
                                event.delay=0;
                                event.time-=3;
                                changeMoney(event.reschedulePunishment, "reschedule");
                                $("#overlay").fadeOut(200);
                            }
                        });
                        $("#delay1").click(function(){
                            if(delayCollision(event.track, event.time-2, event.id)){
                                $("#delay1").text("Not possible");
                                $("#delay1").css("background-color", "red");
                            }
                            else{
                                event.delay=1;
                                event.time-=2;
                                changeMoney(event.reschedulePunishment, "reschedule");
                                $("#overlay").fadeOut(200);
                            }
                        });
                        $("#delay2").click(function(){
                            if(delayCollision(event.track, event.time-1, event.id)){
                                $("#delay2").text("Not possible");
                                $("#delay2").css("background-color", "red");
                            }
                            else{
                                event.delay=2;
                                event.time-=1;
                                changeMoney(event.reschedulePunishment, "reschedule");
                                $("#overlay").fadeOut(200);
                            }
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
            if((game.gameState.table[i].time===time||game.gameState.table[i].time===time-1||game.gameState.table[i].time===time+1)&&game.gameState.table[i].track===track){
                return true;
            }
        }
        return false;
    }
    
    function delayCollision(track, time, id){
        if(time<=game.gameState.time+3){
            return true;
        }
        for (var i=0;game.gameState.table.length>i;i++){
            if((game.gameState.table[i].time===time||game.gameState.table[i].time===time-1||game.gameState.table[i].time===time+1)&&game.gameState.table[i].track===track&&game.gameState.table[i].id!==id){
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
                if(a[i].id!=b[j].id && a[i].track==b[j].track && (a[i].time==b[j].time || a[i].time-1==b[j].time || a[i].time+1==b[j].time) && a[i].track!=0){ //just add time-1/time+1?
                    console.log("Collision between "+a[i].id+" and"+b[j].id+" at track "+events[j].track+" at time"+events[j].time);
                    events[j].track = 0;
                }
            }
        }
        return events;
    }
    
        function showMoneyOverview(){
         $("#overlay").fadeIn(200);
         var htmlString;
        switch(game.gameState.billing.length){
            case 1:
                htmlString = "<table><tr><td> </td><td>Current Day</td></tr>";
                htmlString+="<tr><td>Maintenance</td><td>"+upgrades.predictMaintenanceCosts()+"</td></tr>";
                htmlString+="<tr><td>Upgrades</td><td>"+game.gameState.billing[0].upgrades+"</td></tr>";
                htmlString+="<tr><td>Refused Contracts</td><td>"+game.gameState.billing[0].refuseContract+"</td></tr>";
                htmlString+="<tr><td>Rescheduled</td><td>"+game.gameState.billing[0].reschedule+"</td></tr>";
                htmlString+="<tr><td>Not Scheduled</td><td>"+game.gameState.billing[0].notScheduled+"</td></tr>";
                htmlString+="<tr><td>Rewards</td><td>"+game.gameState.billing[0].rewards+"</td></tr>";
                htmlString+="<tr><td>Balance</td><td>"+getBalance(0)+"</td></tr>";
                htmlString+="</table>";
            break;
            case 2:
                htmlString = "<table><tr><td> </td><td>Current Day</td><td>Day "+game.gameState.billing[1].day+"</td></tr>";
                htmlString+="<tr><td>Maintenance</td><td>"+upgrades.predictMaintenanceCosts()+"</td><td>"+game.gameState.billing[1].maintenance+"</td></tr>";
                htmlString+="<tr><td>Upgrades</td><td>"+game.gameState.billing[0].upgrades+"</td><td>"+game.gameState.billing[1].upgrades+"</td></tr>";
                htmlString+="<tr><td>Refused Contracts</td><td>"+game.gameState.billing[0].refuseContract+"</td><td>"+game.gameState.billing[1].refuseContract+"</td></tr>";
                htmlString+="<tr><td>Rescheduled</td><td>"+game.gameState.billing[0].reschedule+"</td><td>"+game.gameState.billing[1].reschedule+"</td></tr>";
                htmlString+="<tr><td>Not Scheduled</td><td>"+game.gameState.billing[0].notScheduled+"</td><td>"+game.gameState.billing[1].notScheduled+"</td></tr>";
                htmlString+="<tr><td>Rewards</td><td>"+game.gameState.billing[0].rewards+"</td><td>"+game.gameState.billing[1].rewards+"</td></tr>";
                htmlString+="<tr><td>Balance</td><td>"+getBalance(0)+"</td><td>"+getBalance(1)+"</td></tr>";
                htmlString+="</table>";
            break;
            case 3:
                htmlString = "<table><tr><td> </td><td>Current Day</td><td>Day "+game.gameState.billing[1].day+"</td><td>Day "+game.gameState.billing[2].day+"</td></tr>";
                htmlString+="<tr><td>Maintenance</td><td>"+upgrades.predictMaintenanceCosts()+"</td><td>"+game.gameState.billing[1].maintenance+"</td><td>"+game.gameState.billing[2].maintenance+"</td></tr>";
                htmlString+="<tr><td>Upgrades</td><td>"+game.gameState.billing[0].upgrades+"</td><td>"+game.gameState.billing[1].upgrades+"</td><td>"+game.gameState.billing[2].upgrades+"</td></tr>";
                htmlString+="<tr><td>Refused Contracts</td><td>"+game.gameState.billing[0].refuseContract+"</td><td>"+game.gameState.billing[1].refuseContract+"</td><td>"+game.gameState.billing[2].refuseContract+"</td></tr>";
                htmlString+="<tr><td>Rescheduled</td><td>"+game.gameState.billing[0].reschedule+"</td><td>"+game.gameState.billing[1].reschedule+"</td><td>"+game.gameState.billing[2].reschedule+"</td></tr>";
                htmlString+="<tr><td>Not Scheduled</td><td>"+game.gameState.billing[0].notScheduled+"</td><td>"+game.gameState.billing[1].notScheduled+"</td><td>"+game.gameState.billing[2].notScheduled+"</td></tr>";
                htmlString+="<tr><td>Rewards</td><td>"+game.gameState.billing[0].rewards+"</td><td>"+game.gameState.billing[1].rewards+"</td><td>"+game.gameState.billing[2].rewards+"</td></tr>";
                htmlString+="<tr><td>Balance</td><td>"+getBalance(0)+"</td><td>"+getBalance(1)+"</td><td>"+getBalance(2)+"</td></tr>";
                htmlString+="</table>";
            break;
        }
        htmlString+="<p><b>Attention:</b> Maintenance costs are due at the end of each day. The maintenance costs for the current day are only an prediction and can change in case upgrades are bought. Remember to always be cash positive. You'll lose this game if your amount of cash falls below 0$.</p>";
        htmlString+="<div id='close'>Close</div>";
        $("#overlayContent").html(htmlString);
        $("#close").click(function(){
            $("#overlay").fadeOut(200);
        });
        console.log("moneyOverview");
    }
    
    function gameLoop(){
        setTimeout(function (){gameLoopCalc();}, game.balancing.standardTime/game.gameState.speed);
    }
    
    function gameLoopCalc(){        
        if (game.gameState.stopped===true) {
        gameLoop();
        }
        else{

            if (game.gameState.time<380) {
                //fees and rewards
                $.each(game.gameState.table, function(i,event){
                     if(event.time===game.gameState.time){
                         if(event.track!==0){
                             game.changeMoney(event.reward, "rewards");
                         }
                         else{
                             game.changeMoney(event.fee, "notScheduled");
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
      createOutsideDelay: createOutsideDelay,
      delayCollision: delayCollision,
      showMoneyOverview: showMoneyOverview
    };
});