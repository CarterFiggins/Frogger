
MyGame.model.Board = function (graphics, setUp){
    let canvas = document.getElementById('id-canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;
    let numberOfLanes = 15;
    let numberOfBoxes = 15;
    let cars = [];
    let bushes = [];
    let lilies = [];
    let firstLoop = false;
    let frogAtHome= [];

    let centerTime ={
        x:790,
        y:675,
    }
    let sizeTime ={
        x:175,
        y:10,
    }
    
    let bush = new Image();
    bush.src = "../images/bush.png"

    let bushLily = new Image();
    bushLily.src = "../images/bushLily.png"

    let littleFrog = new Image();
    littleFrog.src = "../images/frog.png"

    let boxSize = {
        x : width / numberOfBoxes,
        y : height / numberOfLanes,
    }
    let waterRectangle = {
        center: {
            x: width/2,
            y:  boxSize.y * 2 +((boxSize.y*5)/2),
        },
        size:{
            x: width,
            y: boxSize.y*5,
        }
    }
    
    cars = setUp.makeCars(boxSize, width)
    waterObjects = setUp.makeWaterObjects(boxSize, width)


    function update(elapsedTime){
        for(car of cars){
            car.update(elapsedTime);
        }
        for( object of waterObjects){
            object.update(elapsedTime)
        }
    }

    function renderBoard(timer, score){
        makeBoard();
        for( object of waterObjects){
            object.render();
        }
        renderFrogAtHome();
        renderTimer(timer);
        renderScore(score);
    }
    function renderCars(){
        for(car of cars){
            car.render();
        }

    }

    function makeBoard(){

        roadColor = 'rgb(50, 50, 50)';
        grassColor = '#9B7653';
        waterColor = '#33FFCC';

        makeLanes(roadColor, 5, 8);
        makeLanes(grassColor, 1, 13);
        makeLanes(grassColor, 1, 7);
        makeLanes(waterColor,6, 1);
        makeHomes();
    }

    function renderFrogAtHome(){
        for(frog of frogAtHome){
            graphics.drawTexture(
                frog.image,
                frog.center,
                frog.rotation,
                frog.size
            )
        }
    }

    function makeLanes(color, numSize, location){
        start = {
            x: 0,
            y: boxSize.y * location,
        };
        lengthBox = start.y+(boxSize.y*numSize);
        
        context.fillStyle = color;
        context.strokeStyle = color;
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(width, start.y);
        context.lineTo(width, lengthBox);
        context.lineTo(start.x, lengthBox);
        context.closePath();
        context.fill();
    }

    function makeHomes(){
        center ={
            x:boxSize.x/2,
            y:boxSize.y/2 + boxSize.y,
        }

        sizeBush ={
            width: boxSize.x+2,
            height: boxSize.y+2,
        }
        sizeHome ={
            width: boxSize.x+4,
            height: boxSize.y+4,
        }

        for(let i=0; i<numberOfBoxes; i++){
            if(i == 1 || i == 4 || i == 7 || i == 10 || i == 13){
                graphics.drawTexture(bushLily, center, 0, sizeHome);   
                if(!firstLoop){
                    lilies.push({
                        size: sizeHome,
                        center: {...center},
                        num: i,
                        reached: false,
                        rectangle: {
                            center: {...center},
                            size:{x: sizeHome.width, y: sizeHome.height}
                        }
                    })
                }
            }
            else{
                graphics.drawTexture(bush, center, 0, sizeBush);
                if(!firstLoop){
                    bushes.push({
                        size: sizeBush,
                        rectangle: {
                            center: {...center},
                            size:{x: sizeHome.width, y: sizeHome.height}
                        }
                    })
                }
            }
            center.x += boxSize.x;

        }
        firstLoop = true;
        center.x = boxSize.x/2
    }

    function renderLifes(lives){
        centerLife ={
            x: boxSize.x/2,
            y: boxSize.y * 14 + boxSize.y/2,
        }
        sizeLife ={
            width: boxSize.x - 20,
            height: boxSize.y -20
        }
        for( let i=0; i<lives; i++){
            graphics.drawTexture(littleFrog,centerLife ,Math.PI, sizeLife)
            centerLife.x += boxSize.x;
        }   
    }

    function renderTimer(time){
        center = {...centerTime}
        size = {...sizeTime}

        size.x  = time * 3
        center.x -= time * 1.5
        
        graphics.drawText(`Time: ${time}`, 'Arial', 25, 'white', 490, 685)
        graphics.drawRectangle({
            center,
            size,
            stroke: 'green',
            fill: 'green',
        })
    }

    function renderScore(score){
        graphics.drawText(`Score: ${score}`, 'Arial', 25, 'white', 50, 25)
    }

    function homeReached(num){
        lilypad = {}
        for(lily of lilies){
            if(lily.num === num){
                lilypad = {...lily}
                lily.reached = true;
            }
        }

        frogAtHome.push({
            image: littleFrog,
            center: {...lilypad.center},
            rotation: 0,
            size: {
                width: lily.size.width/1.5,
                height: lily.size.height/1.5,
            },
            })
        
    }

    

    api ={
        update: update,
        renderBoard: renderBoard,
        renderCars: renderCars,
        homeReached: homeReached,
        renderLifes: renderLifes,
        get waterRectangle(){return waterRectangle},
        get boxSize(){return boxSize},
        get center(){return center},
        get cars(){return cars},
        get waterObjects(){return waterObjects},
        get lilies(){return lilies},
        get bushes(){return bushes},
    }

    return api

}