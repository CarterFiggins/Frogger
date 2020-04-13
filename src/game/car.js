MyGame.objects.Car = function(spec, graphics){

    let image = new Image();
    image.src = spec.imageSrc;
    
    let center = spec.center;
    let size = spec.size;
    let rectangle = {
        center: spec.center,
        size:{x: size.width, y: size.height}
    }
    let speed = spec.speed;
    let rotation = spec.rotation;
    let width = spec.width;
    let death = spec.death;
    let sprite = spec.sprite;
    let turtleUnder = spec.turtleUnder;
    let animationSpeed = 100;
    let count = 0;
    let hold = 0;
    let reverse = false;

    let startClip = {
        x:0,
        y:0,
    }
    let sizeClip = {
        x:75,
        y:70
    }

    
    let start = -150;

    function update(elapsedTime){
        center.x += speed * elapsedTime;
        if(!(center.x < width + 250 && center.x > -150 )){
            reset()
        }
        hold += elapsedTime;
        if(hold > animationSpeed){
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

    function render(){
        // makes a green rectangle around objects
        // graphics.drawRectangle(rectangle)
        if(sprite){
            graphics.drawSprite(
                image,
                startClip,
                sizeClip,
                center,
                rotation,
                size
            )
        }
        else{
            graphics.drawTexture(image, center, rotation, size)
        }
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