
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
            // console.log('%d boid\'s start position: %f, %f', i, xPos, yPos);
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
                if(b1 != b2){
                    // non in place version of subtract
                    let dist = p5.Vector.sub(b1.position, b2.position);
                    if(dist < this.neighborRadius){
                        neighbors.push(b2);
                    }
                }
            }
            //perform updates for this specific boid
            //breaking encapsulation...?
            console.log('updating boid %d at %f, %f', i, b1.position.x, b1.position.y);
            b1.update(neighbors);          
        }
    }


    // renders each boid in the flock
    render() {
        this.boids.forEach((b) => { b.render()});
    }
}