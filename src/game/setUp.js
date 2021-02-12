MyGame.model.SetUp = function(){

    function makeCars(boxSize, width){
        let cars = []
        for(let i = 0; i < 3; i++){
            let car = MyGame.objects.Car({
                imageSrc: '../images/truck.png',
                center: {x: -100 + i*300, y: boxSize.y*8 + boxSize.y/2},
                size:{width: boxSize.x*2.3, height:boxSize.y},
                speed: .04,
                rotation: 0,
                width: width,
                death: true,
                sprite: false,
            },
            graphics
            )
            cars.push(car)
            car = MyGame.objects.Car({
                imageSrc: '../images/sportsCar.png',
                center: {x: -100 + i*300, y: boxSize.y*9 + boxSize.y/2},
                size:{width: boxSize.x*1.8, height:boxSize.y},
                speed: -.1,
                rotation: Math.PI,
                width: width,
                death: true,
                sprite: false,
            },
            graphics
            )
            cars.push(car)
            car = MyGame.objects.Car({
                imageSrc: '../images/policeCar.png',
                center: {x: -100 + i*300, y: boxSize.y*10 + boxSize.y/2},
                size:{width: boxSize.x*1.8, height:boxSize.y},
                speed: .09,
                rotation: 0,
                width: width,
                death: true,
                sprite: false,
            },
            graphics
            )
            cars.push(car)
            car = MyGame.objects.Car({
                imageSrc: '../images/fireTruck.png',
                center: {x: -100 + i*300, y: boxSize.y*11 + boxSize.y/2},
                size:{width: boxSize.x*2, height:boxSize.y},
                speed: -.05,
                rotation: Math.PI,
                width: width,
                death: true,
                sprite: false,
            },
            graphics
            )
            cars.push(car)
            car = MyGame.objects.Car({
                imageSrc: '../images/smallTruck.png',
                center: {x: 450 + i*300, y: boxSize.y*12 + boxSize.y/2},
                size:{width: boxSize.x*1.8, height:boxSize.y},
                speed: .06,
                rotation: 0,
                width: width,
                death: true,
                sprite: false,
            },
            graphics
            )
            cars.push(car)
        }
        return cars;
    }

    function makeWaterObjects(boxSize, width){
        objects = []
        for(let i = 0; i < 4; i++){
            let object = MyGame.objects.Car({
                imageSrc: '../images/log.png',
                center: {x: -100 + i*width/3, y: boxSize.y*2 + boxSize.y/2},
                size:{width: boxSize.x*3, height:boxSize.y},
                speed: .07,
                rotation: 0,
                width: width,
                death: false,
                sprite: false,
            },
            graphics
            )
            objects.push(object)
            if( i<=1){
                object = MyGame.objects.Car({
                    imageSrc: '../images/bigLog.png',
                    center: {x: 100 + i*width/1.3, y: boxSize.y*4 + boxSize.y/2},
                    size:{width: boxSize.x*5, height:boxSize.y},
                    speed: .06,
                    rotation: 0,
                    width: width,
                    death: false,
                    sprite: false,
                },
                graphics
                )
                objects.push(object)
            }
            object = MyGame.objects.Car({
                imageSrc: '../images/smallLog.png',
                center: {x: -100 + i*width/3, y: boxSize.y*5 + boxSize.y/2},
                size:{width: boxSize.x*2, height:boxSize.y},
                speed: .04,
                rotation: 0,
                width: width,
                death: false,
                sprite: false,
            },
            graphics
            )
            objects.push(object)
            
            let turBotSpeed = -.12
            if(i<=2){
                object = MyGame.objects.Car({
                    imageSrc: '../images/turtle-sprite.png',
                    center: {x: 0 + i*55, y: boxSize.y*6 + boxSize.y/2},
                    size:{width: boxSize.x, height:boxSize.y},
                    speed: turBotSpeed,
                    rotation: Math.PI,
                    width: width,
                    death: false,
                    sprite: true,
                    turtleUnder: false,
                },
                graphics
                )
                objects.push(object)
            }
            if(i<=2){
                object = MyGame.objects.Car({
                    imageSrc: '../images/turtle-sprite.png',
                    center: {x: 400 + i*55, y: boxSize.y*6 + boxSize.y/2},
                    size:{width: boxSize.x, height:boxSize.y},
                    speed: turBotSpeed,
                    rotation: Math.PI,
                    width: width,
                    death: false,
                    sprite: true,
                    turtleUnder: false,
                },
                graphics
                )
                objects.push(object)
            }
            if(i<=2){
                object = MyGame.objects.Car({
                    imageSrc: '../images/turtle-sprite.png',
                    center: {x: 800 + i*55, y: boxSize.y*6 + boxSize.y/2},
                    size:{width: boxSize.x, height:boxSize.y},
                    speed: turBotSpeed,
                    rotation: Math.PI,
                    width: width,
                    death: false,
                    sprite: true,
                    turtleUnder: true,
                },
                graphics
                )
                objects.push(object)
            }
            let turTopSpeed = -.14
            if(i<=1){
                object = MyGame.objects.Car({
                    imageSrc: '../images/turtle-sprite.png',
                    center: {x: 0 + i*55, y: boxSize.y*3 + boxSize.y/2},
                    size:{width: boxSize.x, height:boxSize.y},
                    speed: turTopSpeed,
                    rotation: Math.PI,
                    width: width,
                    death: false,
                    sprite: true,
                    turtleUnder: false,
                },
                graphics
                )
                objects.push(object)
            }
            if(i<=1){
                object = MyGame.objects.Car({
                    imageSrc: '../images/turtle-sprite.png',
                    center: {x: 300 + i*55, y: boxSize.y*3 + boxSize.y/2},
                    size:{width: boxSize.x, height:boxSize.y},
                    speed: turTopSpeed,
                    rotation: Math.PI,
                    width: width,
                    death: false,
                    sprite: true,
                    turtleUnder: true,
                },
                graphics
                )
                objects.push(object)
            }
            if(i<=1){
                object = MyGame.objects.Car({
                    imageSrc: '../images/turtle-sprite.png',
                    center: {x: 600 + i*55, y: boxSize.y*3 + boxSize.y/2},
                    size:{width: boxSize.x, height:boxSize.y},
                    speed: turTopSpeed,
                    rotation: Math.PI,
                    width: width,
                    death: false,
                    sprite: true,
                    turtleUnder: false,
                },
                graphics
                )
                objects.push(object)
            }
            if(i == 0){
                object = MyGame.objects.Car({
                    imageSrc: '../images/alligatorSprite.png',
                    center:{x: 900, y: boxSize.y*3 + boxSize.y/2},
                    size:{width: boxSize.x*3, height:boxSize.y},
                    speed: turTopSpeed,
                    rotation: 0,
                    width: width,
                    death: true,
                    sprite: true,
                    alligator: true,
                })
                objects.push(object)
            }


        }
        return objects;
    }

    function updateHighScores(newScore){
        let highScores = JSON.parse(localStorage.getItem("highScoresFrogger"));
        highScores.push(newScore);
        highScores.sort(function(a,b){return b-a});
        highScores.pop();
        localStorage.setItem("highScoresFrogger", JSON.stringify(highScores));
    }

    api ={
        makeWaterObjects: makeWaterObjects,
        makeCars: makeCars,
        updateHighScores: updateHighScores,
    }
    return api


}