function Particle(){
  this.pos = createVector(random(width),random(height));
  this.vel = p5.Vector.random2D();
  this.acc = createVector(0,0);
  this.maxVel = 2;
  this.prePos = this.pos.copy();
  this.color = 0;

  this.update = function(){
    this.vel.add(this.acc);
    this.vel.limit(this.maxVel);
    this.pos.add(this.vel);
    this.acc.mult(0);


  }

  this.updatePrevious = function(){
    this.prePos.x = this.pos.x;
    this.prePos.y = this.pos.y;
  }
  this.edges  = function(){
    if(this.pos.x<0){
      this.pos.x = width;
      this.updatePrevious();
    }
    if(this.pos.x>width){
      this.pos.x = 0;
      this.updatePrevious();
    }
    if(this.pos.y<0){
      this.pos.y = height;
      this.updatePrevious();
    }
    if(this.pos.y>height){
      this.pos.y = 0;
      this.updatePrevious();
    }
  }
  this.applyForce = function(force){
    this.acc.add(force);
  }

  this.show = function(){
    stroke(this.color,255,255,25);
    //stroke(0,5);
    this.color += 1
    if(this.color > 255){
      this.color =0;
    }
    strokeWeight(1);
    //point(this.pos.x,this.pos.y);
    line(this.pos.x,this.pos.y,this.prePos.x,this.prePos.y);
    this.updatePrevious();
  }

  this.getCellNumber = function(){
    var cl = floor(this.pos.x / wd);
    var rw = floor(this.pos.y / wd) ;
    return rw*cols + cl;
  }

  this.follow = function(v){
    this.applyForce(v);
  }

}
