let img;
let smallerImg;
let scaleFactor = 50;
let w;
let h;

let mainImage;
let fillerImages = [];
let fillerImagesBrigthness = [];
let brightImages = new Array(256);
let mainImageLoaded = false;
let avgColors = [];

let loader;
let totalImages = 0;
let loadedImages = 0;

function setup() {
  slider = createSlider(0, 100, scaleFactor, 10);
  slider.position(10, 10);
  slider.size(200);
  slider.input(repaint);

  textElement = createDiv('Scale: ' + slider.value());
  textElement.position(slider.x + slider.width + 10, slider.y);

  textAlign(CENTER, CENTER);
  textSize(16);
  loadMainImage();
}

function repaint() {
  scaleFactor = slider.value();
  textElement.html('Pixalte: ' + slider.value());
  background(0)

  if (!mainImageLoaded) return;

  w = floor(mainImage.width / scaleFactor) ;
  h = floor(mainImage.height / scaleFactor);

  smallerImg = createImage(w, h);
  smallerImg.copy(
    mainImage,
    0,
    0,
    mainImage.width,
    mainImage.height,
    0,
    0,
    w,
    h
  );

  smallerImg.loadPixels();
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let index = (x + y * w) * 4;
      let r = smallerImg.pixels[index];
      let g = smallerImg.pixels[index + 1];
      let b = smallerImg.pixels[index + 2];
      let a = smallerImg.pixels[index + 3];

      fill(r, g, b, a);
      noStroke();
      rect(x * scaleFactor, y * scaleFactor, scaleFactor, scaleFactor);
    }
  }
}

function loadMainImage() {
  fileInput = createFileInput(handleMainImage).attribute("accept", "image/*");
  fileInput.position(10, 50);
  mainImage = null;
  fillerImages = [];
  fillerImagesBrigthness = [];
  brightImages = new Array(256);
  mainImageLoaded = false;
}

function loadMultipleImages() {
  var fileInput = createInput();
  // Set attribute to file
  fileInput.attribute("type", "file");
  // If we want to allow multiple files
  fileInput.attribute("multiple", "");
  // If a file is selected this event will be triggered
  fileInput.elt.addEventListener("change", handleFileSelect, false);
  fileInput.position(10, 110);
}

function handleFileSelect(evt) {
  // A FileList
  var files = evt.target.files;
  totalImages = 0;
  loadedImages = 0;
  displayLoader();
  valid_img_ext = ["png", "jpg", "jpeg"]

  for (var i = 0; i < files.length; i++) {
    let tp = files[i].type.split('/')[1];
    if (valid_img_ext.includes(tp)) {
      totalImages++;
    }
  }

  // Show some properties
  for (var i = 0, f; (f = files[i]); i++) {
    let tp = files[i].type.split('/')[1];
    if (!valid_img_ext.includes(tp))
      continue

    let urlOfImageFile = URL.createObjectURL(f);
    loadImage(urlOfImageFile, (mg) => {
      let totalBrightness = 0;

      mg.resize(scaleFactor, scaleFactor);

      avgColors.push(calculateAvgColor(mg));
      fillerImages.push(mg);

      loadedImages++;

      loader.html("Loading Images..." + loadedImages+"/" +totalImages);

      if (loadedImages == totalImages) {

        loader.html("Processing Images ...");

        
        smallerImg.loadPixels();
        for (let x = 0; x < w; x++) {
          for (let y = 0; y < h; y++) {
            let index = (x + y * w) * 4;
            let r = smallerImg.pixels[index];
            let g = smallerImg.pixels[index + 1];
            let b = smallerImg.pixels[index + 2];
            // let c = color(r, g, b)
            let brightness_index = findNearestImage([r, g, b], avgColors);
            if (fillerImages[brightness_index] !== undefined)
              image(
                fillerImages[brightness_index],
                x * scaleFactor,
                y * scaleFactor,
                scaleFactor,
                scaleFactor
              );
          }
        }

        hideLoader();

      }
    });
  }
}

function handleMainImage(file) {
  if (file.type === "image") {
    loadImage(file.data, (mg) => {
      mainImage = mg
      mainImageLoaded = true;
      w = mg.width / scaleFactor;
      h = mg.height / scaleFactor;

      smallerImg = createImage(w, h);
      smallerImg.copy(
        mg,
        0,
        0,
        mg.width,
        mg.height,
        0,
        0,
        w,
        h
      );

      let canvas = createCanvas(mg.width, mg.height);

      smallerImg.loadPixels();
      for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
          let index = (x + y * w) * 4;
          let r = smallerImg.pixels[index];
          let g = smallerImg.pixels[index + 1];
          let b = smallerImg.pixels[index + 2];
          let a = smallerImg.pixels[index + 3];

          fill(r, g, b, a);
          noStroke();
          rect(x * scaleFactor, y * scaleFactor, scaleFactor, scaleFactor);
        }
      }

      loadMultipleImages();
    });
  } else {
    alert("Please upload a valid image file.");
  }
}

function displayLoader() {
  loader = createDiv("Loading Images..." + loadedImages+"/" +totalImages).style("font-size", "40px").style("color", "#FFF");
  loader.position(10, 150); // Center the loader
}

function hideLoader() {
  loader.hide();
}


function calculateAvgColor(img) {
  img.loadPixels();
  let totalR = 0, totalG = 0, totalB = 0;
  let pixelCount = img.width * img.height;

  for (let i = 0; i < img.pixels.length; i += 4) {
    totalR += img.pixels[i];     // Red
    totalG += img.pixels[i + 1]; // Green
    totalB += img.pixels[i + 2]; // Blue
  }

  // Return the average R, G, B as an array
  return [totalR / pixelCount, totalG / pixelCount, totalB / pixelCount];
}

// Function to find the nearest image based on average color
function findNearestImage(targetColor, colors) {
  let minDistance = Infinity;
  let nearestIndex = -1;

  for (let i = 0; i < colors.length; i++) {
    let dist = calculateColorDistance(targetColor, colors[i]);
    if (dist < minDistance) {
      minDistance = dist;
      nearestIndex = i;
    }
  }

  return nearestIndex;
}

// Function to calculate Euclidean distance in RGB space
function calculateColorDistance(color1, color2) {
  return sqrt(
    pow(color1[0] - color2[0], 2) +
    pow(color1[1] - color2[1], 2) +
    pow(color1[2] - color2[2], 2)
  );
}
