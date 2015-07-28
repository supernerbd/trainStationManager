// function stop doesn't end the game properly. Its just stops the gameLoop.
// Balancing isn't done at all.

//Buttons
function go () { //Start program

    if (gameState.stopped === false) {
        alert ("already started");
        return;
    }

    changeMoney(gameBalancing.startMoney);
    startPlaformNr(gameBalancing.startPlatform);

    var n = gameBalancing.startContracts;
    for (var i = 0; i < n; i++) {
        gameState.acceptedContracts[i] = createNewContract (i, gameState.nextLine);
        gameState.acceptedContracts[i].platform = n - i;
        gameState.nextLine++;
    }
    displayContracts();

    for (var i = 0; i < 3; i++) {
        gameState.offeredContracts[i] = createNewContract (i, gameState.nextLine);
        gameState.nextLine++;
    }
    displayContractsOffered();

    gameState.stopped = false;
    dayChangeEvent();

    alert ("Have Fun!");
    gameLoop();
}

function stop () { //Stop program

	gameState.stopped = true;
	window.gameState = new GameState();
}

function save () { //save
	//alert ("Not Working (save)")
	var check=prompt("Zahl", "");
	timeColor(check);
}

function load () { //load
	alert ("Not Working (load)");
}

function fchangespeed (y) { //Change Real-Time running of Game-Loop
	//var y = 1;
	//var x = document.getElementsByName("timer");
	//	for (var i=0; i<x.length; i++){
	//		if (x[i].checked) 
	//			y = x[i].value;
	//	}
	gameState.speed = y; //set speed into gameState
}

function addICE(){
    changeMoney(gameBalancing.iceCosts);
    gameState.ice=true;
}

function addRE(){
    changeMoney(gameBalancing.reCosts);
    gameState.re=true;
}
function advanceTimeslider(t) {
        
        document.getElementById("timeslider-slider").style.setProperty("left", getCurrentSlotAbsPos() + "px");

        if (!gameState.autoScroll) {
            return;
        }
        
	window.location.assign("#0." + t);
	window.location.assign("#1." + t);

	if ((gameState.time * 3) % ((getNumSlotsDisplayed() - 4) * 3) == 0) {
		scrollToPercent(20);
	}
}

function timeColor(n) {

    for (var i = 0; i < n - 1; i++) {
        document.getElementById("0." + i).setAttribute('style', 'background-color: grey');
    }
    document.getElementById("0." + i).setAttribute('style', 'background-color: red');
}

function displayTime(nr){
	var first = (nr/20);
	first = Math.floor(first);
	first = first +4;
	var second = "";
	var third = "";
	var result;
	var x = nr%20;
	switch (x){
		case 0:
		third = 0;
		break;
		case 1:
		third = 3;
		break;
		case 2:
		third = 6;
		break;
		case 3:
		third = 9;
		break;
		case 4:
		third = 12;
		break;
		case 5:
		third = 15;
		break;
		case 6:
		third = 18;
		break;
		case 7:
		third = 21;
		break;
		case 8:
		third = 24;
		break;
		case 9:
		third = 27;
		break;
		case 10:
		third = 30;
		break;
		case 11:
		third =33;
		break;
		case 12:
		third = 36;
		break;
		case 13:
		third = 39;
		break;
		case 14:
		third = 42;
		break;
		case 15:
		third = 45;
		break;
		case 16:
		third = 48;
		break;
		case 17:
		third = 51;
		break;
		case 18:
		third = 54;
		break;
		case 19:
		third = 57;
		break;
	}
	if (third <10){
		second = 0;
	}
	first.toString();
	second.toString();
	third.toString();
	result = first + "."+ second + third;
	return result;
}
//Game Play functions
function delay() {
return 0; //ToDo think of an algorithm to define delays.
}

