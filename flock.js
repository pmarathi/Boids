
// represents a group of boids to render
class Flock {
    
    constructor(numBoids, neighborRadius, width, height){
        this.numBoids = numBoids;
        this.neighborRadius = neighborRadius;
        this.boids = [];
        for(let i = 0; i < numBoids; i++){
            let xPos = Math.random() * width;
            let yPos = Math.random() * height;
            Boid.width = width;
            Boid.height = height;
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
            for(let j = 0; j < this.boids.length; j++){
                let b2 = this.boids[j];
                if(b1 !== b2){
                    let dist = p5.Vector.sub(b1.position, b2.position).mag();
                    if(dist < this.neighborRadius){
                        neighbors.push(b2);
                    }
                }
            }
            //perform updates for this specific boid
            b1.update(neighbors);          
        }
    }

    // renders each boid in the flock
    render(){
        for(let i = 0; i < this.boids.length; i++){
            this.boids[i].render();
        }
    }

    updateCanvasSize(width, height) {
        Boid.width = width;
        Boid.height = height;
    }
}