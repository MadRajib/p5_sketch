<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <script language="javascript" type="text/javascript" src="p5.min.js"></script>
  <script language="javascript" type="text/javascript" src="sketch.js"></script>
  <script language="javascript" type="text/javascript" src="vehicle.js"></script>
  <script language="javascript" type="text/javascript" src="p5.dom.min.js"></script>
  </script>
  <!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-111564938-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-111564938-1');
</script>
  <style> body {padding: 0; margin: 0; }
  #myContainer {
      width: 100%;
      height: 998px;
      background-image: url('background1-min.jpg');
      background-repeat: no-repeat;
      background-size: contain;
      text-align: center;
  }
input{
	height: 40px;
}
#submit_button{
	width: 100px;
}
#share_button{
	width: auto;
	visibility: hidden;
}
#new_button {
	width: auto;
	visibility: hidden;
}
button {

	height: 50px;
	line-height: 40px;
	background-color: #F9C916;
  border-radius: 8px;
	color: #000;
  font-family: 'Robot';
  font-size: 15px;
  font-weight: normal;
	text-decoration: none;
	text-align: center;
	display: inline-block;
  position: relative;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: -webkit-transform;
  transition-property: transform;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transform: translateY(-6px);
  -ms-transform: translateY(-6px);
  transform: translateY(-6px);
  -webkit-animation-name: hover;
  animation-name: hover;
  -webkit-animation-duration: 1.5s;
  animation-duration: 1.5s;
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
  &:before{
  	pointer-events: none;
	  position: absolute;
	  z-index: -1;
	  content: '';
	  top: 100%;
	  left: 5%;
	  height: 10px;
	  width: 90%;
	  opacity: 0;
	  background: -webkit-radial-gradient(center, ellipse, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);
	  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);
	  -webkit-transition-duration: 0.3s;
	  transition-duration: 0.3s;
	  -webkit-transition-property: -webkit-transform, opacity;
	  transition-property: transform, opacity;
	  opacity: .4;
	  -webkit-transform: translateY(6px);
	  -ms-transform: translateY(6px);
	  transform: translateY(6px);
	  -webkit-animation-name: hover-shadow;
	  animation-name: hover-shadow;
	  -webkit-animation-duration: 1.5s;
	  animation-duration: 1.5s;
	  -webkit-animation-delay: .3s;
	  animation-delay: .3s;
	  -webkit-animation-timing-function: linear;
	  animation-timing-function: linear;
	  -webkit-animation-iteration-count: infinite;
	  animation-iteration-count: infinite;
	  -webkit-animation-direction: alternate;
	  animation-direction: alternate;
  }
	&:hover{
		background-color: #e16e50;
	}
}

@keyframes hover {
  50% {
    -webkit-transform: translateY(-3px);
    -ms-transform: translateY(-3px);
    transform: translateY(-3px);
  }

  100% {
    -webkit-transform: translateY(-6px);
    -ms-transform: translateY(-6px);
    transform: translateY(-6px);
  }
}

@-webkit-keyframes hover-shadow {
  0% {
    -webkit-transform: translateY(6px);
    transform: translateY(6px);
    opacity: .4;
  }

  50% {
    -webkit-transform: translateY(3px);
    transform: translateY(3px);
    opacity: 1;
  }

  100% {
    -webkit-transform: translateY(6px);
    transform: translateY(6px);
    opacity: .4;
  }
}

@keyframes hover-shadow {
  0% {
    -webkit-transform: translateY(6px);
    -ms-transform: translateY(6px);
    transform: translateY(6px);
    opacity: .4;
  }

  50% {
    -webkit-transform: translateY(3px);
    -ms-transform: translateY(3px);
    transform: translateY(3px);
    opacity: 1;
  }

  100% {
    -webkit-transform: translateY(6px);
    -ms-transform: translateY(6px);
    transform: translateY(6px);
    opacity: .4;
  }
}

