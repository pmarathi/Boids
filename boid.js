// represents an individual boid
class Boid {
    constructor(xPos, yPos, orientation){
        this.orientation = orientation;
        this.position = createVector(xPos, yPos);
        this.velocity = createVector(Math.sin(orientation), Math.cos(orientation));
        this.range = 10;
    }

    // updates instance variables according to neighbors
    update(neighbors) {
        // let separationVector = this.separation(neighbors);
        // let alignmentVector = this.alignment(neighbors);
        // let cohesionVector = this.cohesion(neighbors);
        let [cohesionVector, alignmentVector, separationVector] = this.generateVectors(neighbors);
        let mouseVector = this.towardsMouse();

        this.velocity.add(separationVector.mult(Boid.separationFactor));        
        this.velocity.add(alignmentVector.mult(Boid.alignmentFactor));        
        this.velocity.add(cohesionVector.mult(Boid.cohesionFactor));
        if(Boid.leftPressed === 1){
            this.velocity.add(mouseVector.mult(Boid.leftPressed));
        }
        else if(Boid.rightPressed === 1){
            this.velocity.sub(mouseVector.mult(Boid.rightPressed));
        }
        this.velocity.normalize();
        this.position.add(this.velocity.mult(Boid.speed));
        this.orientation = this.velocity.heading();
        this.edges();
    }

    generateVectors(neighbors){
        let total = 0;
        let separationVector = createVector(0, 0);
        let averageVelocity = createVector(0, 0);
        let averagePosition = createVector(0, 0);
        for(let i = 0; i < neighbors.length; i++){
            let neighbor = neighbors[i];
            //cohesion
            averagePosition.add(neighbor.position);
            // alignment
            averageVelocity.add(neighbor.velocity);
            // separation calculation
            let diff = p5.Vector.sub(this.position, neighbor.position);
            let distance = diff.mag();
            // temp separation distance
            if(distance > 0){
                diff.normalize().div(distance);
                separationVector.add(diff);
                total += 1
            }
        }
        if(total > 0){
            separationVector.div(total);
            separationVector.mult(10);
        }
        // cohesion
        averagePosition.div(neighbors.length); // Find the average position
        let cohesionVector = p5.Vector.sub(averagePosition, this.position);
        cohesionVector.normalize();
        cohesionVector.div(8);
        //alignment
        averageVelocity.div(neighbors.length);
        let alignmentVector = p5.Vector.sub(averageVelocity, this.velocity);
        alignmentVector = alignmentVector.div(8);
        return [cohesionVector, alignmentVector, separationVector];
    }

    // ensures that all boids are visible
    edges(){
        let boundary = 0;
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
        let mouseVector = createVector(0, 0);
        if(Boid.leftPressed === 1 || Boid.rightPressed === 1){
            mouseVector = createVector(mouseX, mouseY);
            mouseVector.sub(this.position).div(100);
        }
        return mouseVector;
    }

    

    //used by sketch.js to render each individual boid
    render(){
        push();
        translate(this.position.x, this.position.y);
        rotate(this.orientation);
        let speed = this.velocity.mag();
        fill(0, 0, 0);
        stroke(144, 238, 144);
        triangle(10, 0, -10, -7, -10, 7);
        pop();
    }
}