/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

define(['jquery', 'Contract'], function($, Contract) {
    
    var LEVEL;
    
    function init(){
        LEVEL=upgrades.LEVEL;
        for(var i=0; i<game.balancing.startContractsOffert;i++){
            game.gameState.offeredContracts[i] = createContract(i);
        }
        showContractsOffert();
        showContractsTaken();
    };
    
    function createLineNo(){
        var text = "";
        var possible = "0123456789";

        for( var i=0; i < 4; i++ ){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
    
    function getRandomType(){
        var max = game.balancing.trainTypes.length;
        var min = 0;
        var result = Math.floor(Math.random()*(max-min+1)) + min;
        if(result>=max-1){
            result-=2;
        }
        if(result>=max){
            result-=1;
        }
        return result;
    };
    
    function createContract(id){    
        var contract = new Contract();
        
        contract.id = id;
        contract.type = getRandomType();
        contract.lineNo = createLineNo();
        
        contract.level= game.balancing.trainTypes[contract.type].level;
        contract.trainName= game.balancing.trainTypes[contract.type].name;
        contract.reward = game.balancing.trainTypes[contract.type].contract.reward;
        contract.fee = game.balancing.trainTypes[contract.type].contract.fee;
        if(game.gameState.stationLevel===LEVEL.BASIC && contract.level!==LEVEL.BASIC || game.gameState.stationLevel===LEVEL.MEDIUM && contract.level===LEVEL.LARGE){
            var percentage = game.balancing.refusePunishmentDown;
            contract.refusePunishment = (game.balancing.trainTypes[contract.type].contract.refusePunishment/100)*percentage;
        }
        else{
            contract.refusePunishment = game.balancing.trainTypes[contract.type].contract.refusePunishment;
        }
        contract.acceptReward = game.balancing.trainTypes[contract.type].contract.acceptReward;
        contract.reschedulePunishment = game.balancing.trainTypes[contract.type].contract.reschedulePunishment;
        
	//tact and start time
	var tact;
	var startTime;
	var v = Math.floor((Math.random() * 10) + 1);
	switch (v){
		case 1:
                    tact = 0.5;
                    startTime = Math.floor((Math.random() * 100) + 1);
                    break;
		case 2:
                    tact = 2;
                    startTime = Math.floor((Math.random() * 100) + 1);
                    break;
		case 3:
                    tact = 2;
                    startTime = Math.floor((Math.random() * 100) + 1);
                    break;
		case 4:
                    tact = 3;
                    startTime = Math.floor((Math.random() * 100) + 1) + 30;
                    break;
		case 5:
                    tact = 4;
                    startTime = Math.floor((Math.random() * 100) + 1) + 30;
                    break;
		case 6:
                    tact = 5;
                    startTime = 2 * (Math.floor((Math.random() * 100) + 1));
                    break;
		case 7:
                    tact = 6;
                    startTime = 2 * (Math.floor((Math.random() * 100) + 1));
                    break;
		case 8: 
                    tact = 1;
                    startTime = Math.floor((Math.random() * 100) + 1);
                    break;
		case 9: 
                    tact = 1;
                    startTime = Math.floor((Math.random() * 100) + 1);
                    break;
		case 10: 
                    tact = 1;
                    startTime = Math.floor((Math.random() * 100) + 1);
                    break;
	}
	contract.tact = tact;
	contract.startingTime = startTime;
	return contract;
    };
    
    function acceptContract(id){
        console.log("accept");
        var contract = game.gameState.offeredContracts[id];
        contract.id = game.gameState.nextContractId;
        game.gameState.acceptedContracts[game.gameState.nextContractId] = contract;
        upgrades.selectTrack(game.gameState.nextContractId);
        game.gameState.nextContractId++;
        game.changeMoney(contract.acceptReward);
        contract = createContract(id);
        game.gameState.offeredContracts[id]=contract;
        showContractsOffert();
        showContractsTaken();
    };
    
    function refuseContract(id){ 
        console.log("refuse");
        var contract = game.gameState.offeredContracts[id];
        game.changeMoney(contract.refusePunishment);
        contract = createContract(id);
        game.gameState.offeredContracts[id]=contract;
        showContractsOffert();
    };
    
    function showContractsOffert(){
        var htmlString ="";
        $.each(game.gameState.offeredContracts, function(i,contract){
           htmlString+="<div class='contractsOuter' id='upgrade"+contract.id+"'><h1>"+contract.trainName+" "+contract.lineNo+"</h1>";
           htmlString+="<div class='contracts'><h5>Level</h5>"+contract.level+"</div><div class='contracts'><h5>Tact</h5>"+contract.tact+"</div><div class='contracts'><h5>Starting Time</h5>"+ui.displayTime(contract.startingTime);
           htmlString+="</div><div class='contracts'><h5>Reward</h5>"+contract.reward+"</div><div class='contracts'><h5>Accept Reward</h5>"+contract.acceptReward+"</div><div class='contracts'><h5>Reschedule Punishment</h5>"+contract.reschedulePunishment+"</div><div class='contracts'><h5>Refuse Punishment</h5>"+contract.refusePunishment+"</div>";
           htmlString+="<button id='buttonAccept"+contract.id+"'>Accept</button><button id='buttonRefuse"+contract.id+"'>Refuse</button></div>";
        });
        $("#contractsOffert").html(htmlString);
       $.each(game.gameState.offeredContracts, function(i,contract){
           $("#buttonAccept"+contract.id).click(function(){
                        acceptContract(contract.id);
           });
           $("#buttonRefuse"+contract.id).click(function(){
                        refuseContract(contract.id);
           });
       });
    };  
    
    function showContractsTaken(){
        var htmlString ="";
        $.each(game.gameState.acceptedContracts, function(i,contract){
           htmlString+="<div class='contractsOuter' id='upgrade"+contract.id+"'><h1>"+contract.trainName+" "+contract.lineNo+"</h1>";
           htmlString+="<div class='contracts'><h5>Level</h5>"+contract.level+"</div><div class='contracts'><h5>Tact</h5>"+contract.tact+"</div><div class='contracts'><h5>Starting Time</h5>"+ui.displayTime(contract.startingTime);
           htmlString+="</div><div class='contracts'><h5>Reward</h5>"+contract.reward+"</div><div class='contracts'><h5>Missing Fee</h5>"+contract.fee+"</div><div class='contracts'><h5>Reschedule Punishment</h5>"+contract.reschedulePunishment+"</div><div class='contracts'><h5>Track</h5>"+contract.track+"</div>";
           htmlString+="<button id='changeTrack"+contract.id+"'>Change Track</button></div>";
        });
        $("#contractsTaken").html(htmlString);
        $.each(game.gameState.acceptedContracts, function(i,contract){
            $("#changeTrack"+contract.id).click(function(){
                        upgrades.changeTrack(contract.id);
           });
        });
    };
    
    return{
      init: init,
      getRandomType: getRandomType,
      showContractsTaken: showContractsTaken
    };
});