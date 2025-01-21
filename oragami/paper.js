Paper={x:0,y:0,sz:0,n:0,spd:1.5,c1:0,c2:0,ag:0,cr:function(x,y,sz){obj=Object.create(this);obj.init(x,y,sz);return obj},init:function(x,y,sz){this.x=x
this.y=y;this.sz=sz;this.c1=0|Math.random()*360+1;this.c2=0|Math.random()*360+1},
its:{x:this.x,y:this.y,ag:this.ag,sz:this.size},step:function(){this._it(0.15*this.spd)},
reset:function(){this.n=0;this.c1=0|Math.random()*360+1;this.c2=0|Math.random()*360+1},
rd:function(ct){ct.save();ct.translate(this.x,this.y)
ct.rotate(this.ag);ct.beginPath();ct.moveTo(0,this.sz);ct.lineTo(0,0)
ct.lineTo(this.sz,0);ct.moveTo(0,this.sz);ct.lineTo(this.n,this.n);ct.lineTo(this.sz,0)
ct.fillStyle='hsl('+this.c1+',40%,'+this.m(this.n,0,this.sz,30,50)+'%)'
ct.fill();ct.beginPath();ct.moveTo(0,this.sz);ct.lineTo(this.n,this.n)
ct.lineTo(this.sz,0);ct.lineTo(this.sz,this.sz);ct.lineTo(0,this.sz)		
ct.fillStyle='hsl('+this.c2+',40%,'+this.m(this.n,0,this.sz,50,30)+'%)';ct.fill();this.n+=this.spd
if(this.n>=this.sz/8&&this.n<this.sz/2){ct.beginPath();ct.strokeStyle='#000'
ct.lineWidth=.05;ct.shadowColor='#000';ct.shadowBlur=10;ct.moveTo(0,this.sz);ct.lineTo(this.sz,0)
ct.moveTo((this.sz)/2,(this.sz)/2);ct.lineTo(this.n,this.n);ct.stroke()}
else if(this.n>=this.sz/2){ct.beginPath();ct.strokeStyle='#000';ct.lineWidth=.05
ct.shadowColor='#000';ct.shadowBlur=10;ct.moveTo(0,this.sz);ct.lineTo(this.sz,0)
ct.moveTo((this.sz)/2,(this.sz)/2);ct.lineTo(this.n,this.n);ct.stroke()}
if(this.n>this.sz){this.n=0;this.c2=this.c1;this.c1=0|Math.random()*360}ct.shadowBlur=0;ct.restore()},
m:function(n,s1,e1,s2,e2){return((n-s1)/(e1-s1))*(e2-s2)+s2},_it:function(v){for(p in this.its){this[p]+=(this.its[p]-this[p])*v}}}