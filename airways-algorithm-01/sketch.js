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

    for (var i = 0; i < cols; i++){
        for (var j = 0; j < rows; j++){
            grid[i][j].addNeighbours(grid);
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
        if (current === end){
        
            // //code for finding/highlighting the path 
            // path = [];
            // var temp = current;
            // path.push(temp);
            // while (temp.previous){
            //     path.push(temp.previous);
            //     temp = temp.previous;
            // }

            console.log("DONE!")
        }

        removeFromArray(openSet, current);
        closedSet.push(current);

        var neighbours = current.neighbours;
        for (var i = 0; i< neighbours.length; i++){
            var neighbour = neighbours[i];

            
            if (!closedSet.includes(neighbour)){
                var tempG = current.g + 1;

                if (openSet.includes(neighbour)){
                    if (tempG<neighbour.g){
                       neighbour.g = tempG; 
                    }
                } else{
                    neighbour.g = tempG;
                    openSet.push(neighbour);
                }
                //heuristics
                neighbour.h = heuristic(neighbour,end);
                neighbour.f = neighbour.g + neighbour.h;
                neighbour.previous = current;
            }
        }

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

    for (var i = 0; i < path.length; i++){
        path[i].show(color(0,0,255))
    }

                //code for finding/highlighting the path 
                path = [];
                var temp = current;
                path.push(temp);
                while (temp.previous){
                    path.push(temp.previous);
                    temp = temp.previous;
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

    //show function

    this.show = function (col){

        fill(col);
        strokeWeight(1);
        // noStroke();
    

        rect((this.i *w), (this.j *h), w,h);

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
    return d;

}

var cols