function createNewContract (type, lineNo){ //Create new Contract, displayed at contractsoffered.
    if (type===0 && gameState.ice===false){
        type=1;
    }
    if (type===1 && gameState.re===false){
        type=2;
    }
    
    var contract = new Contract(type, lineNo);
        
        contract.reward = gameBalancing.trainTypes[type].contract.reward;
        contract.fee = gameBalancing.trainTypes[type].contract.fee;
        contract.refusePunishment = gameBalancing.trainTypes[type].contract.refusePunishment;
        contract.acceptReward = gameBalancing.trainTypes[type].contract.acceptReward;
        
	//tact and start time
	var tact;
	var startTime;
	var v = Math.floor((Math.random() * 10) + 1);
	switch (v){
		case 1:
                    tact = 0.5;
                    startTime = Math.floor((Math.random() * 100) + 1);
                    break;
		case 2:
                    tact = 2;
                    startTime = Math.floor((Math.random() * 100) + 1);
                    break;
		case 3:
                    tact = 2;
                    startTime = Math.floor((Math.random() * 100) + 1);
                    break;
		case 4:
                    tact = 3;
                    startTime = Math.floor((Math.random() * 100) + 1) + 30;
                    break;
		case 5:
                    tact = 4;
                    startTime = Math.floor((Math.random() * 100) + 1) + 30;
                    break;
		case 6:
                    tact = 5;
                    startTime = 2 * (Math.floor((Math.random() * 100) + 1));
                    break;
		case 7:
                    tact = 6;
                    startTime = 2 * (Math.floor((Math.random() * 100) + 1));
                    break;
		case 8: 
                    tact = 1;
                    startTime = Math.floor((Math.random() * 100) + 1);
                    break;
		case 9: 
                    tact = 1;
                    startTime = Math.floor((Math.random() * 100) + 1);
                    break;
		case 10: 
                    tact = 1;
                    startTime = Math.floor((Math.random() * 100) + 1);
                    break;
	}
	contract.tact = tact;
	contract.startingTime = startTime;
	return contract;
}

function createDayTraffic(){ //Create Day Traffic, save it to gameState. Use function only once every day.
    var n = Math.floor((Math.random() * 10) + 1);
    
    for (var i = 0; i <= n; i++) {
        var e = gameState.dayTraffic[i] = new TrainEvent();
        
        e.html = displayTrain(3) + "<br>" + (i+1);
        e.time = 3 * (Math.floor((Math.random() * 100) + 1));
        e.platform = 0;
        e.lineNo = i + 1;
        e.type = 3;
        e.reward = gameBalancing.trainTypes[e.type].contract.reward;
        e.fee = gameBalancing.trainTypes[e.type].contract.fee;
    }
}
function addDayTraffic() {
    var add = gameState.events.length;

    gameState.events[add] = new Array();
    for (var i = 0; i < gameState.dayTraffic.length; i++) {
        var e = gameState.events[add][i] = new TrainEvent();
        var t = gameState.dayTraffic[i];
        
        e.html = t.html;
        e.time = t.time;
        e.platform = t.platform;
        e.lineNo = t.lineNo;
        e.reward = t.reward;
        e.fee = t.fee;
        e.type = t.type;
    }
}

function checkCollision(contract, event) {
    var r = gameState.events[contract][event];

    for (var i=0; i<gameState.events.length; i++){ //for every contract
        for (var j=0; j<gameState.events[i].length; j++){ //for every event
            var e = gameState.events[i][j];
            if (e !== r) {
                if (e.time === r.time && e.platform === r.platform) {
                    alert("Collision @ platform " + r.platform
                            + " for timeslot " + r.time + " detected."
                            + " Trains " + r.type + "-" + r.lineNo
                            + " and " + e.type + "-" + r.lineNo
                            + " involved.");
                    e.platform = 0;
                    e.rescheduleReason = 'c';
                }
            }
        }
    }
}

function createTable (){ //Create main table. Without any Data
	var table = new Array();

	for (var i=0; i<=gameState.numPlatforms; i++){ //Build table Array with row arrays without content.
		table[i] = new Array();
		for (var j=0; j<=380; j++){
			if (i===0){
				table[i][j]=false;
			} else {
				table[i][j]="<br>";
			}
		}
	}
	gameState.table = table;
	insertTableData ();
}

