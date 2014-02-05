// JavaScript Document

var squareArray = [new Array(3), new Array(3), new Array(3)];

var wins = 0, loses = 0, draws = 0;

var resize = function() {
	var imgArray = document.getElementsByClassName("square");
	
	document.getElementsByClassName("scores").item(0).style.width = document.body.clientWidth/6 + "px";
	document.getElementsByClassName("scores").item(1).style.width = document.body.clientWidth/6 + "px";

	document.getElementById("wins").textContent = wins.toString();
	document.getElementById("draws").textContent = draws.toString();
	document.getElementById("loses").textContent = loses.toString();
	document.getElementById("score").style.fontSize = document.getElementsByClassName("scores").item(0).height/2 + "px";
	
	for(var i= 0; i < 9; i++)
		imgArray.item(i).width = document.body.clientWidth/6;
	for(var i = 0; i < 3; i++ ){
		for(var j = 0; j < 3; j++)
			squareArray[i][j] = new Symbol(EMPTY, new Point(i, j));
	}
}

var initButtons = function(){
	var imgArray = document.getElementsByClassName("square");		

	for(var i = 0; i < imgArray.length; i++ )
		imgArray.item(i).src = "images/empty.png";
	
	resize();

	document.getElementById("0").onclick = function(evt) { PutX(0, 0)};
	document.getElementById("1").onclick = function(evt) { PutX(0, 1)};
	document.getElementById("2").onclick = function(evt) { PutX(0, 2)};
	document.getElementById("3").onclick = function(evt) { PutX(1, 0)};
	document.getElementById("4").onclick = function(evt) { PutX(1, 1)};
	document.getElementById("5").onclick = function(evt) { PutX(1, 2)};
	document.getElementById("6").onclick = function(evt) { PutX(2, 0)};
	document.getElementById("7").onclick = function(evt) { PutX(2, 1)};
	document.getElementById("8").onclick = function(evt) { PutX(2, 2)};
}

function PutX(x, y){
	if(squareArray[x][y].symb != EMPTY)
		return;
		
	document.getElementById(x * 3 + y).src = "images/X.png";
	squareArray[x][y] = new Symbol(X, new Point(x, y));
	
	var result;
	
	// Check X for 3
	if(squareArray[x][y].check(X)){
		wins++;
		ShowResult("You win! You`re cool!");
		return;
	}
		// Check O 
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){
			if(squareArray[i][j].symb != O)
				break;
			
			if(result = squareArray[i][j].check(EMPTY)){
				PutO(result);
				loses++;
				ShowResult("You lose =(");
				return;
			}
		}
	}
		
	// Check X for 2 
	if(result = squareArray[x][y].check(EMPTY)){
		PutO(result);
		return;
	}
	
	// if center is empty
	if(squareArray[1][1].symb == EMPTY){
		PutO(new Point(1, 1));
		return;
	}
	
	// else put into any empty field
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){
			if(squareArray[i][j].symb == EMPTY){
				PutO(new Point(i, j));
				return;
			}
		}
	}
	draws++;
	ShowResult("Draw =|");
}

function PutO(point){
	document.getElementById(point.x * 3 + point.y).src = "images/O.png";
	squareArray[point.x][point.y] = new Symbol(O, point);
} 

function ShowResult(result){
	alert(result);
	initButtons();	
}

window.onload = initButtons;
window.onresize = resize;
