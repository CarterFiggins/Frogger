MyGame.objects.Turtles = function(spec, graphics){
    
    let image = new Image();
    image.src = spec.imageSrc;

    let center = spec.center;
    let size = spec.size;
    let rectangle = {
        center: spec.center,
        size:{x: size.width, y: size.height}
    };
    let speed = spec.speed;
    let rotation = spec.rotation;
    let width = spec.width;
    let death = spec.death;

    function update(elapsedTime){
        center.x += speed * elapsedTime
        if(!(center.x < width + 250 && center.x > -150 )){
            reset()
        }
    }

    function render(){
        graphics.drawSprite(
            image, 
            startclip,
            sizeClip,
            center,
            rotation,
            size
        )
    }

    let api = {
        update: update,
        render: render,
    }
    return api


}