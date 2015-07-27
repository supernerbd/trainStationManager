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
        console.log("_findEvent: searching for " + track + "." + slot);
        for (var j = 0; j < gameState.events.length; j++) {
            var e = gameState.events[j];
            for (var i = 0; i < e.length; i++) {
                if (e[i].time == slot && e[i].platform == track) {
                    console.log("_findEvent: found at " + j + ", " + i);
                    return e[i];
                }
            }
        }
        console.log("_findEvent: not found");
        return null;
    }
    
    a = _findEvent(gameState.lastTrackChangeSlotStart, gameState.lastTrackChangeTrackStart);
    b = _findEvent(gameState.lastTrackChangeSlotStop, gameState.lastTrackChangeTrackStop);
    
    if (a != null && b != null) {
        alert("Conflict! Train at target position!");
    } else if (a != null && b == null) {
        console.log("HERE");
    } else {
        console.log("Makes no sense");
    }
}
function trackChangeStartedEvent(event, ui) {
    gameState.lastTrackChangeTrackStart = event.target.id.substr(5);
    gameState.lastTrackChangeSlotStart = ui.item.index();
}
function trackChangeStoppedEvent(event, ui) {
    gameState.lastTrackChangeTrackStop = event.target.id.substr(5);
    gameState.lastTrackChangeSlotStop = ui.item.index();
    handleTrackChange();
}
function setUpSortable() {
    for (var i = 0; i <= gameState.numPlatforms; i++) {
        $("#track" + i).sortable({
            connectWith: ".column",
            start: trackChangeStartedEvent,
            stop: trackChangeStoppedEvent
        });
        $("#track" + i).disableSelection();
    }
 }
