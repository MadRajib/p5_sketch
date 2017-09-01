var canvas;
var c;
var vines = [];
MAX =96*60;
var h =0;
var img;
function setup(){
  canvas = createCanvas(windowWidth,windowHeight);
  img = loadImage('/assets/sprites.png');
  c = defaultCanvas0.getContext('2d');
  c.shadowBlur = 24;
  translate(width/2,height/2);
  vines = [{
    x:0,
    y:0,
    a:0,
    ai:0,
    w:8,
    p:[],
    l:MAX
  }];
}

function draw(){
  canvas.clear();
  vines = vines.filter(v => v.l--);
  vines.forEach(function(v){
    var dx = cos(v.a)*v.w/2;
    var dy = sin(v.a)*v.w/2;
    v.x += dx;
    v.y += dy;
    v.a += v.ai/v.w/2;
    v.p.splice(0,v.p.length-v.l);
    v.p.splice(0,v.p.length-60);
    v.p.push({x:v.x,y:v.y,dx:dx,dy:dy});
    if(frameCount%30 ==0){
      v.ai = random()-.5;
    }

    if(v.w > 1 && random() < v.l/16384/2){
      vines.push({
        x:v.x,
        y:v.y,
        a:v.a,
        ai:v.ai,
        w:v.w/2,
        p:[],
        l: Math.min(v.l,0|v.w*32*(1+random()))
      });
    }
  });
  show();
}
function show(){
  translate(width/2,height/2);
  vines.forEach(function(v){
    if(v.w == 8){
     push();
     rotate(v.a);
      image(img,frameCount*4&112,0,16,24,-8,0,-16,-24);
      rotate(-v.a);
    pop();
      translate(-v.x,-v.y);
    }
    beginShape();
    var l = v.p.length -1;
    var p;
    c.shadowColor = c.stokeStyle = 'hsl('+(v.a*60|0)+',100%,'+(60+v.w*5)+'%)';
    // stroke(colr);

    stroke(255,255,255,255);
    h++;
    if(h>255){
      h=0;
    }
    noFill();
    for(var i =l;p=v.p[i];i--){
      curveVertex(p.x,p.y);
    }
    endShape();
  });

}
