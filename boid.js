// represents an individual boid
class Boid {
    constructor(xPos, yPos, orientation){
        this.orientation = orientation;
        this.position = createVector(xPos, yPos);
        this.velocity = createVector(Math.sin(orientation), Math.cos(orientation));
    }

    // updates instance variables according to neighbors
    update(neighbors) {
        this.edges();
        //TODO: implement coefficients for each of these
        //TODO: redundancy and efficiency optimizations
        let separationVector = this.separation(neighbors);
        let alignmentVector = this.alignment(neighbors);
        let cohesionVector = this.cohesion(neighbors);
        let mouseVector = this.towardsMouse();

        this.velocity.add(separationVector.mult(Boid.separationFactor));        
        this.velocity.add(alignmentVector.mult(Boid.alignmentFactor));        
        this.velocity.add(cohesionVector.mult(Boid.cohesionFactor));
        if(Boid.leftPressed){
            this.velocity.add(mouseVector.mult(Boid.leftPressed));
        }
        if(Boid.rightPressed){
            this.velocity.sub(mouseVector.mult(Boid.rightPressed));
        }
        this.velocity.normalize();

        this.position.add(this.velocity.mult(Boid.speed));

        if(isNaN(this.velocity.x) || isNaN(this.velocity.y)){
            throw new Error("velocity is NaN");
        }
        if(isNaN(this.position.x) || isNaN(this.position.y)){
            throw new Error("position is a NaN");
        }
        this.orientation = this.velocity.heading();
    }

    // boids try not to run into each other
    separation(neighbors){
        let separationVector = createVector(0, 0);
        for(let i = 0; i < neighbors.length; i++){
            let neighbor = neighbors[i];
            separationVector.add(p5.Vector.sub(this.position, neighbor.position));
        }
        separationVector.normalize();
        return separationVector;
    }

    // boids attempt to go towards the average position
    cohesion(neighbors){
        let averagePosition = createVector(0, 0);
        if(neighbors.length == 0){
            return averagePosition;
        }
        for(let i = 0; i < neighbors.length; i++){
            let neighbor = neighbors[i];
            averagePosition.add(neighbor.position);
        }
        let cohesionVector = p5.Vector.sub(averagePosition, this.position);
        cohesionVector.normalize();
        return cohesionVector;
    }

    // creates the alignment vector making close boids face similar directions
    alignment(neighbors){
        let alignmentVector = createVector(0, 0);
        for(let i = 0; i < neighbors.length; i++){
            let neighbor = neighbors[i];
            alignmentVector.add(neighbor.velocity);
        }
        alignmentVector.normalize();
        return alignmentVector;
    }

    // ensures that all boids are visible
    edges(){
        let boundary = 10;
        if (this.position.x < -boundary) {
            this.position.x = Boid.width + boundary;
        }
        if (this.position.x > Boid.width + boundary) {
            this.position.x = -boundary;
        }
        if (this.position.y < -boundary) {
            this.position.y = Boid.height + boundary;
        }
        if (this.position.y > Boid.height + boundary) {
            this.position.y = -boundary;
        }
    }

    towardsMouse(){
        let mouseVector = createVector(mouseX, mouseY);
        mouseVector.sub(this.position).div(100);
        return mouseVector;
    }

    

    //used by sketch.js to render each individual boid
    render(){
        push();
        translate(this.position.x, this.position.y);
        rotate(this.orientation);
        let speed = this.velocity.mag();
        fill(255, 255, 255);
        triangle(10, 0, -10, -7, -10, 7);
        pop();
    }
}