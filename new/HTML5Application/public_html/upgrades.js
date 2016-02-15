/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

define(['jquery'], function($) {
   
   var upgrades = [];
   var TYPE = Object.seal({
      TRACK: "TRACK",
      STATION: "STATION"
   });
   var LEVEL = Object.seal({
      BASIC: "BASIC",
      MEDIUM: "MEDIUM",
      LARGE: "LARGE"
   });
   
    function Upgrade(id, name, description, type, level, costs, prerequisites){
       
       this.id = id;
       this.name = name;
       this.description = description;
       this.type = type;    //track/station
       this.level = level; //3levels possible: basic, standard, large
       this.costs = costs; //basis costs
       this.purchased = false;
       this.prerequisites = prerequisites || false; //[]
       
       return this;
   }
   
    function Track(){
        this.level = LEVEL.BASIC;
        this.id = 0;
    };
   
    function init(){
        game.gameState.stationLevel = LEVEL.BASIC;
        upgrades[upgrades.length] = new Upgrade(upgrades.length, "Short Track", "A short (150m) track", TYPE.TRACK, LEVEL.BASIC, game.balancing.shortTrack);
        upgrades[upgrades.length] = new Upgrade(upgrades.length, "Medium Track", "A medium (350m) track", TYPE.TRACK, LEVEL.MEDIUM, game.balancing.mediumTrack, [3]);
        upgrades[upgrades.length] = new Upgrade(upgrades.length, "Long Track", "A long (500m) track", TYPE.TRACK, LEVEL.LARGE, game.balancing.longTrack, [4]);
        upgrades[upgrades.length] = new Upgrade(upgrades.length, "Station Update 1", "Updates the station", TYPE.STATION, LEVEL.MEDIUM, game.balancing.upgrade1);
        upgrades[upgrades.length] = new Upgrade(upgrades.length, "Station Update 2", "Updates the station", TYPE.STATION, LEVEL.LARGE, game.balancing.upgrade2, [3]);
        showUpgrades();
    };
    
    function showUpgrades(){
        var htmlString ="";
        $.each(upgrades, function(i,upgrade){
           htmlString+="<div class='upgrades' id='upgrade"+upgrade.id+"'><h1>"+upgrade.name+"</h1><p>"+upgrade.description+"</p><p>Costs: "+upgrade.costs+"</p><button id='buttonUpgrade"+upgrade.id+"'>Buy</button></div>";
        });
        $("#upgrades").html(htmlString);
        $.each(upgrades, function(i,upgrade){
            if(upgrade.prerequisites){
                if(!upgrades[upgrade.prerequisites[0]].purchased){
                     $("#buttonUpgrade"+upgrade.id).text("You need to buy "+upgrades[upgrade.prerequisites].name+" first");
                     $("#upgrade"+upgrade.id).css("background-color", "grey");
                }
                if(upgrade.purchased){
                    $("#buttonUpgrade"+upgrade.id).text("Already Bought");
                    $("#upgrade"+upgrade.id).css("background-color", "grey");
                } 
                if(!upgrade.purchased && upgrades[upgrade.prerequisites[0]].purchased){
                    $("#buttonUpgrade"+upgrade.id).click(function(){
                        buyUpgrade(upgrade.id);
                    });
                }
            }
            else{
                if(upgrade.purchased){
                    $("#buttonUpgrade"+upgrade.id).text("Already Bought");
                    $("#upgrade"+upgrade.id).css("background-color", "grey");
                } 
                else{
                    $("#buttonUpgrade"+upgrade.id).click(function(){
                        buyUpgrade(upgrade.id);
                    });
                }
            }
        });
    };
    
    function buyUpgrade(id){
        console.log("bought "+id);
        if(upgrades[id].type===TYPE.TRACK){
            addTrack(upgrades[id].level);
            game.changeMoney(upgrades[id].costs);
        }
        if(upgrades[id].type===TYPE.STATION){
            game.gameState.stationLevel = upgrades[id].level;
            upgrades[id].purchased = true;
            
            game.changeMoney(upgrades[id].costs);
            showUpgrades();
        }
    };
    
    function addTrack(level){
        var nr= game.gameState.tracks.length;
        game.gameState.tracks[nr] = new Track;
        game.gameState.tracks[nr].id = nr;
        game.gameState.tracks[nr].level = level;
        game.gameState.numTracks++;
    };
    
    function selectTrack(id){
        var htmlString ="";
        $.each(game.gameState.tracks, function(i,track){
            htmlString+="<button id='track"+track.id+"'>Track "+track.id+"</button>";
        });
        $("#overlayContent").html(htmlString);
        $.each(game.gameState.tracks, function(i,track){
           $("#track"+track.id).click(function(){
                game.gameState.acceptedContracts[id].track = track.id;
                $("#overlay").fadeOut(200);
                contracts.showContractsTaken();
                game.addEvents(id);
           });
       });
       $("#overlay").fadeIn(200);
    };
    
    function changeTrack(id){
        var htmlString ="";
        $.each(game.gameState.tracks, function(i,track){
            htmlString+="<button id='track"+track.id+"'>Track "+track.id+"</button>";
        });
        $("#overlayContent").html(htmlString);
        $.each(game.gameState.tracks, function(i,track){
           $("#track"+track.id).click(function(){
                game.gameState.acceptedContracts[id].track = track.id;
                $("#overlay").fadeOut(200);
                contracts.showContractsTaken();
                game.changeEvents(id);
           });
       });
       $("#overlay").fadeIn(200);
    };
    
    return{
      init: init,
      addTrack: addTrack,
      selectTrack: selectTrack,
      changeTrack: changeTrack,
      LEVEL: LEVEL
    };
});