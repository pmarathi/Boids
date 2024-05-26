let hueSlider
let flock

// prepares p5 resources for rendering
function setup() {
    createCanvas(windowWidth, windowHeight);
    // createCanvas(400, 400);
    flock = new Flock(1, 10);
}

//renders the graphics
function draw() {
    background(220);
    flock.render();
    flock.update();
}
