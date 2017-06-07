// Nuevo plan:
// Generar un objeto que solo dibuja la partícula dentro del diámetro maximo y
// generar diferentes funciones para establecer el metodo draw() de cada particula
// en función de su forma de visualización. Esta distribución de draw() puede darse de forma aleatoria.
// El controlador define la iteración circular y genra arrays() de partículas para cada
// grupo de diferente divición angular. Si hay 3 diferentes divisiones entonces habrá 3 grupos,
// y habrá el mismo número de partículas para cada grupo.
//

function Particula() {
   this.pos1 = p5.Vector.random2D();
   this.pos1.mult(random(boundary * .8)); // boundary es una variable global que debo declarar en el main.js
   this.pos2 = -this.pos1.x;
   this.tamanioMaximo;
   this.tam;
   this.tT;
   this.velTam;
   this.tR;
   this.velRot;
   this.direccion;
   this.vel;
   this.colorin;
   this.colorin2;
   this.colorin3;
   this.rangoRot;
   this.tono;
   this.sat;
   this.lum;
   this.espesor1;
   this.espesor2;
   this.espesor3;
   this.pregunta = random(1) > 0.5 ? true:false;

   this.defineVelYTam(); //no estoy seguro del this. ^
   this.redefineColor();

   this.draw; //función que dibujará la partícula, y que varía de partícula a partícula.
}

Particula.prototype.redefineColor = function() {
   this.tono = random(rangoDeColor, rangoDeColor + colorShift);
   this.sat = 50;
   this.lum = random(100, 255);

   this.colorin1 = color(this.tono, this.sat, this.lum,180);
   this.colorin2 = color(this.tono, this.sat - satShift, this.lum + 50, 5);
   this.colorin3 = color(this.tono, 70, this.lum, 10);
};

Particula.prototype.defineVelYTam = function() {
   this.tT = random(10);
   this.tR = random(10);
   this.rangoRot = random(0.9);
   this.velTam = random(0.01);
   this.velRot = random(0.01);
   this.tamanioMaximo = random(tamMin, tamMax); // variables globales que hay que declarar desde main.js
   var tV = this.tamanioMaximo / 20; //velosidad en función de tamaño >>>revisar si funciona por problemas de velosidad
   this.vel = createVector(tV, tV);
};

Particula.prototype.update = function() {

   this.direccion = map(noise(this.tR), 0, 1, -this.rangoRot, this.rangoRot);
   this.vel.rotate(this.direccion);
   this.check();
   this.pos1.add(this.vel);
   this.pos2 = -this.pos1.x;
   this.tam = map(noise(this.tT), 0, 1, -this.tamanioMaximo, this.tamanioMaximo);

   if (this.tam < 0) {
      this.espesor1 = this.tam * - 0.7;
      this.espesor2 = this.tam * -0.2;
      this.espesor3 = this.tam * -0.2;
   } else {
      this.espesor1 = this.tam * 0.7;
      this.espesor2 = this.tam * 0.2;
      this.espesor3 = this.tam * 0.2;
   }

   this.tT += this.velTam;
   this.tR += this.velRot;
};


Particula.prototype.check = function() {
   var largo = this.pos1.mag();
   if (largo > boundary) {
      this.vel.mult(-1);
   }
};

//asignación del grupo de posibilidades de las formas de partículas
