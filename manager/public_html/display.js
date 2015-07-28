function openContracts (){
    document.getElementById("contracts").style.setProperty("display", "inherit");
    document.getElementById("control").style.setProperty("display", "none");
}
function openShop (){
    document.getElementById("shop").style.setProperty("display", "inherit");
    document.getElementById("control").style.setProperty("display", "none");
}
function openSelectPlatform (){ 
    document.getElementById("selectPlatform").style.setProperty("display", "inherit");
}
function closeContracts (){
    document.getElementById("contracts").style.setProperty("display", "none");
    document.getElementById("control").style.setProperty("display", "inherit");
}
function closeShop (){
    document.getElementById("shop").style.setProperty("display", "none");
    document.getElementById("control").style.setProperty("display", "inherit");
}
function closeSelectPlatform (){
    document.getElementById("selectPlatform").style.setProperty("display", "none");
}
function toggleAutoscroll() {
    gameState.autoScroll = gameState.autoScroll ? false : true;
    if (gameState.autoScroll===true){
        document.getElementById("toggleautoscroll").style.setProperty("background-image", "url('pic/autoscroll-on.png')");
    }
    else {
       document.getElementById("toggleautoscroll").style.setProperty("background-image", "url('pic/autoscroll-off.png')");
    }
}
function handleTrackChange() {
    var a = null;
    var b = null;
    
    function _findEvent(slot, track) {
        console.debug("_findEvent: searching for " + track + "." + slot);
        for (var j = 0; j < gameState.events.length; j++) {
            var e = gameState.events[j];
            for (var i = 0; i < e.length; i++) {
                if (e[i].time == slot && e[i].platform == track) {
                    console.debug("_findEvent: found at " + j + ", " + i);
                    return e[i];
                }
            }
        }
        console.debug("_findEvent: not found");
        return null;
    }
    
    if (gameState.lastTrackChangeTrackStop === null) {
        /*
         * inner track/platform change
         */
        a = _findEvent(gameState.lastTrackChangeSlotStart, gameState.lastTrackChangeTrackStart);
        b = _findEvent(gameState.lastTrackChangeSlotStop, gameState.lastTrackChangeTrackStop);

        if (a != null && b != null) {
            console.debug("handleTrackChange: conflict, target position already has schedule");
            alert("Conflict! Train at target position!");
        } else if (a != null && b == null) {
            if (a.time <= gameState.time || gameState.lastTrackChangeSlotStop < a.time) {
                console.debug("handleTrackChange: move in or into past or arriving earlier doesn't make sense");
            } else {
                a.rescheduleReason = 'm';
                a.origTime = a.time;
                a.time = gameState.lastTrackChangeSlotStop;
                console.debug("handleTrackChange: updated event");
                changeMoney(-gameBalancing.trainTypes[a.type].contract.reschedulePunishment);
                console.debug("handleTrackChange: punished conductor");
            }
        } else {
            console.debug("handleTrackChange: player's change makes no sense");
        }
    } else {
        /*
         * platform change
         */
        console.debug("handleTrackChange: platform change detected"
            + " from platform " + gameState.lastTrackChangeTrackStart
            + " to " + gameState.lastTrackChangeTrackStop);
    
        if (gameState.lastTrackChangeTrackStart === 0) {
            console.debug("handleTrackChange: platform0 change:"
                            + " moving " + gameState.lastTrackChangeSlotStart
                            + " to platform " + gameState.lastTrackChangeTrackStop);
            var slot = parseInt(gameState.lastTrackChangeUI.item.children()[0].id.substr(4));
            gameState.events[gameState.events.length-1][slot].platform = gameState.lastTrackChangeTrackStop;
            gameState.dayTraffic[slot].platform = gameState.lastTrackChangeTrackStop; // see note below...
            /*
	     * XXX/TODO/FIXME:
	     * checkCollision()
	     */
        } else {
            a = _findEvent(gameState.lastTrackChangeSlotStart, gameState.lastTrackChangeTrackStart);
            b = _findEvent(gameState.lastTrackChangeSlotStop, gameState.lastTrackChangeTrackStop);

            if (a == null) {
                console.debug("handleTrackChange: platform change: empty source slot");
            } else if (a != null && b != null) {
                console.debug("handleTrackChange: platform change: target slot not empty");
            } else {
                console.debug("handleTrackChange: platform change: moving platform and maybe slot");

                if (a.time <= gameState.time || gameState.lastTrackChangeSlotStop < a.time) {
                    console.debug("handleTrackChange: platform change: move in or into past or arriving earlier doesn't make sense");
                } else {
                    a.rescheduleReason = 'm';
                    a.origTime = a.time;
                    a.time = gameState.lastTrackChangeSlotStop;
                    a.platform = gameState.lastTrackChangeTrackStop;
                    /*
                     * XXX/FIXME: if this is day traffic, we need to change data structure
                     *      in dayTraffic[], too, since attributes hold duplicated and may
                     *      be added in again on addDayTaffic(), which might be called
                     *      for example on adding a new train line by closing a contract...
                     */
                    console.debug("handleTrackChange: platform change: updated event");
                    changeMoney(-gameBalancing.trainTypes[a.type].contract.reschedulePunishment);
                    console.debug("handleTrackChange: platform change: punished conductor");
                }
            }
        }
    }

    updatePlatformsEvent();
}
function trackChangeStartedEvent(event, ui) {
    
    console.debug("trackChangeStartedEvent: got triggered");
    gameState.lastTrackChangeTrackStart = parseInt(event.target.id.substr(5));
    gameState.lastTrackChangeTrackStop = null;
    gameState.lastTrackChangeSlotStart = ui.item.index();
    gameState.lastTrackChangeSlotStop = null;
    gameState.lastTrackChangeEvent = event;
    gameState.lastTrackChangeUI = ui;
}
function trackChangeStoppedEvent(event, ui) {
    
    console.debug("trackChangeStoppedEvent: got triggered");
    gameState.lastTrackChangeSlotStop = ui.item.index();
    handleTrackChange();
}
function trackChangeReceiveEvent(event, ui) {
    
    console.debug("trackChangeReceiveEvent: got triggered");
    gameState.lastTrackChangeTrackStop = parseInt(event.target.id.substr(5));
}
function setUpSortable() {
    for (var i = 0; i <= gameState.numPlatforms; i++) {
        $("#track" + i).sortable({
            connectWith: ".column",
            start: trackChangeStartedEvent,
            stop: trackChangeStoppedEvent,
            receive: trackChangeReceiveEvent
        });
        $("#track" + i).disableSelection();
    }

}
//function displayHover(id){
    //take id of contract and write information down here
  //  document.getElementById("hover").style.setProperty("display", "inherit"); 
//}
//function closeHover (){
  //  document.getElementById("hover").style.setProperty("display", "none");
//}
// }

