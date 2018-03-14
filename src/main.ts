


/**
   generates a random world
**/
class World{
    static TUBE:number=1;
    world:number[][]=new Array();

    /** Generates a random world made of tubes **/
    constructor(){
       
        let yMax:number= 6;
        let xMax:number=100;

        let maxTubeSize:number=3;
        let tubeDone:number = 1;

        //gen world column per column
        for( let i:number = 0; i<xMax; i++){

            let col:number[]=[0,0,0,0,0,0];

            if(tubeDone >0 ){
                tubeDone = 0;
                //skip tub generation in case of 
            }
            else{
                let x:number=RND.rndInt(0,yMax-1);
                if(x > 0){
                    //top and bottom
                    if( x>3 ){

                        let useBottom:number=RND.rndInt(1,x);
                        for(let i:number=0; i< useBottom; i++){
                            col[i]=World.TUBE;
                        } 
                        for(let j:number=0; j< x-useBottom; j++){
                             col[yMax-j-1]=World.TUBE;
                        }
                    }
                    else{
                          let whereToUse:number=RND.rndInt(0,100);
                          if( whereToUse>50){
                               for(let i:number=0; i< x; i++){
                                col[i]=World.TUBE;
                                } 
                          }
                          else{
                               for(let j:number=0; j< x; j++){
                                 col[yMax-j-1]=World.TUBE;
                                }
                          }

                    }
                }

                tubeDone=1;
            }

            //store the tube
            this.world.push(col);
        }

      
    }

}


class Bird{
    x:number=100;
    y:number=100;
}


class Game{
    world:World=new World();
    bird:Bird=new Bird();
    engine:Engine = new Engine();

    run(){
        console.log("Running!");

        this.engine.show(this);
    }



}


/** Engine in order to show the view **/
class Engine{

    //show the game
    show(game:Game){
        let canvas:any = document.getElementById('canvas');
        let ctx:any = canvas.getContext('2d');

        ctx.fillStyle = 'green';
        ctx.fillRect(10, 10, 100, 100);
    }
}



/** randomizer **/
class RND{
    static rndInt(min: number, max:number) {
            let xmin:number = Math.ceil(min);
            let xmax:number = Math.floor(max);
            return Math.floor(Math.random() * (xmax - xmin)) + xmin;
    }

} 



