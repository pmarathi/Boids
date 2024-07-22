let hueSlider;
let flock;
let cohesionSlider;
let separationSlider;
let alignmentSlider;
let speedSlider;
let numSlider;
let number;

// Timestamp to track the last update
let lastUpdateTime = 0;
const updateInterval = 1000; // 1 second in milliseconds

// prepares p5 resources for rendering
function setup() {
    let width = windowWidth - 20;
    let height = windowHeight - 20;
    createCanvas(windowWidth, windowHeight).parent('p5-container');
    flock = new Flock(100, 50, width, height);
    number = 100;

    // sliders
    cohesionSlider = createSlider(0, 5, 3);     
    separationSlider = createSlider(0, 10, 3);
    alignmentSlider = createSlider(0, 5, 3);
    speedSlider = createSlider(0, 10, 3);
    numSlider = createSlider(0, 200, 100);

    // text for sliders
    cohesionText = createDiv(`Cohesion Factor: ${cohesionSlider.value()}`);
    cohesionText.style('color', 'white');
    separationText = createDiv(`Separation Factor: ${separationSlider.value()}`);
    separationText.style('color', 'white');
    alignmentText = createDiv(`Alignment Factor: ${alignmentSlider.value()}`);
    alignmentText.style('color', 'white');
    speedText = createDiv(`Speed: ${speedSlider.value()}`);
    speedText.style('color', 'white');
    numText = createDiv(`Number: ${numSlider.value()}`);
    numText.style('color', 'white');
    windowResized();
}

function updateSliderPositions() {
    let heightAdjust = 20;
    cohesionSlider.position(10, height - heightAdjust);
    separationSlider.position(210, height - heightAdjust);
    alignmentSlider.position(410, height - heightAdjust);
    speedSlider.position(610, height - heightAdjust);
    numSlider.position(810, height - heightAdjust);
}

function updateTextPositions() {
    let textAdjust = 15;
    cohesionText.position(cohesionSlider.x, cohesionSlider.y - textAdjust);
    separationText.position(separationSlider.x, separationSlider.y - textAdjust);
    alignmentText.position(alignmentSlider.x, alignmentSlider.y - textAdjust);
    speedText.position(speedSlider.x, speedSlider.y - textAdjust);
    numText.position(numSlider.x, numSlider.y - textAdjust);
}

//adjusts settings when window is resized
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    width = windowWidth;
    height = windowHeight;
    flock.updateCanvasSize(width, height);
    updateSliderPositions();
    updateTextPositions();
}


function updateNumBoids() {
    // Get the current time
    const currentTime = millis();

    // Check if enough time has passed since the last update
    if (currentTime - lastUpdateTime > updateInterval) {
        if (number !== numSlider.value()) {
            flock = new Flock(numSlider.value(), 50, width, height);
            number = numSlider.value();
            lastUpdateTime = currentTime;
        }
    }
}

// renders the graphics
function draw() {
    background(0);
    Boid.cohesionFactor = cohesionSlider.value();
    Boid.separationFactor = separationSlider.value();
    Boid.alignmentFactor = alignmentSlider.value();
    Boid.speed = speedSlider.value();
    cohesionText.html(`Cohesion Factor: ${Boid.cohesionFactor}`);
    separationText.html(`Separation Factor: ${Boid.separationFactor}`);
    alignmentText.html(`Alignment Factor: ${Boid.alignmentFactor}`);
    numText.html(`Number: ${numSlider.value()}`);
    speedText.html(`Speed: ${Boid.speed}`);
    updateNumBoids();
    flock.render();
    flock.update();
}

function mousePressed() {
    if (mouseButton === LEFT) Boid.leftPressed = 1;
    if (mouseButton === RIGHT) Boid.rightPressed = 1;
}

function mouseReleased() {
    if (mouseButton === LEFT) Boid.leftPressed = 0;
    if (mouseButton === RIGHT) Boid.rightPressed = 0;
}
