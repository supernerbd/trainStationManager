function Contract(ptype, plineNo) {
    this.successReward = 0;
    this.punishment = 0;
    this.refusePunishment = 0;
    this.acceptReward = 0;
    
    this.startingTime = 0;
    this.tact = 0;
    this.platform = 0;
    this.type = ptype;
    this.lineNo = plineNo;
    this.reward = 0;
    this.fee = 0;
    
    this.html = "";
    

    return this;
}
