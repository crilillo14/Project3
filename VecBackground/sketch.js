

let Field;
let vectorScaling = 0.06;
let gapBetweenRows;
let gapBetweenCols;
let counter = 0;
let weights = [];
let maxspeed = 1;
let oscillator = 0;
let resetchance = 0.005;
let n = 20

let Functions, functionPicker;

function setup() {
  createCanvas(windowWidth, windowHeight);
  Field = generateField(n, n);
  angleMode(degrees)
  background(0,0,20,255)



  Functions = [

    function(p) {
      let x = -p.y + 0.5*p.x;
      let y = p.x;
      return createVector(x , y);
    }, 
    function(p) {
      let x = max(p.mag() + cos(p.y) , p.y)
      let y = p.y / sin(p.y)
      return createVector(x , y);
    },
    function(p) {
      return createVector(p.x, p.y)
    },

    function(p) {
      let x = 2000 * p.x / (p.x*p.x + p.y*p.y)
      let y = 2000 * p.y / (p.x*p.x + p.y*p.y)
      
      return createVector(x , y)
    }, 
    function(p) {
      let x = p.x * p.y /(p.x + p.y)
      let y =( p.x*p.x + p.y*p.y) / (p.x + p.y);
      return createVector(x , y)
    }, 
    function(p) {
      let x = p.x;
      let y = -0.5*p.y + 2500*sin(0.01*p.x)
      return createVector(x , y)
    } ,
    function(p) {
      let x = 3 * Math.sign(p.y)
      let y = 0.01*p.y 
      return createVector(x , y)
    }, 
    function(p) {
      let x = 0.1 * p.x
      let y = 200*sin(0.04*(p.mag() + 0.1 * p.y))
      return createVector(x  , y)
    }


  ]

  functionPicker = floor(random(0 , Functions.length))


  
  
}

function draw() {
  colorMode(RGB)
  background(0,0, 20,10);

  translate(width / 2, height / 2);
  scale(1, -1);

  noStroke()

  //circle(0, 0, 3);

  
  //visualizeVelocityField(Field)

  gameloop();
  
} // ---------------------------------------------------- end of draw()

function gameloop() {
  let counter = 0;

  for (i = 0; i < Field.length; i++) {
    for (j = 0; j < Field[i].length; j++) {
      let positionVector = Field[i][j][Field[i][j].length - 1]; // get the last position vector
      let newposition = positionVector.copy();
      let velocityVector = CalculateVelocity(newposition);
      newposition = newposition.add(velocityVector); // add velocity to position
      Field[i][j].push(newposition); // push the new position
  
  
  
      for(k = 0; k < Field[i][j].length; k++){
        //let alpha = 255 / (k + 1); // Add 1 to avoid division by zero
        
            
        circle(Field[i][j][k].x , Field[i][j][k].y , 1); // show position
      }
      
  
      if(Field[i][j].length > 20) {
        Field[i][j].splice(0, 1)
      }
  
      if(velocityVector.mag() < .1) { // if the particle is moving too slow, take away from the front
        Field[i][j].splice(Field[i][j].length - 1, 1)
      }
  
  
      if(random(0, 1) < resetchance) {
        Field[i][j] = getInitialFieldPosition(i , j);
      }
  
  
    }
  }
  
}



function CalculateVelocity(p) {
  
  let vector = Functions[functionPicker](p);

  // let pseudox = map(mouseX , 0 , width, 0 , 1)
  // let pseudoy = map(mouseY, 0 , height, 0 , 1)
  
  // let mousevec = createVector(pseudox - p.x ,pseudoy - p.y);
  //vector.add(mousevec)

  vector.mult(vectorScaling)
  vector.setMag(min(vector.mag(), maxspeed))

  // Calculate the color based on the vector's direction
  let hue = (vector.heading() + PI) / (2 * PI) * 255;
  let saturation = 255;
  let brightness =  255;
  
  // Set the color mode to HSB and the stroke color to the calculated color
  colorMode(HSB);
  //stroke(hue, saturation, brightness, 255);
  fill(hue, saturation, brightness, 255); // Set the fill color to the same color as the stroke

  return vector;

} //---------------------------------------------- end of vectorFunction()



function generateField(nrows, ncols) {
  let field = [];
  
  gapBetweenRows = width / nrows;
  gapBetweenCols = height / ncols;
  
  for (let i = 0; i <= nrows; i++) {
    let ColumnVector = [];
    
    for (let j = 0; j <= ncols; j++) {
      let x = (i * gapBetweenRows) - width / 2;
      let y = -1*((j * gapBetweenCols) - height / 2 );
      
      ColumnVector.push([createVector(x, y)]);
    }
    
    field.push(ColumnVector);
  }

  return field;
} // --------------------------------------------- end of generateField()


function getInitialFieldPosition(i, j) {
  let x = (i * gapBetweenRows) - width / 2;
  let y = -1*((j * gapBetweenCols) - height / 2);
  return [createVector(x , y)]
}


function windowResized() {

  resizeCanvas(windowWidth, windowHeight);
  colorMode(RGB);
  background(0,0,20, 255);
  Field = generateField(n,n);
}

