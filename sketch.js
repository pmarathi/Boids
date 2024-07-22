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
    cohesionSlider = createSlider(0, 5, 1);
    cohesionSlider.position(10, windowHeight - 10);
    separationSlider = createSlider(0, 10, 3);
    separationSlider.position(200, windowHeight - 10);
    alignmentSlider = createSlider(0, 5, 1);
    alignmentSlider.position(400, windowHeight - 10);
    speedSlider = createSlider(0, 10, 3);
    speedSlider.position(600, windowHeight - 10);
    numSlider = createSlider(0, 200, 100);
    numSlider.position(800, windowHeight - 10);

    // text for sliders
    cohesionText = createDiv(`Cohesion Factor: ${cohesionSlider.value()}`);
    cohesionText.position(cohesionSlider.x, cohesionSlider.y - 15);
    cohesionText.style('color', 'white');
    separationText = createDiv(`Separation Factor: ${separationSlider.value()}`);
    separationText.position(separationSlider.x, separationSlider.y - 15);
    separationText.style('color', 'white');
    alignmentText = createDiv(`Alignment Factor: ${alignmentSlider.value()}`);
    alignmentText.position(alignmentSlider.x, alignmentSlider.y - 15);
    alignmentText.style('color', 'white');
    speedText = createDiv(`Speed: ${speedSlider.value()}`);
    speedText.position(speedSlider.x, speedSlider.y - 15);
    speedText.style('color', 'white');
    numText = createDiv(`Number: ${numSlider.value()}`);
    numText.position(numSlider.x, numSlider.y - 15);
    numText.style('color', 'white');
}

function updateSliderPositions() {
    cohesionSlider.position(10, height - 20);
    separationSlider.position(210, height - 20);
    alignmentSlider.position(410, height - 20);
    speedSlider.position(610, height - 20);
    numSlider.position(810, height - 20);
}

function updateTextPositions() {
    cohesionText.position(cohesionSlider.x, cohesionSlider.y - 15);
    separationText.position(separationSlider.x, separationSlider.y - 15);
    alignmentText.position(alignmentSlider.x, alignmentSlider.y - 15);
    speedText.position(speedSlider.x, speedSlider.y - 15);
    numText.position(numSlider.x, numSlider.y - 15);
}

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
            // Update the timestamp
            lastUpdateTime = currentTime;
        }
    }
}

// renders the graphics
function draw() {
    background(0);    
    Boid.cohesionFactor = cohesionSlider.value();
    Boid.separationFactor = separationSlider.value() * 2;
    Boid.alignmentFactor = alignmentSlider.value();
    Boid.speed = speedSlider.value();
    cohesionText.html(`Cohesion Factor: ${Boid.cohesionFactor}`);
    separationText.html(`Separation Factor: ${Boid.separationFactor / 2}`);
    alignmentText.html(`Alignment Factor: ${Boid.alignmentFactor}`);
    numText.html(`Number: ${numSlider.value()}`);
    speedText.html(`Speed: ${Boid.speed}`);
    let fps = frameRate();

    updateNumBoids();

    text(`FPS: ${fps.toFixed(2)}`, windowWidth - 100, windowHeight - 25);
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
