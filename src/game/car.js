MyGame.objects.Car = function(spec, graphics){
    let image = new Image();
    image.src = spec.imageSrc;

    let holdImage = image;

    let underSprite = new Image();
    underSprite.src = '../images/turtle-under-sprite.png';
    
    let center = spec.center;
    let size = spec.size;
    let rectangle = {
        center: spec.center,
        size:{x: size.width, y: size.height},
        fill: 'green'
    }
    let speed = spec.speed;
    let rotation = spec.rotation;
    let width = spec.width;
    let death = spec.death;
    let sprite = spec.sprite;
    let turtleUnder = spec.turtleUnder;
    let animationSpeed = 100;
    let gatorAnimationSpeed = 1000;
    let count = 0;
    let hold = 0;
    let reverse = false;
    let alligator = spec.alligator
    let gatorHold = 0;
    let switchGator = false;
    let startClip = {}
    let sizeClip = {}
    let underCounter = 0;
    if(alligator){
        startClip = {
            x:0,
            y:0,
        }
        sizeClip = {
            x:94,
            y:35,
        }
    }
    else{
        startClip = {
            x:0,
            y:0,
        }
        sizeClip = {
            x:75,
            y:70
        }
    }


    
    let start = -150;

    function update(elapsedTime){
        center.x += speed * elapsedTime;
        if(!(center.x < width + 250 && center.x > -150 )){
            reset()
        }
        if(alligator){
            updateAlligator(elapsedTime);
        }
        else{
            updateTurtle(elapsedTime);
        }
        

    }

    function updateAlligator(elapsedTime){
        gatorHold += elapsedTime
        if(gatorHold > gatorAnimationSpeed){
            switchGator = !switchGator
            if(switchGator){
                startClip.y = 35;
            }
            else{
                startClip.y = 0;
            }
            gatorHold -= gatorAnimationSpeed
        }
    }

    function updateTurtle(elapsedTime){
        hold += elapsedTime;
        if(hold > animationSpeed){
            underCounter +=1;
            if(underCounter > 20 && turtleUnder){
                image = underSprite;
                hold -= 250
                if(underCounter > 23){
                    
                    death = false;
                    
                    startClip.x -= sizeClip.x-10;
                    
                    if(underCounter > 26){
                        startClip.x = 0;
                        underCounter = 0;
                        image = holdImage
                        death = false;
                        
                    }
                }
                else{
                    if(underCounter == 23){
                        death = true;
                    }
                    startClip.x += sizeClip.x-10 ;
                }
            }
            else{
                if(reverse){
                    if(count < 1){
                        reverse = false;
                    }
                    else{
                        count -= 1;
                        startClip.x -= sizeClip.x-1;
                        hold -= animationSpeed;
                    }
                }
                else{
                    if(count > 3 ){
                        reverse = true
                    }
                    else{
                        count += 1;
                        startClip.x += sizeClip.x-1;
                        hold -= animationSpeed;
                    }
                }
            }
        }
    }

    function render(){
        // makes a green rectangle around objects
        // MyGame.graphics.drawRectangle(rectangle)
        if(sprite){
            if(alligator){
                MyGame.graphics.drawSprite(
                    image,
                    startClip,
                    sizeClip,
                    center,
                    rotation,
                    size
                )
            }
            else{
                renderTurtle();
            }
        }
        else{
            graphics.drawTexture(image, center, rotation, size)
        }
    }

    function renderTurtle(){
        graphics.drawSprite(
            image,
            startClip,
            sizeClip,
            center,
            rotation,
            size
        )
    }

    function reset(){
        if(speed > 0){
            center.x = start;
        }
        else{
            center.x = width + 150
        }
    }



    let api = {
        update: update,
        render: render,
        reset: reset,
        get rectangle(){return rectangle},
        get center(){return center},
        get death(){return death},
        get speed(){return speed},
        
    }
    return api
}