@-webkit-keyframes hover {
  50% {
    -webkit-transform: translateY(-3px);
    transform: translateY(-3px);
  }

  100% {
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
  }
}

@keyframes hover {
  50% {
    -webkit-transform: translateY(-3px);
    -ms-transform: translateY(-3px);
    transform: translateY(-3px);
  }

  100% {
    -webkit-transform: translateY(-6px);
    -ms-transform: translateY(-6px);
    transform: translateY(-6px);
  }
}
#mid_image{
  width: 100%;
  height: auto;
}
#foot{
    width:100%;
    position:fixed;
    margin-bottom: 0px;
    height: 200px;
    background-color: #094f71;
    display: block;
    color: #000;
  }
  @import url(https://fonts.googleapis.com/css?family=Roboto:900);
  @import url(https://fonts.googleapis.com/css?family=Indie+Flower);

.text {
  color: #000;
  font-family: Lato;
  font-size: 60px;
  text-align: center;
  margin-top: 50px;
}

.text2 {
  color: #fff;
  /*font-family: 'Indie Flower', cursive;*/
  font-family: 'Roboto';
  font-size: 20px;
  text-align: left;

  /*margin-top: -50px;*/
}

.text3 {
  color: #fff;
  /*font-family: 'Indie Flower', cursive;*/
  font-family: 'Roboto';
  font-size: 20px;
  text-align: right;
  /*margin-top: -20px;*/
  float: center;
}
.yesContainer{
  margin-left: 10px;
  float:left;
}

#logo {
  margin-top: -10px;
}
#yesPainterlink {
  color:#fff;
  /*font-family: 'Indie Flower', cursive;*/
  font-family: 'Roboto';
  margin-top: 0px;
  font-size: 20px;
}
.madContainer{
  /*float: left;*/
  margin-right: 10px;
  text-align: right;
}
#madrajibLink{
  color:#fff;
  /*font-family: 'Indie Flower', cursive;*/
  font-family: 'Roboto';
  margin-top: 0px;
  font-size: 20px;
  margin-right: 10px;
  margin-bottom: 45px
}
#page-footer {
  display: none !important;
}

.fa {
  padding: 5px;
  font-size: 10px;
  width: 10px;
  text-align: center;
  text-decoration: none;
  margin: 5px 2px;
}

.fa:hover {
    opacity: 0.7;
}

.fa-facebook {
  background: #3B5998;
  color: white;
}

.fa-twitter {
  background: #55ACEE;
  color: white;
}

.fa-google {
  background: #dd4b39;
  color: white;
}

.fa-linkedin {
  background: #007bb5;
  color: white;
}

.fa-youtube {
  background: #bb0000;
  color: white;
}

.fa-instagram {
  background: #125688;
  color: white;
}

.fa-pinterest {
  background: #cb2027;
  color: white;
}

.fa-snapchat-ghost {
  background: #fffc00;
  color: white;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}

.fa-skype {
  background: #00aff0;
  color: white;
}

.fa-android {
  background: #a4c639;
  color: white;
}

.fa-dribbble {
  background: #ea4c89;
  color: white;
}

.fa-vimeo {
  background: #45bbff;
  color: white;
}

.fa-tumblr {
  background: #2c4762;
  color: white;
}

.fa-vine {
  background: #00b489;
  color: white;
}

.fa-foursquare {
  background: #45bbff;
  color: white;
}

.fa-stumbleupon {
  background: #eb4924;
  color: white;
}

.fa-flickr {
  background: #f40083;
  color: white;
}

.fa-yahoo {
  background: #430297;
  color: white;
}

.fa-soundcloud {
  background: #ff5500;
  color: white;
}

.fa-reddit {
  background: #ff5700;
  color: white;
}

.fa-rss {
  background: #ff6600;
  color: white;
}




  </style>
</head>

<body>

  <div id='myContainer' name='<?php if(isset($_GET["name"])){ echo str_replace("22"," ",$_GET["name"]);}else{echo "Yes_Painter";}?>' >
  </div>
</body>
</html>
