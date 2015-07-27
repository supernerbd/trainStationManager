function TrainEvent() {
    this.html = "";
    this.time = 0;
    this.platform = 0;
    this.lineNo = 0;
    this.reward = 0;
    this.fee = 0;
    this.type = 0;
    
    this.origTime = -1;
    this.rescheduleReason = null;
    
    return this;
}


