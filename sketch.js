let boid
let hueSlider

function setup() {
    createCanvas(400, 400);
    boid = new Boid(100, 100, 0);
    // hueSlider = createSlider(0, 255, 0);
    // hueSlider.position(10, height - 30);
    // hueSlider.style('width', '380px');
}

function draw() {
    background(220);
    // let hue = hueSlider.value();
    boid.render(hue);
}
