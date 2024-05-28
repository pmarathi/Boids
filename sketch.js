let hueSlider
let flock
let counter

// prepares p5 resources for rendering
function setup() {
    createCanvas(windowWidth, windowHeight);
    flock = new Flock(100, 10);
    counter = 0;
}

//renders the graphics
function draw() {
    background(220);
    flock.render();
    flock.update();
    counter++;
}
