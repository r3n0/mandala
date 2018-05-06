// en este documento se establecen el número de partículas,
// el tipo de partícula y cómo están distribuidas


function Control() {
   this.draws = [];
   this.p = [];
   this.nP; //número de partículas por tipo
   this.divs = []; //diviciones radians
   this.controlador = true; //booleano temporal <----------<------
   this.testigo = 0; //temporal <----------<------
}



Control.prototype.initDraws = function() {
   this.draws[0] = function() {
      noStroke();
      fill(this.colorin1);
      ellipse(this.pos1.x, this.pos1.y, this.tam, this.tam);

      noFill();
      strokeWeight(this.espesor1);
      stroke(0, 0, 0, 30);
      ellipse(this.pos1.x, this.pos1.y, this.tam, this.tam);

      noFill();
      strokeWeight(this.espesor2);
      stroke(this.colorin3);
      var diametro = this.tam * this.tam;
      ellipse(this.pos1.x, this.pos1.y, diametro, diametro);
   }

   this.draws[1] = function() {
      noFill();
      strokeWeight(this.espesor3);
      stroke(this.colorin2);
      var largo = this.pos1.x + (this.tam * 3 );

      if (this.pregunta){
         var alto = this.pos1.y + (100 - (this.tam * 2));
      }else{
         var alto = this.pos1.y;
      }

      line(this.pos1.x, this.pos1.y, largo, alto);
      ellipse(this.pos1.x, this.pos1.y, 1, 1);
      ellipse(largo, alto, 1, 1);
   }

   this.draws[2] = function() {
      noStroke();
      fill(this.colorin3);
      ellipse(this.pos1.x, this.pos1.y, this.tam, this.tam);
   }
}

Control.prototype.itinDivs = function() {
   var index = floor(random(3, 8));
   var suma = index;
   this.nP = (8 - ceil(index/2)); // esta es la cantidad de partículas por grupo

   for (var i = 0; i < this.draws.length; i++) {
      this.divs[i] = index;
      // index += suma;
      index *= 2;
   }
   console.log("las diviciones son: [" + this.divs + "]");
};

Control.prototype.initMandala = function() {
   var indexLength = this.draws.length * this.nP;
   for (var i = 0; i < indexLength; i++) {
      // var index = floor(random(this.draws.length)); // orden aleatorio
      var index = i % this.draws.length; //ordenado
      this.p[i] = new Particula();
      this.p[i].draw = this.draws[index];
      console.log("intex de partícula: " + i + " --> Tipo de draw: " + index);
   }
};

Control.prototype.display = function() {
   if (this.controlador) {
      console.log("hay " + this.p.length + " partículas")
   }
   for (var i = 0; i < this.p.length; i++) {
      this.p[i].update();
   }

   push();
   for (var d = 0; d < this.divs.length; d++) {
      for (var r = 0; r < this.divs[d]; r++) {
         var angulo = radians(360 / this.divs[d]);
         rotate(angulo);
         if (this.controlador) {
            //console.log("rotacion " + this.testigo);
            this.testigo++;
         }
         scale(-1, 1);
         for (var i = 0; i < this.nP; i++) {
            var index = (i * this.draws.length) + d;
            this.p[index].draw();
         }
         scale(-1, 1);
         for (var i = 0; i < this.nP; i++) {
            var index = (i * this.draws.length) + d;
            this.p[index].draw();
         }
      }
   }
   pop();
   this.controlador = false;
};

Control.prototype.reset = function() {
   for (var i = 0; i < this.p.length; i++) {
      this.p[i].redefineColor();
      this.p[i].defineVelYTam();
   }
};
