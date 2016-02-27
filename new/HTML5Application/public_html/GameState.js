"use strict";
define(function() {
    return function(){
	this.acceptedContracts = new Array();
	this.daysPlayed = 0;
	this.money = 0;
        this.moneyStack = [0,0,0];
	this.offeredContracts = new Array();
        this.nextContractId = 0;
	this.numTracks = 0;
        this.tracks = new Array();
	this.stopped = true;
	this.nextLine = 1;
	this.speed = 1;
	this.table = new Array();
	this.events = new Array();
	this.dayTraffic = new Array();
	this.time = 0;
        this.stationLevel = "BASIC";
        /*this.rb = true;
        this.re = false;
        this.ice = false;
        
        this.autoScroll = true;
        
        this.lastTrackChangeTrackStart = null;
        this.lastTrackChangeTrackStop = null;
        this.lastTrackChangeSlotStart = null;
        this.lastTrackChangeSlotStop = null;
        this.lastTrackChangeUI = null;
        this.lastTrackChangeEvent = null;
        */
	return this;
    };
});
