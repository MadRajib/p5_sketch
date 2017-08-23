var inc = 0.01;
var yoff;
var xoff;
var zoff = 0 ;
var rows;
var cols;
var wd =20;
var particles;

var flowField;

function setup() {
 createCanvas(windowWidth,windowHeight);
 colorMode(HSB,255);

 //pixelDensity(1);
 rows = floor(height/wd);
 cols = floor(width/wd);
 particles = [];

 flowField =[];

 for(var i=0; i<1000;i++ ){
   particles.push(new Particle());
 }
 background(255);
}

function draw() {

  yoff =0;
  for(var y=0; y< rows ; y++){
    xoff =0;
    for(var x=0; x< cols ; x++){
      var index  = (x + y*cols);

      var c  = noise(xoff,yoff,zoff)*TWO_PI*4;

      // pixels[index+0] = c;
      // pixels[index+1]= c;
      // pixels[index+2]= c;
      // pixels[index+3]= 255;
      //fill(c);
      //rect(x*wd,y*wd,wd,wd);
      v = p5.Vector.fromAngle(c);
      v.setMag(1);
      flowField[index] = v;

      //  stroke(0,25);
      //  push();
      //    translate(x*wd,y*wd + wd);
      //    rotate(v.heading());
      //   line(0,0,wd,0);
      //  pop();


      xoff+=inc;
    }
    yoff+=inc;
  }
  zoff+= 0.01
  particles.forEach(function(particle){
    particle.follow(flowField[particle.getCellNumber()]);
    particle.edges();
    particle.show();
    particle.update();


  });


  //updatePixels();
}
