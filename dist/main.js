class WorldColumn {
    constructor() {
        this.col = [0, 0, 0, 0, 0, 0];
    }
}
/**
   generates a random world
**/
class World {
    constructor() {
        let yMax = 6;
        let world = new WorldColumn[100];
        let xMax = 100;
        let maxTubeSize = 3;
        let tubeDone = 1;
        //gen world column per column
        for (var i = 0; i < xMax; i++) {
            var col = {};
            if (tubeDone > 0) {
                tubeDone = 0;
                //skip tub generation in case of 
            }
            else {
                let x = RND.rndInt(0, yMax - 2);
                if (x > 0) {
                }
            }
        }
        return world;
    }
}
class RND {
    static rndInt(min, max) {
        let xmin = Math.ceil(min);
        let xmax = Math.floor(max);
        return Math.floor(Math.random() * (xmax - xmin)) + xmin;
    }
}
console.log("world", new World());
//# sourceMappingURL=main.js.map