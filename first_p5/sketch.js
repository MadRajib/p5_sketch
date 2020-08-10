var song;
var fft;
var bands = 512;
var rad = 0;
var w = 0.1;
var radius = 140;
var radius_1 = 220;
function preload(){
  song = loadSound('Lulleaux - Sinner (feat. SVM).mp3');
}

function setup(){
  createCanvas(1200, 700);
  background(255);

  // Create an Input stream which is routed into the Amplitude analyzer
  fft = new p5.FFT();

  // start the Audio Input
  song.loop();
  // patch the AudioIn
}
function mousePressed() {
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.stop();
//     background(255, 0, 0);
  } else {
    song.play();
//     background(0, 255, 0);
  }
}
function draw() {
  background(51);

  var spectrum =fft.analyze();

 //radial visualisation
 push();
  translate(width/2,height/2);
  strokeWeight(8);
  rotate(rad);
  for(var i = 0; i <63; i++){
       var r =  spectrum[i];
       r = constrain(r,150,180);

       var cos_a = cos(i*w);
       var sin_a = sin(i*w);

       var x = r*cos_a;
       var y = r*sin_a;

       stroke(255,150,0);
       line(radius*cos_a,radius*sin_a,x,y);

       //r = map(r,150,180,150,120);

       //var x1 = r*cos_a;
       //var y1 = r*sin_a;
       //stroke(255,150,0);
       //line(radius*cos_a,radius*sin_a,x1,y1);


  }
  rad+=0.01;
  pop();
  push();
  translate(width/2,height/2);
  strokeWeight(8);
  rotate(-rad);
  for(var i = 63+50; i <126+50; i++){
       var r =  spectrum[i];
       r = constrain(r,100,150);
       r = map(r,100,150,radius_1,radius_1+40);
       //r = constrain(r,radius_1+100,radius_1+150);
       var cos_a = cos(i*w);
       var sin_a = sin(i*w);

       var x = r*cos_a;
       var y = r*sin_a;

       stroke(0,150,255);
       line(radius_1*cos_a,radius_1*sin_a,x,y);

       //r = map(r,150,180,150,120);

       //var x1 = r*cos_a;
       //var y1 = r*sin_a;
       //stroke(255,150,0);
       //line(radius*cos_a,radius*sin_a,x1,y1);


  }
  pop();


  /*
  // vertical bars
  stroke(255);
  strokeWeight(4);
  for(var i = 0; i < bands; i++){

      line(i*10, 0,i*10, spectrum[i]);
      line(i*10, height,i*10,height - spectrum[i]);

  }
  */



}
