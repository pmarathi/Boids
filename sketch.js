let hueSlider
let flock

// prepares p5 resources for rendering
function setup() {
    createCanvas(windowWidth, windowHeight);
    flock = new Flock(10, 10);
}

//renders the graphics
function draw() {
    background(220);
    flock.render();
}
