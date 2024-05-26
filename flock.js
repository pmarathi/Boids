
// represents a group of boids to render
class Flock {
    constructor(numBoids, neighborRadius){
        this.numBoids = numBoids;
        this.neighborRadius = neighborRadius;
        this.boids = [];
        for(let i = 0; i < numBoids; i++){
            let xPos = Math.random() * windowWidth
            let yPos = Math.random() * windowHeight
            let orientation = 2 * PI * Math.random(); // radians for orientation
            this.boids.push(new Boid(xPos, yPos, orientation));
        }
    }

    // changes the position of the boids...?
    // TODO: actually have this update things
    update(){
        for(let i = 0; i < this.boids.length; i++){
            let b1 = this.boids[i];
            //find neighbors of this boid
            let neighbors = [];
            for(let j = 0; j < this.numBoids; j++){
                // if()
            }
        }
    }

    // renders each boid in the flock
    render(){
        for(let i = 0; i < this.boids.length; i++){
            this.boids[i].render();
        }
    }
}