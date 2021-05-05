// Teachable Machine
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/TeachableMachine/1-teachable-machine.html
// https://editor.p5js.org/codingtrain/sketches/PoZXqbu4v



let input;
let img;
let labelIndex;
let labelName;
let canvas;

// let label;
// For displaying the label
let num = "Waiting to calculate...";
// The classifier
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/uSqR0cUOn/';

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}


function setup() {
  canvas = createCanvas(windowWidth-160, 640);
  title = createElement("h1", "");
  title.position(80, 20);
  smallTitle = createElement("h2", "Find out how ugly your design is");
  smallTitle. position(40, 180);
  

  canvas.position(40, 60);

  input = createFileInput(handleFile);
  input.position(40, 240);

 
}

// STEP 2 classify the videeo!
function classifyVideo() {
  classifier.classify(img, gotResults);
}

function draw() {
  background(255);

  imageMode(CENTER);
  var scale = 0.75;

  if (img) {
    image(img, width/2+300, height/2+30, img.width/img.height*scale*height, scale*height); //resize proportionally
  }

  

  // STEP 4: Draw the label
  textSize(36);
  textAlign(CORNER);
  fill(0);
  textFont('Helvetica');
  text(num, 0, height - 60);

  //classification needs to load after the image is uploaded
    classifyVideo();
}

// STEP 3: Get the classification!
function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }

  // Store the label and classify again!
    labelName = results[0].confidence;
    labelIndex = results[0].label;

  //reformat the number
  let numFormat = nfc(labelName*100, 2) + "%";

  //display ugly index 
  num = labelIndex + "    " + numFormat;

  //call the classify function
  classifyVideo();

}

function handleFile(file) {
    print(file);
    if (file.type === 'image') {
      img = createImg(file.data, '');
      img.hide();
    } else {
      img = null;
    }
  }

