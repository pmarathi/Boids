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
    
    // if two boids get too close together we want them to fly apart
    separation(neighbors){
        let separationVector = createVector(0, 0);
        for(let i = 0; i < neighbors.length; i++){
            let neighbor = neighbors[i];
            separationVector.add(this.position.sub(neighbor));
        }
        separationVector.normalize();
        return separationVector;
    }

    // boids match angle of nearby boids
    alignment(neighbors){
        let alignmentVector = createVector(0, 0);
        for(let i = 0; i < neighbors.length; i++){
            let neighbor = neighbors[i];
            alignmentVector.add(neighbor.velocity);
        }
        alignmentVector.normalize();
        return alignmentVector;
    }

    // every bird attempts to move towards the center
    cohesion(neighbors){
        let averagePosition = createVector(0, 0);
        for(let i = 0; i < neighbors.length; i++){
            let neighbor = neighbors[i];
            averagePosition.add(neighbor.position);
        }
        // need to avoid divide by zero here
        // averagePosition.div(neighbors.length);
        let cohesionVector = this.position.sub(averagePosition);
        return cohesionVector;
    }

    //used by sketch.js to render each individual boid
    render() {
        push()
        translate(this.position.x, this.position.y)
        rotate(this.orientation)
        fill(255, 255, 255)
        triangle(10, 0, -10, -7, -10, 7)
        pop()
    }
}