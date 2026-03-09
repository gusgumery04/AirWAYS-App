//TEST 01
//A* Pathfinding test

var cols = 50;
var rows = 50;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;
var path = [];
var noSolution = false;

var w,h;
var col;
var col1; //colour
var mapImg;

function preload(){
    mapImg = loadImage("assets/map.png");
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
        for (var j = 0; j < rows; j++){
            grid[i][j] = new Spot(i,j);
        }   
    }

    for (var i = 0; i < cols; i++){
        for (var j = 0; j < rows; j++){
            grid[i][j].addNeighbours(grid);
        }   
    }



    //definding the start and end of the grid
    start = grid[0][0];
    end = grid[cols-1][rows-1];
    //adding in that the start and end can never be a wall!
    start.wall = false;
    end.wall = false;

    //opening the set
    //start searching at 0,0 and then add numbers to the end of the array i'm assuming this logic works until the end of the array?
    openSet.push(start);

}



function draw() {
    
    var current;

    if (openSet.length > 0) {

        var winner = 0;
        for (var i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }

        current = openSet[winner];

        if (current === end) {
            console.log("DONE!");
            noLoop();
        }

        removeFromArray(openSet, current);
        closedSet.push(current);

        var neighbours = current.neighbours;
        for (var i = 0; i < neighbours.length; i++) {
            var neighbour = neighbours[i];

            if (!closedSet.includes(neighbour) && !neighbour.wall) {
                var moveCost = 1;

                if (neighbour.park) {
                     moveCost = 0.5;
                }

                var tempG = current.g + moveCost;
                var newPath = false;

                if (openSet.includes(neighbour)) {
                    if (tempG < neighbour.g) {
                        neighbour.g = tempG;
                        newPath = true;
                    }
                } else {
                    neighbour.g = tempG;
                    newPath = true;
                    openSet.push(neighbour);
                }

                if (newPath) {
                    neighbour.h = heuristic(neighbour, end);
                    neighbour.f = neighbour.g + neighbour.h;
                    neighbour.previous = current;
                }
            }
        }

    } else {
        console.log("no path!");
        noSolution = true;
        noLoop();
        return;
    }

    // background(220);

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show(color(255));
        }
    }

    for (var i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(255, 0, 0));
    }

    for (var i = 0; i < openSet.length; i++) {
        openSet[i].show(color(0, 255, 0));
    }

    path = [];
    var temp = current;
    if (temp) {
        path.push(temp);
        while (temp.previous) {
            path.push(temp.previous);
            temp = temp.previous;
        }
    }

    for (var i = 0; i < path.length; i++) {
        path[i].show(color(0, 0, 255));
    }
}

//adding a constructor function so we change stuff along the way
function Spot(i,j){

    this.i = i;
    this.j = j;

    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.neighbours = [];
    this.previous = undefined;
    this.wall = false;
    this.park = false;

    if(random(1)< 0.1){
        this.wall = true;
    }
    if(random(1)> 0.1 && random(1)<=0.2){
        this.park = true;
    }

    //show function

    this.show = function(col) {
        let c = col;
    
        if (this.wall) {
            c = color(0);
        } else if (this.park) {
            c = color(120, 200, 120);
        }
    
        fill(c);
        strokeWeight(1);
        rect(this.i * w, this.j * h, w, h);
    } //END spot function

    this.addNeighbours = function(grid){
        
        var i = this.i;
        var j = this.j;

     if(i < cols-1){
        this.neighbours.push(grid[i+1][j]);
     }
     if(i > 0){
        this.neighbours.push(grid[i-1][j]);
     }
     if(j < rows-1){
        this.neighbours.push(grid[i][j+1]);
     }
     if(j > 0){
        this.neighbours.push(grid[i][j-1]);
     }
        
    }


}






//Function to remove a closedSet node from openSet array.
function removeFromArray(arr,elt){
    for (var i = arr.length-1; i>=0; i--){
        if (arr[i] === elt){
            arr.splice(i,1);
        }

    }
}

function heuristic (a,b){
    //this is known as euclidiian distance uses pythag theorem
    var d = dist(a.i,a.j,b.i,b.j);

    // //absolute distance version
    // var d = abs(a.i - b.i) + abs(a.j-b.j);
    
    return d;

}

//this code is cooked. 



