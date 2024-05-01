function setup() {
  createCanvas(800, 800);
  img = loadImage("grad2_Nero AI_Face_x4.jpeg")
  
  img.loadPixels();

}

scalefactor = 4

function draw() {
  background(255);

  tiles = mouseX / 5; 
  tilesize = width / tiles

  fill(0, 20)
  noStroke();
  // image(img, mouseX, mouseY);

  for(x = 0; x < tiles; x++) {
    for(y = 0; y < tiles; y++) {

      c = img.get(x* tilesize * scalefactor, y* tilesize * scalefactor);
      filter("BLUR" , 2)

      size = map(brightness(c) , 0, 255, 0 , 20)

      ellipse(x*tilesize, y*tilesize, size, size)
    }
  }
}
