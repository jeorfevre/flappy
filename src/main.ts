
class WorldColumn{
    col:number[]=[0,0,0,0,0,0];
}


/**
   generates a random world
**/
class World{

    constructor(){
        let  yMax:number= 6;
        let world:WorldColumn[]=new WorldColumn[100];  
        let xMax:number = 100;
        let maxTubeSize:number=3;

        let tubeDone:number = 1;

        //gen world column per column
        for( var i = 0; i<xMax; i++){

            var col={};

            if(tubeDone >0 ){
                tubeDone = 0;
                //skip tub generation in case of 
            }
            else{
                let x:number=RND.rndInt(0,yMax-2);
                if(x > 0){

                }
            }
        }

        return world;
    }

}

class RND{
    static rndInt(min: number, max:number) {
            let xmin:number = Math.ceil(min);
            let xmax:number = Math.floor(max);
            return Math.floor(Math.random() * (xmax - xmin)) + xmin;
    }

}

console.log("world",new World());
