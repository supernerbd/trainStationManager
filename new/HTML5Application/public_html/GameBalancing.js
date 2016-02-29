/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";
define(function() {
    return function(){
	this.trainTypes = [
            {
                "name": "ICE",
                "level": "LARGE",
                "contract": {
                    "reward": 1000,
                    "fee": -20000,
                    "refusePunishment": -10000,
                    "acceptReward": 0,
                    "reschedulePunishment": -500
                },
                "delay": {
                    "probablity": 0.1,
                    "factor": 30
                }
            },
            {
                "name": "RE",
                "level": "MEDIUM",
                "contract": {
                    "reward": 300,
                    "fee": -10000,
                    "refusePunishment": -5000,
                    "acceptReward": 0,
                    "reschedulePunishment": -150
                },
                "delay": {
                    "probablity": 0.1,
                    "factor": 20
                }
            },
            {
                "name": "RB",
                "level": "BASIC",
                "contract": {
                    "reward": 100,
                    "fee": -5000,
                    "refusePunishment": -1000,
                    "acceptReward": 500,
                    "reschedulePunishment": -50
                },
                "delay": {
                    "probablity": 0.2,
                    "factor": 10
                }
            },
            {
                "name": "ST", //has to be last!
                "level": "BASIC",
                "contract": {
                    "reward": 400,
                    "fee": -1000,
                    "refusePunishment": 0,
                    "acceptReward": 0,
                    "reschedulePunishment": -200
                }
            }
        ];
        this.startMoney = 15000;
        this.startTracks = 2;
       // this.platformCosts=-30000;
        this.shortTrack = -30000;
        this.mediumTrack = -100000;
        this.longTrack = -5000;
        this.upgrade1 = -16000;
        this.upgrade2 = -50000;
        this.maintenanceLongTrack = -5000;
        this.maintenanceUpgrade1 = -8000;
        this.maintenanceUpgrade2 = -10000;
        this.startContracts=0;
        this.startContractsOffert = 10;
        this.iceCosts=-20000;
        this.reCosts=-10000;
        this.refusePunishmentDown = 50; //%
        this.increasingTrackCosts = .5;
        this.standardTime = 3000;
        return this;
    };
});