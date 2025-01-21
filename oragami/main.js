window.onload=function(){c=document.getElementById("_c"),ct=c.getContext("2d"),w=c.width=window.innerWidth,
h=c.height=window.innerHeight,tm=setInterval(xn,5000),sz=100,_9=6.283,_45=0.785,
np=16,ps=[],li=-1,ls=[function _0(){ps.forEach(function(pr,i){x=cr(i,0)*2;y=cr(i,1)*2
pr.its={x:x,y:y,sz:100,ag:Math.atan2(y,x)}})},function _1(){ps.forEach(function(pr,i){x=cr(i,0)*50;y=cr(i,1)*50	
pr.its={x:x,y:y,sz:100,ag:Math.atan2(y,x)-_45}})},function _2(){ps.forEach(function(pr,i){x=cr(i,0)*200;y=cr(i,1)*200
pr.its={x:x,y:y,sz:100,ag:Math.atan2(y,x)}})},function _3(){ps.forEach(function(pr,i){x=cr(i,0)*250;y=cr(i,1)*250
pr.its={x:x,y:y,sz:100,ag:Math.atan2(y,x)-_45}})},function _4(){ps.forEach(function(pr,i){x=cr(i,0)*((i%2==0)?100:250);y=cr(i,1)*((i%2==0)?100:250)
pr.its={x:x,y:y,sz:90*(1+(i%2)),ag:Math.atan2(y,x)-_45}})},function _5(){ps.forEach(function(pr,i){x=-(sz*4)/2+((i%4))*sz
y=-(sz*4)/2+(0|(i/4))*sz;pr.its={x:x,y:y,sz:100,ag:0}
pr.spd=Math.min(0.5+(i/np)*0.8,1)})},function _6(){ps.forEach(function(pr,i){r=Math.max(i/(np*0.75),0.4);x=cr(i,0)*r*100;y=cr(i,1)*r*100					
pr.spd=Math.min(0.5+((np-i)/np),1);pr.its={x:x,y:y,sz:r*r*150,ag:Math.atan2(y,x)}})}]
function cr(i,j){return (j==0)?Math.sin(i/np*_9):Math.cos(i/np*_9);}c.addEventListener('click',function(e){clearInterval(tm);xn()})
for(i=0;i<np;i++){ps.push(Paper.cr(0,0,sz));}function reset(){for(i=0;i<np;i++){ps[i].reset();}}ls[++li]();rd();function xn(){reset();ls[(++li)%ls.length]()}
function rd(){c.width=w;ct.translate(0|(w/2),0|(h/2));for(i=0;i<np;i++){ps[i].step();ps[i].rd(ct);}requestAnimationFrame(rd)}}
