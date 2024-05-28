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
    flock = new Flock(100, 10, width, height);
    cohesionSlider = createSlider(0, 10);
    cohesionSlider.position(10, windowHeight);
    separationSlider = createSlider(0, 10);
    separationSlider.position(200, windowHeight);
    alignmentSlider = createSlider(0, 10);
    alignmentSlider.position(400, windowHeight);
    text1 = createDiv(`cohesion factor: ${cohesionSlider.value()}`);
    text1.position(cohesionSlider.x, cohesionSlider.y - 10);

    text2 = createDiv(`separation factor: ${separationSlider.value()}`);
    text2.position(separationSlider.x, separationSlider.y - 10);

    text3 = createDiv(`alignment factor: ${alignmentSlider.value()}`);
    text3.position(alignmentSlider.x, alignmentSlider.y - 10);
}

//renders the graphics
function draw() {
    background(220);
    Boid.cohesionFactor = cohesionSlider.value();
    Boid.separationFactor = separationSlider.value();
    Boid.alignmentFactor = alignmentSlider.value();
    text1.html(`Cohesion Factor: ${Boid.cohesionFactor}`);
    text2.html(`Separation Factor: ${Boid.separationFactor}`);
    text3.html(`Alignment Factor: ${Boid.alignmentFactor}`);
    let fps = frameRate();
    text(`FPS: ${fps.toFixed(2)}`, windowWidth - 100, windowHeight - 25);
    flock.render();
    flock.update();
}
