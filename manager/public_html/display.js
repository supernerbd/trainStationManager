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
    var e = gameState.events[2];
    var a = null;
    var b = null;
    
    for (var i = 0; i < e.length; i++) {
        console.log("" + e[i].time + " ==? " + gameState.lastTrackChangeSlotStart);
        if (e[i].time == gameState.lastTrackChangeSlotStart) {
            a = e[i];
        }
    }
    for (var i = 0; i < e.length; i++) {
        if (e[i].time == gameState.lastTrackChangeSlotStop) {
            b = e[i];
        }
    }
    
    if (a != null && b != null) {
        console.log("Conflict");
    } else if (a != null && b == null) {
        console.log("HERE");
    } else {
        console.log("Makes no sense");
    }
}
function trackChangeStartedEvent(event, ui) {
    gameState.lastTrackChangeTrackStart = event.target.id;
    gameState.lastTrackChangeSlotStart = ui.item.index();
}
function trackChangeStoppedEvent(event, ui) {
    gameState.lastTrackChangeTrackStop = event.target.id;
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
