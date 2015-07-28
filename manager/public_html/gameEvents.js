function updatePlatformsEvent() {
    
    console.debug("updatePlatformsEvent: got triggered");
    createTable();
    displayTable();
    setUpSortable();
    timeColor(gameState.time);
}

function dayChangeEvent() {
    
    console.debug("dayChangeEvent: got triggered");
    gameState.time = 0;
    changeDay(1);
    createDayTraffic();
    createEvents();
    updatePlatformsEvent();
}

function timeChangeEvent() {
    
    console.debug("timeChangeEvent: got triggered");
    timeColor(gameState.time);
    advanceTimeslider(gameState.time);

    for (var i = 0; i < gameState.events.length; i++){ //actual calc things
            var jlength = gameState.events[i].length;
            for (var j = 0; j<jlength; j++){
                    if (gameState.time === gameState.events[i][j].time){
                            if (gameState.events[i][j].platform !== 0){
                                    changeMoney(gameState.events[i][j].reward);
                            } else {
                                    changeMoney(-gameState.events[i][j].fee);
                                    gameState.events[i][j].hide = true;
                            }
                    }
            }
    }
    gameState.time++;
}

function generateDelaysEvent() {
    
    console.debug("generateDelaysEvent: got triggered");
    
    for (var i = 0; i < gameState.events.length; i++) {
        for (var j = 0; j < gameState.events[i].length; j++) {
            if (gameState.events[i][j].platform !== 0 && gameBalancing.trainTypes[gameState.events[i][j].type].delay) {
                if (Math.random() < gameBalancing.trainTypes[gameState.events[i][j].type].delay.probablity) {
                    console.debug("generateDelaysEvent: delaying train event " + i + "." + j
                                + "(Line " + gameState.events[i][j].type + "/" + gameState.events[i][j].lineNo + ")"
                                + " @" + displayTime(gameState.events[i][j].time)
                                + " on platform " + gameState.events[i][j].platform);
                        
                    gameState.events[i][j].origTime = gameState.events[i][j].time;
                    gameState.events[i][j].time += Math.floor(Math.random() * gameBalancing.trainTypes[gameState.events[i][j].type].delay.factor / 3);
                    console.debug("generateDelaysEvent: new time is " + gameState.events[i][j].time
                                    + "(" + displayTime(gameState.events[i][j].time) + ")");
                    gameState.events[i][j].rescheduleReason = 'd';
                    break;
                }
            }
        }
    }
    updatePlatformsEvent();
}

function makeStuffInterestingEvent() {
    
    console.debug("makeStuffInterestingEvent: got triggered");
    
    if (gameState.time % 5 === 0) {
        generateDelaysEvent();
    }
}

function cleanUpEventsEvent() {
    
    console.debug("cleanUpEventsEvent: got triggered");
}