function createEvents() { 

	for (var j=0; j<gameState.acceptedContracts.length; j++){ //Search through all taken contracts, j == contract number
		var z = 0; // EventNr in Events for that contract
		gameState.events[j] = new Array ();

                var c = gameState.acceptedContracts[j]; 
		for (var x = c.startingTime; x <= 380; x += (20 * c.tact)) {

                        for (var a = 0; a < gameState.events.length; a++) {
                            for (var b = 0; b < gameState.events[a].length; b++) {
                                if (gameState.events[a][b].time == x &&
                                    gameState.events[a][b].platform == c.platform) {
                                    alert("collision @  " + c.platform + "." + displayTime(x));
                                }
                            }
                        }
                        
			var e = gameState.events[j][z] = new TrainEvent();
			e.html = displayTrain(c.type) + "<br>" + c.lineNo;
			e.time = x;
                        e.platform = c.platform;
                        e.lineNo = c.lineNo;
                        e.reward = c.reward;
                        e.fee = c.fee;
                        e.type = c.type;

                        checkCollision(j, z);
			z++;
		}
	}
        addDayTraffic();
}

function insertTableData() {

	for (var i = 0; i<gameState.events.length; i++){ //For every contract
		for (var j = 0; j < gameState.events[i].length; j++){ //for every event in contract
			var platform = gameState.events[i][j].platform;
			var time = gameState.events[i][j].time;
                        if (gameState.events[i][j].hide) {
                            ;
                        } else {
                            if (platform === 0) {
                                    gameState.table[platform][time] = "<div class='buttonpl0' onclick='selectPlatformEvent("
                                                                        + i + "," + j + ")'>"
                                                                        + gameBalancing.trainTypes[gameState.events[i][j].type].name
                                                                        + gameState.events[i][j].lineNo
                                                                        + " @" + displayTime(time) + "</div>";
                            } else {
                                    gameState.table[platform][time] = gameState.events[i][j].html;

                            }
                            if (gameState.events[i][j].rescheduleReason !== null) {
                                    gameState.table[platform][time] =
                                            "<div class='reschedule'>"
                                            + gameState.table[platform][time]
                                            + "</div>";
                            }
                        }
		}
	}
}

function displayTable() { 
	var content = "<table class='slot'><tbody id='tablebodyplatforms'><tr>";
	var content0 = "<table class='slot'><tbody>";

	var timeline = document.getElementById("timeline");
	var timeline_html = "<table class='slot'><tr>";
	for (var i=0; i<=380; i++) {
		timeline_html += "<th id='0." + i + "' class='slot'>" + displayTime(i) + "</th>";
	}
	timeline_html += "</tr></table>";
	timeline.innerHTML = timeline_html;

	for (var i=0; i<gameState.table.length; i++){
		if (i===0){
                        content0 += "<tr class='column' id='track" + i + "'>";
			for (var j=0; j<gameState.table[i].length; j++){
				if (gameState.table[i][j] !== false) {
					content0 += '<td id="' + i + "." + j + '"class="slot">' + gameState.table[i][j] + '</td>';
				}
			}
                        content0 += "</tr>";
		} else {
			content += "<tr class='column' id='track" + i + "'>"; 
			for (var j=0; j<gameState.table[i].length; j++){
				content += "<td id='" + i + "." + j + "' class='slot"
					+ ((gameState.table[i][j].length > 4) ? " moveable" : "")
					+ "'>" + gameState.table[i][j] + "</td>";
				/*
				 * ToDo:
				 * add onhover or onclick event to show details on desktop version of app
				 */
			}
			content += "</tr>";
		}
	}
	content += "</tbody></table>";
	content0 += "</tbody></table>";
	document.getElementById("table").innerHTML = content; 
	document.getElementById("gleis0").innerHTML = content0; 
}

