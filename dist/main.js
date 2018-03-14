/**
   generates a random world
**/
class World {
    /** Generates a random world made of tubes **/
    constructor() {
        this.world = new Array();
        let yMax = 6;
        let xMax = 100;
        let maxTubeSize = 3;
        let tubeDone = 1;
        //gen world column per column
        for (let i = 0; i < xMax; i++) {
            let col = [0, 0, 0, 0, 0, 0];
            if (tubeDone > 0) {
                tubeDone = 0;
                //skip tub generation in case of 
            }
            else {
                let x = RND.rndInt(0, yMax - 1);
                if (x > 0) {
                    //top and bottom
                    if (x > 3) {
                        let useBottom = RND.rndInt(1, x);
                        for (let i = 0; i < useBottom; i++) {
                            col[i] = World.TUBE;
                        }
                        for (let j = 0; j < x - useBottom; j++) {
                            col[yMax - j - 1] = World.TUBE;
                        }
                    }
                    else {
                        let whereToUse = RND.rndInt(0, 100);
                        if (whereToUse > 50) {
                            for (let i = 0; i < x; i++) {
                                col[i] = World.TUBE;
                            }
                        }
                        else {
                            for (let j = 0; j < x; j++) {
                                col[yMax - j - 1] = World.TUBE;
                            }
                        }
                    }
                }
                tubeDone = 1;
            }
            //store the tube
            this.world.push(col);
        }
    }
}
World.TUBE = 1;
class Bird {
    constructor() {
        this.x = 100;
        this.y = 100;
    }
}
class Game {
    constructor() {
        this.world = new World();
        this.bird = new Bird();
        this.engine = new Engine();
    }
    run() {
        console.log("Running!");
        this.engine.show(this);
    }
}
/** Engine in order to show the view **/
class Engine {
    //show the game
    show(game) {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = 'green';
        ctx.fillRect(10, 10, 100, 100);
    }
}
/** randomizer **/
class RND {
    static rndInt(min, max) {
        let xmin = Math.ceil(min);
        let xmax = Math.floor(max);
        return Math.floor(Math.random() * (xmax - xmin)) + xmin;
    }
}
//# sourceMappingURL=main.js.map