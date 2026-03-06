//TEST 01
//A* Pathfinding test

var cols = 5;
var rows = 5;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;

var w,h;

//adding a constructor function So we change stuff along the way
function Spot(i,j){

    this.x = i;
    this.y = j;

    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.show = function (){

        fill(255);
        strokeWeight(1);

        rect((this.x *w), (this.y *h), w,h);

    }
}

function setup() {
    createCanvas(400, 400);
    console.log('A*');

    //deifnidng with & height of colums so that it adjust to the width & height of the canvas!
    w = width/cols;
    h = height/rows;
    //making the 2d array (grid)

    for (var i = 0; i < cols; i++){
        grid[i] = new Array (rows);

    }

    for (var i = 0; i < cols; i++){
        for (var j = 0; i < rows; j++){
            grid[i][j] = new Spot();
        }   
    }

    //definding the start and end of the grid
    start = grid[0][0];
    end = grid[cols-1][rows-1];

    //opening the set
    //start searching at 0,0 and then add numbers to the end of the array i'm assuming this logic works until the end of the array?
    openSet.push(start);

}



function draw() {

  if(openSet.length > 0){


  } else{

  } 
  
  background(220);

  for (var i = 0; i < cols; i++){
    for (var j = 0; i < rows; j++){
        grid[i][j].show();
    }   
}



}