function changeMoney(amount){ //Change Money value and display and loosing condition 

	gameState.money += amount; // set new amount to gameState.
        document.getElementById("moneyChange").innerHTML=amount;
        if (amount>=0){
            document.getElementById("moneyChange").style.setProperty("color","green");
        }
        else{
            document.getElementById("moneyChange").style.setProperty("color", "red");
        }
	document.getElementById("money").innerHTML = gameState.money; //replace money display to new amount
	if (gameState.money <= 0) {
		stop();
		alert("You Lost. Try again and take a look at your expenses.");
	}
}

function changeDay(day){ //Change Day value and display

	if (day===1){
		gameState.daysPlayed += day; // set day counter to new day
		document.getElementById("day").innerHTML = gameState.daysPlayed; //replace day display to new day
	} else {
		alert("somthing wrong (changeDay)");
	}
}

function startPlaformNr(nr){ //change platform value

	gameState.numPlatforms = nr; //
}

function changePlatformNr(n, check){ //Change Platform Number of an Line. Bug: Wenn LineNr nicht fortlaufend, dann falsche zuordnung in gameState.acceptedContracs[nr].
	//var check = prompt("Platform Number for this Line", "");
	//if (gameState[4]<check){
	//	check = prompt ("Enter a valid Platform Number","");
	//	if (gameState[4]<check){
	//		check = 1;
	//	}
	//}
	//
	gameState.acceptedContracts[n].platform = check;
	displayContracts();
	createEvents ();
        updatePlatformsEvent();
        closeSelectPlatform ();
}

function changePlatformNrEvent(contract, event, newplatform) {
    
	gameState.events[contract][event].platform = newplatform;
        checkCollision(contract, event);
	displayContracts();
        updatePlatformsEvent();
        closeSelectPlatform();
}

function addNewPlatform(){ //Add new Platform. ToDo: Add values to getting new platforms

	gameState.numPlatforms++;
	changeMoney(gameBalancing.platformCosts);
        updatePlatformsEvent();
	alert ("New Platform added");
	//alert ("The new platform will be available tomorrow"); //ToDO: Bug!!! I can set platform value to not existing platform
}

function displayContracts() {
	var content = "<h3>Your Contracts</h3><br>";

	for (var i=0; i<gameState.acceptedContracts.length; i++){
                var c = gameState.acceptedContracts[i];
		content += "<table><tr><th>Type</th><th>Line Nr</th>"
                            + "<th>Reward</th><th>Fee</th><th>Refuse Fee</th><th>Accept Reward</th>"
                            + "<th>Tact</th><th>Starting Time</th>"
                            + "<th><div class='buttonTable' id='platformChange' onclick='selectPlatform ("
                            + (c.lineNo - 1) + ")'>Platform (Change)</div></th></tr><tr>";

                content += "<td>" + displayTrain(c.type) + "</td>"
                            + "<td>" + c.lineNo + "</td>"
                            + "<td>" + c.reward + "</td>"
                            + "<td>" + c.fee + "</td>"
                            + "<td>" + c.refusePunishment + "</td>"
                            + "<td>" + c.acceptReward + "</td>"
                            + "<td>" + c.tact + "</td>"
                            + "<td>" + displayTime(c.startingTime) + "</td>"
                            + "<td>" + c.platform + "</td>";
                    
		content += "</tr></table>";
	}
	document.getElementById("contractstaken").innerHTML = content;
}

function displayContractsOffered() {
	var content = "<h3>Contracts Offered</h3><br>";

	for (var i=0; i<gameState.offeredContracts.length; i++){
                var c = gameState.offeredContracts[i];
                
		content += "<table><tr><th>Type</th><th>Line Nr</th>"
                            + "<th>Reward</th><th>Fee</th><th>Refuse Fee</th><th>Accept Reward</th>"
                            + "<th>Tact</th><th>Starting Time</th><th><div class='buttonTable' id='accept' onclick='selectPlatformContract("
                            + i + ")'>Accept</div></th></tr><tr>";
                
                content += "<td>" + displayTrain(c.type) + "</td>"
                            + "<td>" + c.lineNo + "</td>"
                            + "<td>" + c.reward + "</td>"
                            + "<td>" + c.fee + "</td>"
                            + "<td>" + c.refusePunishment + "</td>"
                            + "<td>" + c.acceptReward + "</td>"
                            + "<td>" + c.tact + "</td>"
                            + "<td>" + displayTime(c.startingTime) + "</td>";
                        
		content += "<td><div class='buttonTable' id='refuse' onclick='refuseContract("
                            + i + ")'>Refuse</div></td></tr></table>";
	}
        
	document.getElementById("contractsoffered").innerHTML = content;
}

