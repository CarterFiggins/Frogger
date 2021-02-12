MyGame.objects.Player = function(spec, graphics){

    let center = spec.center;
    let radius = spec.radius;
    let boxSize = spec.boxSize;
    let rotation = spec.rotation;
    let size = spec.size;
    const lengthOfFrogSprite = 57
    let hold = 0
    let updateTime = 0;
    let count = 0;
    let jumping = false;
    let speed = 45
    let alive = true;
    let waterObjectSpeed = 0.0;
    let jumpSide = false;
    let startCenter = {...center};
    let deadTime = 0;
    let lives = 3;
    let homeTime = 0;
    let stopPlayer = false;

     // making a function to use later.
     // animation for frog jump
     let animation = function (){}

    //death image
    let imageSkull = new Image();
    imageSkull.src = '../images/skull.png'


    // death green chunks
    let particleExplosion = ParticleExplosion(graphics, {
        imageSrc: "../images/chunk.png",
        size: {mean: 15, stdev: 3},
        speed: {mean: .05, stdev: 0.01},
        lifetime: { mean: 900, stdev: 100},
    });


    let startclip = {
        x: 0,
        y: 25,
    }

    let sizeClip = {
        x: 52,
        y: size.height,
    }

    let image = new Image();
    image.src = spec.imageSrc


    function changeSpeed(speed){
        waterObjectSpeed = speed;
    }

    function update(elapsedTime){
        updateTime += elapsedTime;

        if(updateTime >= 1000){
            updateTime -= 1000;
            if(!alive){
                deadTime +=1;
                if(deadTime >= 2){
                    lives -=1;
                    resetPlayer();
                }
            }
        }

        if(alive){
            animation(elapsedTime);
        }
        else{
            particleExplosion.update(elapsedTime);
        }
        if(!jumping || jumpSide){
            center.x += waterObjectSpeed * elapsedTime;
        }
    }

    function render(){
        if(alive){
            graphics.drawSprite(
                image, 
                startclip,
                sizeClip,
                center,
                rotation,
                size
            );
        }
        else{
            graphics.drawTexture(
                imageSkull,
                center,
                0,
                size
            );
            particleExplosion.render();
        }
    }

   

    function resetPlayer(){
        center = {...startCenter};
        alive = true;
        deadTime = 0;
        jumping = false;
        particleExplosion.reset();
        animation = function(){};
        startclip = {
            x: 0,
            y: 25,
        };
    
        sizeClip = {
            x: 52,
            y: size.height,
        };
        rotation = Math.PI;
        count = 0;
        hold = 0;

}

    function frogJump(rotate, centerY, centerX, leftorRight){
        jumpSide = leftorRight;
        if(!jumping){
            rotation = rotate;
            animation = function(elapsedTime){
                hold += elapsedTime;
                if(hold > speed){
                    if( count > 5){
                        count = 0;
                        hold = 0;
                        startclip.x = 0
                        jumping =false
                        animation = function(){};
                    }
                    else{
                        count +=1;
                        center.x += centerX;
                        center.y += centerY;
                        startclip.x += lengthOfFrogSprite;
                        hold -= speed;
                    }
                }
            }
        }
        jumping = true;

    }

    function death(){
        alive = false;
        particleExplosion.fire(center,20);
        console.log("YOU DEAD")
    }

    function up(elapsedTime){
        frogJump(Math.PI, -boxSize.y/6, 0, false)
    }
    function down(elapsedTime){
        frogJump(0, boxSize.y/6, 0,false)
    }
    function right(elapsedTime){
        frogJump(Math.PI + 3/2, 0, boxSize.x/6, true)
    }
    function left(elapsedTime){
        frogJump(Math.PI/2, 0, -boxSize.x/6, true);
    }

    function stop(){
        stopPlayer = true;
    }
    function go(){
        stopPlayer = false;
    }

   

    let api ={
        update: update,
        render: render,
        death, death,
        up: up,
        down: down,
        right: right,
        left: left,
        changeSpeed: changeSpeed,
        resetPlayer: resetPlayer,
        stop: stop,
        go: go,
        get stopPlayer(){return stopPlayer},
        get radius(){return radius},
        get center(){return center},
        get jumping(){return jumping},
        get alive(){return alive},
        get lives(){return lives},
        
    };
    return api;
}