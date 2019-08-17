var font;
var vehicles = [];
var w,h,bg,img,wd;

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
      w = innerWidth,
      h = innerHeight,
      fnt_size=192;
   cont = document.getElementById('myContainer');


   wd = cont.offsetWidth;
   ht = cont.offsetHeight;

//    str = cont.getAttribute("name");
   str = "Taruna";
   str_w = textWidth(str);
   if(wd>2000){
     w=2000;
     h=1600;

   }else{
      w=wd;
      h=ht;
   }
   cnv = createCanvas(w,(1600/2000)*w);
   cnv.parent('myContainer');
inputDiv = createElement('div');
inputDiv.id("edittext");
inputDiv.style('width','100%');
inputDiv.style('margin-top','-65px');
inputDiv.style('height','80px');
inputDiv.style('background-color','#094f71');

p2 = createElement('p','Greet your Friends: ');
p2.id('p2');
p2.style('color','#fff');
p2.style('margin-top','5px');
p2.style('font-size','15px');
p2.style('font-family','Roboto');

inputDiv.child(p2);

indiv = createElement('div');


input = createInput();
input.position(w/2-(input.width+70)/2-20, -35);
input.attribute("placeholder","Type Your Friends Name");
indiv.child(input);

button = createButton('Go');
button.position(input.x + input.width+20,-35 );
button.id("submit_button");
indiv.child(button);

shardiv = createElement('div');

shareLink = createButton('Share via Whatsapp');
shareLink.position(10,-35);
shareLink.attribute('data-action','share/whatsapp/share');
shareLink.id('share_button');
shardiv.child(shareLink);

newLink = createButton('Create Another');
newLink.position(w-10-newLink.width,-35);
newLink.attribute('data-action','share/whatsapp/share');
newLink.id('new_button');
shardiv.child(newLink);

newLink.mouseClicked(function(){
  newLink.style('visibility','hidden');
  str="";
  str_w = textWidth(str);
  reset();
  newLink.style('visibility','hidden');
  shareLink.style('visibility','hidden');
  button.style('visibility','visible');
  input.style('visibility','visible');
});


button.mouseClicked(function(){
  str=input.value();
  name = str.split('22');
  //console.log(name);
  for(var i=0;i<name.lenght;i++){
  	str += name[i];
  	str+= " ";
  }
  //str = str.trim();
  //str = str.replace("22"," ");
  str = str.trim();
  str_w = textWidth(str);
  reset();
  button.style('visibility','hidden');
  input.style('visibility','hidden');
  shareLink.style('visibility','visible');
  newLink.style('visibility','visible');
});



shareLink.mouseClicked(function(){
url = encodeURI('http://www.mateorbit.com/madrajiblab/newyear/index.php?name='+str.replace(' ',22));
 location.href="whatsapp://send?text=*"+str+"* See Your Special Message%0A%0ATouch blue line %0A%0A 👉 "+url.toString()+"%0A%0ATouch Your name";
});

inputDiv.child(indiv);
inputDiv.child(shardiv);


div2 = createElement('div');
div2.position(0,(1600/2000)*w+80);
// section0 = createElement('section');
// section0.child(inputDiv);
div2.child(inputDiv);

section = createElement('section');
// section.position(0,0);
midBg = createElement('img');
midBg.attribute('src','mid_part1-min.png');
midBg.id('mid_image');
section.child(midBg);
div2.child(section);

footer = createElement('div');
footer.position(0,(1600/2000)*w+(1300/2000)*w+100);
//footer = createElement('footer');
//footer.position(0,);
footer.id('foot');


footerDiv = createElement('div');
footerDiv.class('yesContainer');

h20 = createElement('h3','Powered By:');
h20.class('text2');

footerDiv.child(h20);

img0 = createElement('img');
img0.id('logo');
img0.attribute('src','https://yespainter.com/wp-content/uploads/2017/04/LOGOfinal.png');
img0.mouseClicked(function(){
  location.href="https://yespainter.com";
});
footerDiv.child(img0);

p0 = createElement('p','www.yespainter.com');
p0.id('yesPainterlink');
footerDiv.child(p0);

linksDiv = createElement('div');

a0 = createElement('a');
a0.attribute('href','https://www.facebook.com/yespainter');
a0.class('fa fa-facebook');

a1 = createElement('a');
a1.attribute('href','https://twitter.com/yespaintertweet');
a1.class('fa fa-twitter');

a2 = createElement('a');
a2.attribute('href','https://www.instagram.com/official_yespainter');
a2.class('fa fa-instagram');


a3 = createElement('a');
a3.attribute('href','https://plus.google.com/b/108756779873903623720/108756779873903623720');
a3.class('fa fa-google');

linksDiv.child(a0);
linksDiv.child(a1);
linksDiv.child(a2);
linksDiv.child(a3);

footerDiv.child(linksDiv);

footer.child(footerDiv);

footerDiv1 = createElement('div');
footerDiv1.class('madContainer');


h21 = createElement('h3','In Association with:');
h21.class('text3');
footerDiv1.child(h21);

p1 = createElement('p','MadRajib Lab');
p1.id('madrajiblink');
footerDiv1.child(p1);

linksDiv1 = createElement('div');

a4 = createElement('a');
a4.attribute('href','http://www.youtube.com/c/MadRajibLab');
a4.class('fa fa-youtube');

a5 = createElement('a');
a5.attribute('href','https://twitter.com/Madhab_Sharma');
a5.class('fa fa-twitter');

a6 = createElement('a');
a6.attribute('href','https://www.instagram.com/madrajib');
a6.class('fa fa-instagram');

a7 = createElement('a');
a7.attribute('href','https://www.facebook.com/profile.php?id=100002000359142');
a7.class('fa fa-facebook');

linksDiv1.child(a4);
linksDiv1.child(a7);
linksDiv1.child(a5);
linksDiv1.child(a6);


footerDiv1.child(linksDiv1);


footer.child(footerDiv1);



//div3.child(footer);
   //background(51);
   reset();

}
function reset(){
  vehicles =[];
  fsz =map(wd,159,2000,10,192);
  fsz = (fsz>192)?192:fsz;

  x_sz = map(w,159,2000,0,250);
  x_sz = (x_sz>250)?250:x_sz;

  sz =map(fsz,10,192,60,500);
  sz = (sz>500)?500:sz;


 rsz = map(fsz,10,192,2,8);
 rsz = (rsz>8)?8:rsz;
  var bbox = font.textBounds(str, 0,0, fsz);
  var points = font.textToPoints(str, w/2-bbox.w/2, sz, fsz, {
    sampleFactor: 0.25
  });

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y,rsz);
    vehicles.push(vehicle);

  }
}


function draw() {
  //background(51);
   clear();
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
}
