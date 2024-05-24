class Boid {
    // TODO: store a global list of all Boids
    constructor(xPos, yPos, orientation){
        this.orientation = orientation
        this.position = createVector(xPos, yPos);
        this.velocity = createVector(Math.cos(orientation), Math.sin(orientation));
    }

    update() {

    }

    //used by sketch.js to render each individual boid
    render(){
        push()
        translate(this.position.x, this.position.y)
        rotate(this.orientation)
        let speed = this.velocity.mag();
        fill(255, 255, 255)
        triangle(10, 0, -10, -7, -10, 7)
        pop()
    }
}