//pixelates the image

let img;

let pixelation_level = 10;

let grey = [206, 216, 227];

let green = [194, 240, 212];
let darkGreen = [18, 135, 95]



async function setup() {
    //load image
    img = await loadImage('map7.png');
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


            if (dist(r, g, b,
                grey[0], grey[1], grey[2]
            ) < 30) {
                fill(255);
            }
            //might be overlapping
            //add anotrher condition so that they have to choose which one

            else if (dist(r, g, b,
                green[0], green[1], green[2]
            ) < 20) {

                fill(0, 255, 0);

            }

            else if (dist(r, g, b, darkGreen[0], darkGreen[1], darkGreen[2])
                < 20) {
                fill(0, 255, 0)
            }


            else {
                fill(0);
            }




            square(x, y, pixelation_level);
// fill('red');
// textSize(30);
//             text('Comet Place', width/2, height-10);


        }

    }




}

