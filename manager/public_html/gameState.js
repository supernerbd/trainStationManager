function GameState() {
	this.acceptedContracts = new Array();
	this.daysPlayed = 0;
	this.money = 0;
	this.offeredContracts = new Array();
	this.numPlatforms = 0;
	this.stopped = true;
	this.nextLine = 1;
	this.speed = 1;
	this.table = new Array();
	this.events = new Array();
	this.dayTraffic = new Array();
	this.time = 0;

        this.autoScroll = true;
        
        this.lastTrackChangeTrackStart = null;
        this.lastTrackChangeTrackStop = null;
        this.lastTrackChangeSlotStart = null;
        this.lastTrackChangeSlotStop = null;
        
	return this;
}