function acceptContract(n, platform) {
	var tomove = gameState.offeredContracts[n];
	var length = gameState.acceptedContracts.length;
        var v = Math.floor((Math.random() * 10) + 1);
        var type; //random type!
        if (v<=3){
            type=2;
        }
        if (v<=7){
            type=1;
        }
        else {
            type=0;
        }
        gameState.offeredContracts[n] = createNewContract(type, gameState.nextLine);
	//gameState.offeredContracts[n] = createNewContract(tomove.type, gameState.nextLine);
	gameState.nextLine++;
	gameState.acceptedContracts[length] = new Array ();
	gameState.acceptedContracts[length] = tomove;
	gameState.acceptedContracts[length].platform = platform;
	changeMoney(tomove.acceptReward);
	displayContracts();
	displayContractsOffered();
	createEvents ();
        updatePlatformsEvent();
        closeSelectPlatform ();
	//ToDO: Update Table!
}

function refuseContract(n) {
	var tomove = gameState.offeredContracts[n];

	gameState.offeredContracts[n] = createNewContract(tomove.type, gameState.nextLine);
	gameState.nextLine++;
	changeMoney(-tomove.refusePunishment);
	displayContractsOffered();
}

function selectPlatformContract(n) {
    var content = "";

    openSelectPlatform();
    for (var i=1; i <= gameState.numPlatforms; i++){
        content += "<div class='buttonpl' onclick='acceptContract(" + n + "," + i+ ")'>" + i + "</div>";
    }
    document.getElementById("selectPlatform-inner").innerHTML = content;
}

function selectPlatform(n) {
    var content = "";
    openSelectPlatform ();
    for (var i=1; i <= gameState.numPlatforms; i++){
        content += "<div class='buttonpl' onclick='changePlatformNr(" + n + "," + i + ")'>" + i + "</div>";
    }
    document.getElementById("selectPlatform-inner").innerHTML = content;
}

function selectPlatformEvent(i, j){
    var content = "";
    openSelectPlatform();
    for (var x=1; x <= gameState.numPlatforms; x++){
        content += "<div class='buttonpl' onclick='changePlatformNrEvent(" + i + "," + j + "," + x + ")'>" + x + "</div>";
    }
    document.getElementById("selectPlatform-inner").innerHTML = content;
}

function displayTrain(train) {
    
    return gameBalancing.trainTypes[train].name;
}

//Game Loop functions
function gameLoop (){ //Set Timeout

	setTimeout(function (){gameLoopCalc();}, 3000/window.gameState.speed);
}

function gameLoopCalc() {

    if (gameState.stopped===true) {
        return;
    }

    if (gameState.time<=380) {
        timeChangeEvent();
        makeStuffInterestingEvent();
    } else {
        dayChangeEvent();
    }
    gameLoop();
}

function tracksTrackScroll() {
	document.getElementById("timeline").scrollLeft = document.getElementById("gleise").scrollLeft;
	document.getElementById("timeslider-slider").style.setProperty("left", getCurrentSlotAbsPos() + "px");

}

function timelineTrackScroll() {
	document.getElementById("gleise").scrollLeft = document.getElementById("timeline").scrollLeft;
	document.getElementById("timeslider-slider").style.setProperty("left", getCurrentSlotAbsPos() + "px");
}

// gameState.acceptedContracts[0] could be undefined!
window.gameState = new GameState();
window.gameBalancing = new GameBalancing();
fchangespeed (5);
