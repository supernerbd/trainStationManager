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
}
function setUpSortable() {
    for (var i = 0; i < gameState.numPlatforms; i++) {
        $("#track" + i).sortable({
            connectWith: ".column"
        });
    }
}