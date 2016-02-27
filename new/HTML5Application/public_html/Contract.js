/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";
define(function() {
    return function(){
        this.id = 0;
        this.level="BASIC";
        this.trainName;
        
	this.refusePunishment = 0;
        this.acceptReward = 0;

        this.startingTime = 0;
        this.tact = 0;
        this.track = 0;
        this.type;
        this.lineNo;
        this.reward = 0;
        this.fee = 0;

        this.html = "";


        return this;
    };
});