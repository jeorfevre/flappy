/** randomizer **/
class RND {
    static rndInt(min, max) {
        let xmin = Math.ceil(min);
        let xmax = Math.floor(max);
        return Math.floor(Math.random() * (xmax - xmin)) + xmin;
    }
}
/**
   generates a random world
**/
class World {
    /** Generates a random world made of tubes **/
    constructor() {
        this.world = new Array();
        console.log("World gen in progress");
        let yMax = 6;
        let xMax = 1000;
        let maxTubeSize = 3;
        let tubeDone = 1;
        //insert 3 empty columns
        for (let i = 0; i < 3; i++) {
            let col = [0, 0, 0, 0, 0, 0];
            this.world.push(col);
        }
        //gen world column per column
        for (let i = 0; i < xMax; i++) {
            let col = [0, 0, 0, 0, 0, 0];
            if (tubeDone == 0) {
                let x = RND.rndInt(0, yMax);
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
                tubeDone++;
            }
            else {
                tubeDone++;
            }
            if (tubeDone == 3) {
                tubeDone = 0;
            }
            //store the tube
            this.world.push(col);
        }
        console.log("World gen done");
    }
}
World.TUBE = 1;
class Bird {
    constructor() {
        this.x = 200;
        this.posScreenX = 50;
        this.y = 300;
    }
    update() {
        //update current x position
        this.x += 2;
    }
}
/** Engine in order to show the view **/
class Engine {
    //show the game
    draw() {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        let posX = 0;
        let posY = 0;
        let newBloc = 0;
        if (Game.bird.x > 100) {
            newBloc = Game.bird.x / 100;
            newBloc = Math.trunc(newBloc);
        }
        let newMaxbloc = (Game.bird.x - 80 + 12 * 100) / 100;
        newMaxbloc = Math.trunc(newMaxbloc);
        let offsetX = Game.bird.x % 100; //offset in order to scroll
        for (let x = newBloc; x < (newMaxbloc); x++) {
            posY = 0;
            for (let y = 0; y < 6; y++) {
                ////console.log("show",x,y);
                let r = Game.world.world[x][y];
                if (r == World.TUBE) {
                    this.showPipe(ctx, posX, posY, offsetX);
                    //console.log("tube",x,y);
                }
                else {
                    this.showEmpy(ctx, posX, posY, offsetX);
                    //console.log("empy",x,y);
                }
                posY++;
            }
            posX++;
        }
        this.drawBird(ctx);
    }
    drawBird(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(Game.bird.posScreenX, Game.bird.y, 50, 50);
    }
    showPipe(ctx, x, y, offsetX) {
        ctx.fillStyle = 'green';
        ctx.fillRect(x * 100 - offsetX, (6 - y) * 100, 100, 100);
    }
    showEmpy(ctx, x, y, offsetX) {
        ctx.fillStyle = 'grey';
        ctx.fillRect(x * 100 - offsetX, (6 - y) * 100, 100, 100);
    }
}
class Game {
    constructor() {
        this.run = () => {
            this.update();
            Game.engine.draw();
            requestAnimationFrame(this.run);
        };
        document.onkeydown = function (e) {
            switch (e.key) {
                case 'ArrowUp':
                    Game.bird.y -= 12;
                    break;
                case 'ArrowDown':
                    Game.bird.y += 12;
                    break;
                case 'ArrowLeft':
                    // left arrow
                    break;
                case 'ArrowRight':
            }
        };
    }
    //update position of objects
    update() {
        Game.bird.update();
    }
}
Game.world = new World();
Game.bird = new Bird();
Game.engine = new Engine();
//# sourceMappingURL=main.js.map