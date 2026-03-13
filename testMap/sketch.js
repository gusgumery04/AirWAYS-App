//https://steel-jury-bae.notion.site/Tuesday-Non-Computational-Sensing-I-2eada9074e81805f82b1e372f06a85ef
//https://editor.p5js.org/ismanfromes/sketches/QYJuxVFTl0

//pixellates

let img;

let pixelation_level = 10;




async function setup() {
    //load image
    img = await loadImage('map1.png')
    // resize the image, preserving its
    // proportions, to fit onscreen


    // then create our canvas to that size
    createCanvas(img.width, img.height);

}


function draw() {
    pixelDensity(1);
    image(img, 0, 0);

    // pixels
    // a raster image is made up of individual pixels,
    // each a single rgb color – these are stored in an
    // array called 'pixels'
    // to use them, we need to call loadPixels() otherwise
    // we might see nothing :)
    loadPixels();

    // to access a pixel's color, we use get()
    // notice the pixels are little arrays?
    // each contains r, g, b, and a (which is alpha)
    // so if we want to get the rgb values from the
    // pixel at (100,100) we could do this

     
  for (let x = 0; x < width; x += pixelation_level) {
    for (let y = 0; y < height; y += pixelation_level) {
      
      let i = (x + y * width) * 4;

      let r = pixels[i + 0];
      let g = pixels[i + 1];
      let b = pixels[i + 2];
      let a = pixels[i + 3];

      

 
      fill(r, g, b, a);
      square(x, y, pixelation_level);
    }
  }

        
    }


