let hueSlider
let flock
let cohesionSlider
let separationSlider
let alignmentSlider

// prepares p5 resources for rendering
function setup() {
    let width = windowWidth - 20;
    let height = windowHeight - 20;
    createCanvas(width, height);
    flock = new Flock(200, 50, width, height);

    //sliders
    cohesionSlider = createSlider(0, 10, 1);
    cohesionSlider.position(10, windowHeight);
    separationSlider = createSlider(0, 10, 1);
    separationSlider.position(200, windowHeight);
    alignmentSlider = createSlider(0, 10, 1);
    alignmentSlider.position(400, windowHeight);
    speedSlider = createSlider(0, 10, 3);
    speedSlider.position(600, windowHeight);
    //text for sliders
    cohesionText = createDiv(`cohesion factor: ${cohesionSlider.value()}`);
    cohesionText.position(cohesionSlider.x, cohesionSlider.y - 10);
    separationText = createDiv(`separation factor: ${separationSlider.value()}`);
    separationText.position(separationSlider.x, separationSlider.y - 10);
    alignmentText = createDiv(`alignment factor: ${alignmentSlider.value()}`);
    alignmentText.position(alignmentSlider.x, alignmentSlider.y - 10);
    speedText = createDiv(`speed: ${speedSlider.value()}`);
    speedText.position(speedSlider.x, speedSlider.y - 10);
}

//renders the graphics
function draw() {
    background(220);
    Boid.cohesionFactor = cohesionSlider.value();
    Boid.separationFactor = separationSlider.value();
    Boid.alignmentFactor = alignmentSlider.value();
    Boid.speed = speedSlider.value();
    cohesionText.html(`Cohesion Factor: ${Boid.cohesionFactor}`);
    separationText.html(`Separation Factor: ${Boid.separationFactor}`);
    alignmentText.html(`Alignment Factor: ${Boid.alignmentFactor}`);
    speedText.html(`Speed: ${Boid.speed}`);
    let fps = frameRate();
    text(`FPS: ${fps.toFixed(2)}`, windowWidth - 100, windowHeight - 25);
    flock.render();
    flock.update();
}
