


/** randomizer **/
class RND{
    static rndInt(min: number, max:number) {
            let xmin:number = Math.ceil(min);
            let xmax:number = Math.floor(max);
            return Math.floor(Math.random() * (xmax - xmin)) + xmin;
    }

} 

/**
   generates a random world
**/
class World{
    static TUBE:number=1;
    world:number[][]=new Array();

    /** Generates a random world made of tubes **/
    constructor(){
        console.log("World gen in progress");
       
        let yMax:number= 6;
        let xMax:number=1000;
        let maxTubeSize:number=3;
        let tubeDone:number = 1;

        //insert 3 empty columns
        for(let i:number= 0; i<3;i++){
           let col:number[]=[0,0,0,0,0,0];
           this.world.push(col);
        }

        //gen world column per column
        for( let i:number = 0; i<xMax; i++){

            let col:number[]=[0,0,0,0,0,0];

           
            if( tubeDone==0){
            
                let x:number=RND.rndInt(0,yMax);
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

                tubeDone++;
            }
            else {
              tubeDone++;

            }
            if(tubeDone == 3){
              tubeDone=0;
            }

            //store the tube
            this.world.push(col);
        }

         console.log("World gen done");

      
    }

}

class Bird{
    x:number=200;
    posScreenX:number=50;
    y:number=300;

    update(){
        //update current x position
        this.x+=2;
    }
}

/** Engine in order to show the view **/
class Engine{

    //show the game
    draw(){
        let canvas:any = document.getElementById('canvas');
        let ctx:any = canvas.getContext('2d');
        let posX:number=0;
        let posY:number=0;

        let newBloc:number =0;
        if(Game.bird.x>100){
            newBloc=Game.bird.x/100;
            newBloc=Math.trunc(newBloc);
        }
       
        let newMaxbloc:number=(Game.bird.x-80+12*100)/100;
        newMaxbloc=Math.trunc(newMaxbloc);
        let offsetX:number = Game.bird.x%100;     //offset in order to scroll
        
        for(let x:number= newBloc; x<(newMaxbloc);x++){
            posY=0;
            for(let y:number=0; y<6; y++){

               ////console.log("show",x,y);
               let r:number= Game.world.world[x][y];
               if(r==World.TUBE) {
                   this.showPipe(ctx,posX,posY,offsetX);
                   //console.log("tube",x,y);
               }
               else{
                     this.showEmpy(ctx,posX,posY,offsetX);
                    //console.log("empy",x,y);
               }
               posY++;
            }
            posX++;

        }

       this.drawBird(ctx);


    }

     drawBird(ctx:any){
         ctx.fillStyle = 'red';
         ctx.fillRect(Game.bird.posScreenX, Game.bird.y, 50, 50);
     }

    showPipe(ctx:any,x:number,y:number, offsetX:number){       
        ctx.fillStyle = 'green';
        ctx.fillRect(x*100-offsetX, (6-y)*100, 100, 100);
    }

   showEmpy(ctx:any,x:number,y:number, offsetX:number){     
      
        ctx.fillStyle = 'grey';
        ctx.fillRect(x*100-offsetX, (6-y)*100, 100, 100);
    }
}



class Game{
    static world:World=new World();
    static bird:Bird=new Bird();
    static engine:Engine = new Engine();

   constructor(){
     document.onkeydown = function (e) {
        switch (e.key) {
            case 'ArrowUp':
                Game.bird.y-=12;
                break;
            case 'ArrowDown':
                 Game.bird.y+=12  ;
                break;
            case 'ArrowLeft':
                // left arrow
                break;
            case 'ArrowRight':
                // right arrow
        }
    };
  }
  


    run=()=>{


       
        this.update();      
        Game.engine.draw();
        requestAnimationFrame(this.run);    
    }

    //update position of objects
    update(){
       Game.bird.update();
    }


}







