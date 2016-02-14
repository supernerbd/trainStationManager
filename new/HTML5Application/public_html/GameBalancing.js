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
                    "reward": 500,
                    "fee": -3000,
                    "refusePunishment": -3000,
                    "acceptReward": 0,
                    "reschedulePunishment": -200
                },
                "delay": {
                    "probablity": 0.2,
                    "factor": 50
                }
            },
            {
                "name": "RE",
                "level": "MEDIUM",
                "contract": {
                    "reward": 200,
                    "fee": -2000,
                    "refusePunishment": -2000,
                    "acceptReward": 0,
                    "reschedulePunishment": -100
                },
                "delay": {
                    "probablity": 0.1,
                    "factor": 30
                }
            },
            {
                "name": "RB",
                "level": "BASIC",
                "contract": {
                    "reward": 100,
                    "fee": -1000,
                    "refusePunishment": -1000,
                    "acceptReward": 500,
                    "reschedulePunishment": -50
                },
                "delay": {
                    "probablity": 0.05,
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
        this.startMoney = 5000;
        this.startTracks = 2;
       // this.platformCosts=-30000;
        this.shortTrack = -30000;
        this.mediumTrack = -100000;
        this.longTrack = -200000;
        this.upgrade1 = -100000;
        this.upgrade2 = -1000000;
        this.startContracts=0;
        this.startContractsOffert = 10;
        this.iceCosts=-20000;
        this.reCosts=-10000;
        this.refusePunishmentDown = 10; //%
        this.standardTime = 3000;
        return this;
    };
});