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
            "name": "ST"
        }
    ];
    this.startMoney = 10100;
    this.startPlatform = 3;
    this.platformCosts=-10000;
    return this;
}