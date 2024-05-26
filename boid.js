// represents an individual boid
class Boid {
    constructor(xPos, yPos, orientation){
        this.orientation = orientation;
        this.position = createVector(xPos, yPos);
        this.velocity = createVector(Math.random() * 2 - 1, Math.random() * 2 - 1);
    }

    // updates instance variables according to neighbors
    update(neighbors) {
        this.edges();
        //TODO: implement coefficients for each of these
        //TODO: redundancy and efficiency optimizations

        // let separationVector = this.separation(neighbors);
        // let alignmentVector = this.alignment(neighbors);
        // let cohesionVector = this.cohesion(neighbors);
        // console.log(separationVector);
        // console.log(alignmentVector);
        // console.log(cohesionVector);

        // this.velocity.add(separationVector);
        // this.velocity.add(alignmentVector);
        // this.velocity.add(cohesionVector);
        // this.velocity.normalize();

        console.log(this.velocity);
        this.position.add(this.velocity);

        if(isNaN(this.velocity.x) || isNaN(this.velocity.y)){
            throw new Error("velocity is NaN");
        }
        if(isNaN(this.position.x) || isNaN(this.position.y)){
            throw new Error("position is a NaN");
        }
        this.orientation = this.velocity.heading();
    }

    // ensures that all boids are visible
    edges(){
        if (this.position.x < -10) {
            this.position.x = windowWidth + 10;
        }
        if (this.position.x > windowWidth + 10) {
            this.position.x = -10;
        }
        if (this.position.y < -10) {
            this.position.y = windowHeight + 10;
        }
        if (this.position.y > windowHeight + 10) {
            this.position.y = -10;
        }
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