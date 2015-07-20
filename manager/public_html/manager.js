// Save and Load is not included but even though not necessary.
// Save and Load is not included but even though not necessary.
// function stop doesn't end the game properly. Its just stops the gameLoop.
// Balancing isn't done at all.

//Buttons
function go () { //Start program
	if (gameState[5] === false){ //is game stopped or still running?
		alert ("already startet");
	}
	else {
		changeDay(1); //Set number of days to 1 and display.
		changeMoney(10100); //Set starting money and display.
		startPlaformNr(3); //Set platform number to 2.
		//Create 3 taken contracts and give them platforms;
		gameState[0][0]= createNewContract (0, gameState[6]);
		gameState[0][0][8]=3;
		gameState[6]++;
		gameState[0][1]= createNewContract (1, gameState[6]);
		gameState[0][1][8]=2;
		gameState[6]++;
		gameState[0][2]= createNewContract (2, gameState[6]);
		gameState[0][2][8]=1;
		gameState[6]++;
		displayContracts();
		//Create 3 offert contracts.
		gameState[3][0]= createNewContract (0, gameState[6]);
		gameState[6]++;
		gameState[3][1]= createNewContract (1, gameState[6]);
		gameState[6]++;
		gameState[3][2]= createNewContract (2, gameState[6]);
		gameState[6]++;
                createDayTraffic ();
		displayContractsOffert();
                createEvents ();
		createTable ();
		displayTable ();
		alert ("Have Fun!");
		gameState[5]=false; //Think about this again
		gameLoop ();
	}
}

function stop () { //Stop program
	gameState[5]=true; //sets gameState[5] (stopped) to true.
	//Set gameState back to start.
	gameState [6] = 1;
	gameState[2] = 0;
	gameState[1] = 0;
}

function save () { //save
	//alert ("Not Working (save)")
	var check=prompt("Zahl", "");
	timeColor(check);
}

function load () { //load
	alert ("Not Working (load)");
}
function test () { //test things
	displayTable (); 
}
function fchangespeed () { //Change Real-Time running of Game-Loop
	var y = 1;
	var x = document.getElementsByName("timer");
		for (var i=0; i<x.length; i++){
			if (x[i].checked) 
				y = x[i].value;
		}
	gameState[7] = y; //set speed into gameState
}

function advanceTimeslider(t) {
	window.location.assign("#0." + t);
	window.location.assign("#1." + t);
}

