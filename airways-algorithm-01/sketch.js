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
var col; //colour


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
        for (var j = 0; j < rows; j++){
            grid[i][j] = new Spot(i,j);
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
        
        var winner = 0;
        // loop through openSet to find the node with the lowest f value
        // this will be the node we explore next
        // this is finding the f value at that i position and compairing it to the last i.f value and seeing which is the lowest cost
        for (var i=0; i < openSet.length; i++){
            if (openSet[i].f < openSet[winner].f) 
                winner = i;   
        }

        var current = openSet[winner];

        //if the last box checked is the end
        //console log done
        //remove it from the openSet array and add it to end of closedSet Array.
        if (openSet[winner] === end){
            console.log("DONE!")
        }

        openSet.remove()
        closedSet.push(current);

        } else{

    } 
  
    background(220);

    for (var i = 0; i < cols; i++){
        for (var j = 0; j < rows; j++){
         grid[i][j].show(color(255));
        }   
    }

    for (var i = 0; i < closedSet.length; i++){
        closedSet[i].show(color(255,0,0));
    }

    for (var i = 0; i < openSet.length; i++){
        openSet[i].show(color(0,255,0));
    }


}

//adding a constructor function so we change stuff along the way
function Spot(i,j){

    this.x = i;
    this.y = j;

    this.f = 0;
    this.g = 0;
    this.h = 0;

    //show function

    this.show = function (col){

        fill(col);
        noStroke();
        strokeWeight(1);

        rect((this.x *w), (this.y *h), w,h);

    } //END spot function
}


