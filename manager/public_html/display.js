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
function setUpSortable() {
    for (var i = 0; i < gameState.numPlatforms; i++) {
        $("#track" + i).sortable({
            connectWith: ".column"
        });
    }
}
//function displayHover(id){
    //take id of contract and write information down here
  //  document.getElementById("hover").style.setProperty("display", "inherit"); 
//}
//function closeHover (){
  //  document.getElementById("hover").style.setProperty("display", "none");
//}