function timeColor(x){
	var i=x;
	var i2 = i-1;
		document.getElementById("0."+[i]).setAttribute('style', 'background-color: red');
		if (i2>=0){
		document.getElementById("0."+[i2]).setAttribute('style', 'background-color: grey');
		}
	//Setzt aktuelle Tabellen-Zelle rot und alte Tabellenzelle grau.
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

function createNewContract (type, lineNr){ //Create new Contract, displayed at contractsoffert.
	var contract = new Array (type, lineNr);
	switch (type){
	case 0: //ICE
	contract [2] = 300; //money success 
	contract [3] = 3000; // money punishment
	contract [4] = 3000; //refuse punishment
	contract [5] = 100; //accept reward
	break;
	case 1: //RE
	contract [2] = 200; //money success 
	contract [3] = 2000; // money punishment
	contract [4] = 2000; //refuse punishment
	contract [5] = 0; //accept reward
	break;
	case 2: //RB
	contract [2] = 100; //money success 
	contract [3] = 1000; // money punishment
	contract [4] = 1000; //refuse punishment
	contract [5] = 0; //accept reward
	break;
	}
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
	contract [6] = tact;
	contract [7] = startTime;
	return contract;
}

function createDayTraffic (){ //Create Day Traffic, save it to gameState[10]. Use function only once every day.
    var nr = Math.floor((Math.random() * 10) + 1);
    for (var i=0; i<=nr; i++){ //i==events
        gameState[10][i] = new Array ();
        var time = 3 * (Math.floor((Math.random() * 100) + 1));
        gameState[10][i][0] = displayTrain(3)+"<br>"+nr;
        gameState[10][i][1] = time;
        gameState[10][i][2] = 0; //platform
        gameState[10][i][3] = 0; // lineNr
        gameState[10][i][4] = 400; //reward Day Traffic
        gameState[10][i][5] = 1000; //fee day traffic
        //alert(i);
    }
}
function addDayTraffic (){ //add day traffic to events
    if (gameState[1]===1){
    var add = gameState[9].length; //enter last contract
    //add = add+1;
    }
    else {
        var add = gameState[9].length;
        add = add - 1;
    }
    gameState[9][add]=new Array ();
    //alert (gameState[10].length);
    for (var i=0; i<gameState[10].length; i++){
        gameState[9][add][i] = new Array ();
        gameState[9][add][i][0] = gameState[10][i][0];
        gameState[9][add][i][1] = gameState[10][i][1];
        gameState[9][add][i][2] = gameState[10][i][2];
        gameState[9][add][i][3] = gameState[10][i][3];
        gameState[9][add][i][4] = gameState[10][i][4];
        gameState[9][add][i][5] = gameState[10][i][5];
        //alert(gameState[9][add][i]);
    }
}
function checkCollision (a, b){ //Check collision of trains on platforms
    for (var i=0; i<gameState[9].length; i++){ //for every contract
        for (var j=0; j<gameState[9][i].length; j++){ //for every event 
            if (gameState[9][i][j]!==gameState[9][a][b]){
                if (gameState[9][i][j][1]===gameState[9][a][b][1] && gameState[9][i][j][2]===gameState[9][a][b][2]){
                    gameState[9][i][j][2]=0;
                }
            }
        }
    }
}
function createTable (){ //Create main table. Without any Data
	var table = new Array();
	for (var i=0; i<=gameState[4]; i++){ //Build table Array with row arrays without content.
		table[i]= new Array();
		for (var j=0; j<=380; j++){
			if (i===0){
				table[i][j]=false;
			}
			else {
				table[i][j]= "<br>  ";
			}
		}
	}
	gameState[8]=table;
	insertTableData ();
}
function createEvents () { //Create Events out of contracts. 
	for (var j=0; j<gameState[0].length; j++){ //Search through all taken contracts, j == contract number
	var z = 0; // EventNr in Events for that contract
	gameState[9][j] = new Array ();
	var startingTime = gameState[0][j][7];
	var tact = gameState[0][j][6];
	var platform = gameState[0][j][8];
	var type = gameState[0][j][0];
	var lineNr = gameState[0][j][1];
	var reward = gameState[0][j][2];
	var fee = gameState[0][j][3];
		for (var x =startingTime; x<=380; x=x+(20*tact)){ //Time Position--> every Event
			// Sort out doubles on one time slot, doesent work
		//	if (j>=1){ 
		//	for (var i= 0; x<gameState[9].length; i++){
		//		for (var y=0; y<gameState[9][i].length; y++){
		//			if (gameState[9][i][y][1]==x && gameState[9][x][y][2]==platform){
		//				platform=0;
		//				alert(gameState[9][i][y]);
		//			}
		//		}
		//	}
		//	}
			//until here
			gameState[9][j][z] = new Array ();
			gameState[9][j][z][0]=displayTrain(type)+"<br>"+lineNr; //display
			gameState[9][j][z][1]=x; //time
			gameState[9][j][z][2]= platform; //platform
			gameState[9][j][z][3]= lineNr; //lineNr
			gameState[9][j][z][4] = reward; //reward
			gameState[9][j][z][5] = fee; //fee
                        checkCollision(j, z);
			z++;

		}
	}
        addDayTraffic();
}//Event (== gameState[9][contractNr][EventNr])[0]=display, [1]=time, [2]= platform, [3]= lineNr, [4]= reward, [5] = fee

function insertTableData (){ //Insert Data in Table Array 
	for (var i = 0; i<gameState[9].length; i++){ //For every contract
		//In Tabelle eintragen gameState[8][x][y]
			//alert (gameState[9][i]);
			for (var j =0; j<gameState[9][i].length; j++){ //for every event in contract
				var platform = gameState[9][i][j][2];
				var time = gameState[9][i][j][1];
				var display = gameState[9][i][j][0];
				if (platform===0){
					var lineNr = gameState[9][i][j][3];
					gameState[8][platform][time] = "<button type='button' id='platformChangeEvent' onclick='changePlatformNrEvent("+i+","+j+")'>Line ("+lineNr+" "+ displayTime(time) +")</button>";
				}
				else{
				gameState[8][platform][time]=display;
				}
				//platform und time bestimmen platz in der Tabelle, display ist inhalt der eigefügt werden soll 
			}
	}
}
function displayTable (){ //Display main table. ToDo: Changeable Platforms
	var content = "<table><tr>";
	var content0 = "";

	var timeline = document.getElementById("timeline");
	var timeline_html = "<table><tr>";
	for (var i=0; i<=380; i++) {
		timeline_html += "<th id='0." + i + "' class='slot'>" + displayTime(i) + "</th>";
	}
	timeline_html += "</tr></table>";
	timeline.innerHTML = timeline_html;

	for (var i=0; i<gameState[8].length; i++){
		if (i===0){
			for (var j=0; j<gameState[8][i].length; j++){
				if (gameState[8][i][j]!==false){
					content0 += gameState[8][i][j];//gameState[8][i]; //ToDo sort for what is intended to be displayed
				}
			}
		}
		else {
			content += "<tr>";
			for (var j=0; j<gameState[8][i].length; j++){
				content += "<td id='" + i +"." + j + "' class='slot'>" + gameState[8][i][j] + "</td>";
			}
			content += "</tr>";
		}
	}
	content += "</table>";
	document.getElementById("table").innerHTML = content; 
	document.getElementById("noplatform").innerHTML = content0; 
}
function changeMoney(amount){ //Change Money value and display and loosing condition 
	gameState[2]= gameState[2] + amount; // set new amount to gameState.
	document.getElementById("money").innerHTML = gameState[2]; //replace money display to new amount
	if (gameState[2]<=0) {
		stop ();
		alert ("You Lost. Try again and take a look at your expenses.");
	}
}

function changeDay(day){ //Change Day value and display
if (day===1){
	gameState[1]= gameState[1] + day; // set day counter to new day
	document.getElementById("day").innerHTML = gameState[1]; //replace day display to new day
        
	}
	else { alert("somthing wrong (changeDay)");
	}
}

function startPlaformNr(nr){ //change platform value
	gameState[4]= nr; //
}

function changePlatformNr(nr){ //Change Platform Number of an Line. Bug: Wenn LineNr nicht fortlaufend, dann falsche zuordnung in gameState[o][nr].
	var check = prompt("Platform Number for this Line", "");
	if (gameState[4]<check){
		check = prompt ("Enter a valid Platform Number","");
		if (gameState[4]<check){
			check = 1;
		}
	}
	gameState[0][nr][8] = check;
	displayContracts();
	createEvents ();
	createTable ();	//Bug!!! I can interrupt prompt and set platform to null.
	displayTable();
}
function changePlatformNrEvent(i, j){ //Change Platform Number of an single Event. i and j are similar to i and j in insertTableData()
	var check = prompt("Platform Number for this Line", "");
	if (gameState[4]<check){
		check = prompt ("Enter a valid Platform Number","");
		if (gameState[4]<check){
			check = 1;
		}
	}
	gameState[9][i][j][2] = check;
	//alert(gameState[9][i][j][2]);
	displayContracts();
	createTable ();	//Bug!!! I can interrupt prompt and set platform to null.
	displayTable();
	//alert(gameState[9][i][j][2]);
}
function addNewPlatform(){ //Add new Platform. ToDo: Add values to getting new platforms
	gameState[4]= gameState[4] +1;
	changeMoney(-10000);
	createTable (); //Missing: Data for new Table
	displayTable ();
	alert ("New Platform added");
	//alert ("The new platform will be available tomorrow"); //ToDO: Bug!!! I can set platform value to not existing platform
}
function displayContracts(){ ////Responsible for display of Contracts taken
	var content ="<h3>Your Contracts</h3><br>";
	for (var i=0; i<gameState[0].length; i++){
		content = content + "<table><tr><th>Type</th><th>Line Nr</th><th>Reward</th><th>Fee</th><th>Refuse Fee</th><th>Accept Reward</th><th>Tact</th><th>Starting Time</th><th><button type='button' id='platformChange' onclick='changePlatformNr("+(gameState[0][i][1]-1)+")'>Platform (Change)</button></th></tr><tr>";
		for (var j=0; j<gameState[0][i].length; j++){
			if (j===0 || j===7){
				if (j===0){
				content = content + "<td>" + displayTrain(gameState[0][i][j]) + "</td>";
				}
				if (j===7){
				content = content + "<td>" + displayTime(gameState[0][i][j]) + "</td>";
				}
			}
			else{
			content = content + "<td>" + gameState[0][i][j] + "</td>";
			}
		}
		content = content + "</tr></table>";
	}
	document.getElementById("contractstaken").innerHTML = content;
}
function displayContractsOffert(){ //Responsible for display of Contracts offert
	var content ="<h3>Contracts Offert</h3><br>";
	for (var i=0; i<gameState[3].length; i++){
		content = content + "<table><tr><th>Type</th><th>Line Nr</th><th>Reward</th><th>Fee</th><th>Refuse Fee</th><th>Accept Reward</th><th>Tact</th><th>Starting Time</th><th><button type='button' id='accept' onclick='acceptContract("+gameState[3][i]+")'>Accept</button></th></tr><tr>";
		for (var j=0; j<gameState[3][i].length; j++){
			if (j===0 || j===7){
				if (j===0){
				content = content + "<td>" + displayTrain(gameState[0][i][j]) + "</td>";
			}
				if (j===7){
				content = content + "<td>" + displayTime(gameState[3][i][j]) + "</td>";
				}
			}
			else{
			content = content + "<td>" + gameState[3][i][j] + "</td>";
			}
		}
		content = content + "<td><button type='button' id='refuse' onclick='refuseContract("+gameState[3][i]+")'>Refuse</button></td></tr></table>";
	}
	document.getElementById("contractsoffert").innerHTML = content;
}
function acceptContract(nr){ //Accept Contract
	var check = prompt("Platform Number for this Line", "1");
	if (gameState[4]<check){
		check = prompt ("Enter a valid Platform Number","");
		if (gameState[4]<check){
			check = 1;
		}
	}
	var tomove = gameState[3][nr];
	var length = gameState[0].length;
	gameState[3][nr] = createNewContract (tomove[0], gameState[6]);
	gameState[6]++;
	gameState[0][length] = new Array ();
	gameState[0][length] = tomove;
	gameState[0][length][8] = check;
	changeMoney(tomove[5]);
	displayContracts();
	displayContractsOffert();
	createEvents ();
	createTable ();
	displayTable ();
	//ToDO: Update Table!
}

function refuseContract (nr){ //Refuse Contract
	var tomove = gameState[3][nr];
	gameState[3][nr] = createNewContract (tomove[0], gameState[6]);
	gameState[6]++;
	changeMoney(-tomove[4]);
	displayContractsOffert();
}

function displayTrain(train){
	var type;
	switch (train){
		case 0:
		type = "ICE";
		break;
		case 1: 
		type = "RE";
		break;
		case 2:
		type = "RB";
		break;
                case 3:
		type = "ST";
		break;
	}
	return type;
}
//Game Loop functions
function gameLoop (){ //Set Timeout
	setTimeout(function (){gameLoopCalc();}, 3000/gameState[7]);
}
function gameLoopCalc (){ //Calculate everything
	if (gameState[5]===true){
		
	}
	else{
		if (time<=380){
			timeColor(time);
			advanceTimeslider(time);

			var ilength = gameState[9].length;
                        
			for (var i = 0; i<ilength; i++){ //actual calc things
				var jlength = gameState[9][i].length;
                                    for (var j = 0; j<jlength; j++){
					if (time===gameState[9][i][j][1]){
						if (gameState[9][i][j][2]!==0){
							changeMoney(gameState[9][i][j][4]);
						}
						else{
							changeMoney(-gameState[9][i][j][5]);
						}
					}
				}
			}
			time++;
			gameLoop();
		}
		else{ //to new day..
			time=0;
			changeDay(1);
                        createDayTraffic ();
                        createEvents ();
                        createTable ();
                        displayTable ();
			gameLoop();

		}
	}
}
//Global variable
// gameState Array: 0=accepted contracts, 1= days played, 2= money, 3= contracts offert, 4=platform, 5= game stopped?, 6=next Line Number to be taken 7= gameSpeed,8 = table, 9 = Events, 10 = dayTraffic.
// In 0 (accepted contracts) are all contracts. Contracts are Arrays. In 0 = type (in gameState[0][nr][0]), 1 = line nr, 2= reward, 3=fee, 4=refuse fee, 5= accept reward, 6= tact, 7 = starting time (in Numbers. Math see displayTime()), 8 = platform, 
// gameState[0][0] could be undefined!
var gameState = new Array ();
gameState [5] = true; 
gameState [6] = 1;
gameState[7] = 1;
gameState[2] = 0;
gameState[1] = 0;
gameState[0] = new Array ();
gameState[3] = new Array ();
gameState[8] = new Array ();
gameState[9] = new Array ();
gameState[10] = new Array ();
var time = 0;
fchangespeed ();