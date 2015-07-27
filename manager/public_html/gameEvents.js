function updatePlatformsEvent() {
    
    console.debug("updatePlatformsEvent: got triggered");
    createTable();
    displayTable();
    setUpSortable();
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
                            }
                    }
            }
    }
    gameState.time++;
}