var canvas;
var fade = false;
var frames = 0; // conteo para que comience el fade
var tamMax, tamMin, boundary, rangoDeColor;
var c;
var alfa = 1;
var diagonal;
var colorShift = 0;
var satShift = 0;

function setup() {
   canvas = createCanvas(windowWidth, windowHeight);
   translate(windowWidth / 2, windowHeight / 2);
   canvas.position(0, 0);
   background(0);
   smooth();
   colorMode(HSB, 255);
   frameRate(60);
   defineColorRange();
   getBoundary();
   tamMin = diagonal / 300;
   tamMax = diagonal / 150;

   c = new Control();
   c.initDraws();
   c.itinDivs();
   c.initMandala();
}

function draw() {
   check();
   c.display();
}

function check() {
   if (fade) {
      transicion();
   }
   if (frames >= 2500) {
      reset();
   }
   frames++;
}

function transicion() {
   if (alfa >= 128) {
      defineColorRange();
      fade = false;
      alfa = 1;
      c.reset();
   } else {
      alfa += 64;
   }

   fill(0, alfa);
   noStroke();
   rect(-windowWidth / 2, -windowHeight / 2, windowWidth, windowHeight);
}

function windowResized() {
   getBoundary();
   resizeCanvas(windowWidth, windowHeight);
   canvas.position(0, 0);
   translate(windowWidth / 2, windowHeight / 2);
   colorMode(HSB, 255);
   background(0);
}

function getBoundary() {
   var pantalla = createVector(windowWidth, windowWidth)
   diagonal = pantalla.mag();
   boundary = diagonal / 2.5;
}

function reset() {
   fade = true;
   frames = 0;
   alfa = 1;
   //save(canvas, "madalita" + round(random(100000)) +  ".jpg");
}

function keyPressed() {
   if (key == " ") reset();
}

function defineColorRange() {
   colorShift = random(80);
   satShift = random(40);
   rangoDeColor = random(160 - colorShift);
}
