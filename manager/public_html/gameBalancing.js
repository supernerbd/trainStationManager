function GameBalancing() {
    this.trainTypes = [
        {
            "name": "ICE",
            "contract": {
                "reward": 300,
                "fee": 3000,
                "refusePunishment": 3000,
                "acceptReward": 100
            }
        },
        {
            "name": "RE",
            "contract": {
                "reward": 200,
                "fee": 2000,
                "refusePunishment": 2000,
                "acceptReward": 0
            }
        },
        {
            "name": "RB",
            "contract": {
                "reward": 100,
                "fee": 1000,
                "refusePunishment": 1000,
                "acceptReward": 0
            }
        },
        {
            "name": "ST",
            "contract": {
                "reward": 400,
                "fee": 1000 
            }
        }
    ];
    this.startMoney = 5000;
    this.startPlatform = 2;
    this.platformCosts=-20000;
    this.startContracts=0;
    this.iceCosts=-1000;
    this.reCosts=-1000;
    return this;
}