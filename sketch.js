async function setup() {
    createCanvas(800, 600);
    table = await loadTable('data4.csv');

  let x = [];
  let y = [];
  var div = createDiv(" ");
  div.id("myPlot");
  div.position(0,0);
  div.size(windowWidth,windowHeight);
  
  x = table.getColumn(0);
  y = table.getColumn(2);
  
  let data = [{
    x: x,
    y: y,

    type: "scatter",
    mode: "markers"  
  }];
   let layout = [{
     xaxis: {title: "Time"},
     yaxis: {title: "Number"},
     title: "Scatter Plot"
   }];
  
  Plotly.newPlot("myPlot",data,layout);
}

function draw() {
    background(220);
    console.log(data);
}
