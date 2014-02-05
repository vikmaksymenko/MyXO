// JavaScript Document

const X = 1;
const O = 0;
const EMPTY = -1;

function Point(x, y){
	this.x = x;
	this.y = y;
}

function Symbol(symb, point){
	this.symb = symb;
	this.point = point;
		
	this.check = function(searchSymb){
		var rowArray = new Array(3);
		var result;

		// Check row		
		for(var i = 0; i < 3; i++)
			rowArray[i] = squareArray[point.x][i];
		if((result = checkForPair(point.y, rowArray, this.symb, searchSymb)) != -1)
			return new Point(point.x, result);
				
		// Check collunmn
		for(var i = 0; i < 3; i++)
			rowArray[i] = squareArray[i][point.y];
		if((result = checkForPair(point.x, rowArray, this.symb, searchSymb)) != -1)
			return new Point(result, point.y);	
			
		// Check diagonals	
		if(point.x == point.y)	{
			for(var i = 0; i < 3; i++)
				rowArray[i] = squareArray[i][i];
			if((result = checkForPair(point.y, rowArray, this.symb, searchSymb)) != -1)
				return new Point(result, result);
		}
		
		//console.log("Before checking right diagonal");
		
		if(point.x == (2-point.y))	{
			for(var i = 0; i < 3; i++)
				rowArray[i] = squareArray[2-i][i];
				
			console.log("Symbols in diagnal: " + rowArray[0].symb + " " + rowArray[1].symb + " " + rowArray[2].symb);	
				
			if((result = checkForPair(point.y, rowArray, this.symb, searchSymb)) != -1)
				return new Point(2-result, result);
		}
	}
}

function checkForPair(x, rowArray, symb, searchSymb){
	switch (x) {
		case 0:
			if(rowArray[1].symb == searchSymb && rowArray[2].symb == symb)
				return 1;
			else if(rowArray[1].symb == symb && rowArray[2].symb == searchSymb)
				return 2;
			break;
		case 1:
			if(rowArray[0].symb == searchSymb && rowArray[2].symb == symb)
				return 0;
			else if(rowArray[0].symb == symb && rowArray[2].symb == searchSymb)
				return 2;
			break;
		case 2:
			if(rowArray[0].symb == searchSymb && rowArray[1].symb == symb)
				return 0;
			else if(rowArray[0].symb == symb && rowArray[1].symb == searchSymb)
				return 1;
			break;
	}
	return -1;
}