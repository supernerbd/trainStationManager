function GameBalancing() {
    this.trainTypes = [
        {
            "name": "ICE",
            "contract": {
                "reward": 500,
                "fee": 3000,
                "refusePunishment": 3000,
                "acceptReward": 0,
                "reschedulePunishment": 200
            },
            "delay": {
                "probablity": 0.2,
                "factor": 50
            }
        },
        {
            "name": "RE",
            "contract": {
                "reward": 200,
                "fee": 2000,
                "refusePunishment": 2000,
                "acceptReward": 0,
                "reschedulePunishment": 100
            },
            "delay": {
                "probablity": 0.1,
                "factor": 30
            }
        },
        {
            "name": "RB",
            "contract": {
                "reward": 100,
                "fee": 1000,
                "refusePunishment": 1000,
                "acceptReward": 500,
                "reschedulePunishment": 50
            },
            "delay": {
                "probablity": 0.05,
                "factor": 10
            }
        },
        {
            "name": "ST",
            "contract": {
                "reward": 400,
                "fee": 1000,
                "refusePunishment": 0,
                "acceptReward": 0,
                "reschedulePunishment": 200
            }
        }
    ];
    this.startMoney = 5000;
    this.startPlatform = 2;
    this.platformCosts=-30000;
    this.startContracts=0;
    this.iceCosts=-20000;
    this.reCosts=-10000;
    return this;
}