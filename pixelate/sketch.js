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

let loader;
let totalImages = 0;
let loadedImages = 0;

function setup() {
  slider = createSlider(0, 100, scaleFactor, 10);
  slider.position(10, 10);
  slider.size(100);
  slider.input(repaint);

  textElement = createDiv('Scale: ' + slider.value());
  textElement.position(slider.x + slider.width + 10, slider.y);

  textAlign(CENTER, CENTER);
  textSize(16);
  loadMainImage();
}

function repaint() {
  scaleFactor = slider.value();
  textElement.html('Scale: ' + slider.value());
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
  totalImages = files.length;
  loadedImages = 0;
  displayLoader();

  // Show some properties
  for (var i = 0, f; (f = files[i]); i++) {
    let urlOfImageFile = URL.createObjectURL(f);
    loadImage(urlOfImageFile, (mg) => {
      let totalBrightness = 0;
      let pixelCount = mg.width * mg.height;

      mg.loadPixels();

      // Loop through every pixel in the image
      for (let x = 0; x < mg.width; x++) {
        for (let y = 0; y < mg.height; y++) {
          let index = (x + y * mg.width) * 4; // Pixel index in the array
          let r = mg.pixels[index]; // Red value
          let g = mg.pixels[index + 1]; // Green value
          let b = mg.pixels[index + 2]; // Blue value

          // Calculate brightness (using luminance formula)
          let brightness = r * 0.299 + g * 0.587 + b * 0.114;
          totalBrightness += brightness;
        }
      }

      // Calculate the average brightness
      avgBrightness = totalBrightness / pixelCount;
      fillerImagesBrigthness.push(avgBrightness);
      fillerImages.push(mg);
      loadedImages++;

      loader.html("Loading Images..." + loadedImages+"/" +totalImages);

      if (loadedImages == totalImages) {
        loader.html("Processing Images ...");
        for (let i = 0; i < brightImages.length; i++) {
          let record = 256;
          for (let j = 0; j < fillerImagesBrigthness.length; j++) {
            let diff = abs(i - fillerImagesBrigthness[j]);
            if (diff < record) {
              record = diff;
              brightImages[i] = fillerImages[j];
            }
          }
        }
        
        hideLoader();

        smallerImg.loadPixels();
        for (let x = 0; x < w; x++) {
          for (let y = 0; y < h; y++) {
            let index = (x + y * w) * 4;
            let r = smallerImg.pixels[index];
            let g = smallerImg.pixels[index + 1];
            let b = smallerImg.pixels[index + 2];
            let brightness_index = r * 0.299 + g * 0.587 + b * 0.114;

            image(
              brightImages[int(brightness_index)],
              x * scaleFactor,
              y * scaleFactor,
              scaleFactor,
              scaleFactor
            );
          }
        }
      }
    });
  }
}

function handleAdditionalImages(file) {
  if (file.type === "image") {
    let mg = loadImage(file.data, () => {
      let totalBrightness = 0;
      let pixelCount = mg.width * mg.height;

      mg.loadPixels();

      // Loop through every pixel in the image
      for (let x = 0; x < mg.width; x++) {
        for (let y = 0; y < mg.height; y++) {
          let index = (x + y * mg.width) * 4; // Pixel index in the array
          let r = mg.pixels[index]; // Red value
          let g = mg.pixels[index + 1]; // Green value
          let b = mg.pixels[index + 2]; // Blue value

          // Calculate brightness (using luminance formula)
          let brightness = r * 0.299 + g * 0.587 + b * 0.114;
          totalBrightness += brightness;
        }
      }

      // Calculate the average brightness
      avgBrightness = totalBrightness / pixelCount;
      brightnessImage[int(avgBrightness)] = mg;
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
