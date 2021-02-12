

MyGame.model.Game = function (input, objects, graphics, setUp){

    let myKeyboard = input.Keyboard();
    let board = MyGame.model.Board(graphics, setUp);
    let win = false;
    let gameOver = false;
    let startingTime = 60
    let timer = startingTime;
    let holdTime = 0;
    let homeTime = 0;
    let winTime = 0;
    let score = 0;
    let stopTimer = false;
    let flyTime = 0
    let lilyLocation = [1,4,7,10,13]
    let randomHome = lilyLocation[Math.floor(Math.random() * (lilyLocation.length-1))];

    let flyImage = new Image;
    flyImage.src = '../images/fly.png'

    let gatorImage = new Image;
    gatorImage.src = '../images/alligatorhead.png'

    let particleExplosion = ParticleExplosion(graphics, {
        imageSrc: "../images/win.png",
        size: {mean: 15, stdev: 3},
        speed: {mean: .05, stdev: 0.01},
        lifetime: { mean: 900, stdev: 100},
    });

    let hop = new Audio();
    hop.src = "../sounds/hop.mp3"
    let smashedSound = new Audio();
    smashedSound.src = "../sounds/smashed.mp3"
    let winSound = new Audio();
    winSound.src = "../sounds/win.mp3"
    let backgroundSound = new Audio();
    backgroundSound.src = "../sounds/backgroundSound.mp3"
    backgroundSound.volume = .5;
    let gameWon = new Audio();
    gameWon.src = "../sounds/gameWon.mp3"
    let loserSound = new Audio();
    loserSound.src = "../sounds/loserSound.mp3"


    

    let playerLocation ={
        x: 7 * board.boxSize.x + board.boxSize.x/2,
        y: 14 * board.boxSize.y -  board.boxSize.y/2,
    }

    let gameRect={
        center:{
            x: graphics.width/2,
            y: graphics.height/2,
        },
        size:{
            x: graphics.width,
            y: graphics.height-50,
        }
    }
    let onlog = false;
    let detecting = MyGame.model.Collision();

    // registering controls
    controls = JSON.parse(localStorage.getItem("controls"));
    myKeyboard.register(controls.up, froggerUp);
    myKeyboard.register(controls.down, froggerDown);
    myKeyboard.register(controls.left, froggerLeft);
    myKeyboard.register(controls.right, froggerRight);


    let player = objects.Player({
        imageSrc: '../images/frog-sprites.png',
        center: playerLocation,
        size:{width: board.boxSize.x -10, height:50},
        radius: 20,
        boxSize: board.boxSize,
        rotation: Math.PI,

    },
    graphics
    )
    
    let pointLine = player.center.y - board.boxSize.y +10;
    let resetpointLine = player.center.y - board.boxSize.y +10;
    
    function processInput(elapsedTime){
        myKeyboard.update(elapsedTime);
    }
    
    function update(elapsedTime){
        holdTime += elapsedTime
        if(holdTime >= 1000){
            if(player.alive && !gameOver && !stopTimer){
                timer -=1;
            }
            holdTime -= 1000;
        }

        if(gameOver){
            winTime += elapsedTime;
            backgroundSound.pause();
            if(winTime> 4000){
                setUp.updateHighScores(score);
                window.location.href = "../Pages/highScores.html"
            }
            return
        }
        checkGameOver(elapsedTime)
        particleExplosion.update(elapsedTime);
        if(!win){
            board.update(elapsedTime);
            player.update(elapsedTime);
            checkRanOver();
            checkHome(elapsedTime);
            if(player.alive){
                checkLanding();
                checkBounds();
                checkTimesUp();
            }
            checkWin();
            pointLineCheck();
            
        }
        else{
            winTime += elapsedTime;
            if(winTime > 4000){
                window.location.href = "../Pages/highScores.html"
            }
        }

    }

    function render(){
        graphics.clear();
        graphics.stroke();
        board.renderLifes(player.lives);
        board.renderBoard(timer, score);
        renderHomeVisits();
        particleExplosion.render();
        if(gameOver){
            loserSound.play();
            graphics.drawText("GAME OVER", "Arial", 50, "White")
        }
        else{
            player.render();
        }
        board.renderCars();
        if(win){
            backgroundSound.pause();
            gameWon.play();
            graphics.drawText("Level Completed", "Arial", 50, "White")
            stopTimer = true;
        }

    }

    function checkTimesUp(){
        if(timer < 0){
            player.death();
            smashedSound.play();
            timer = startingTime;
            pointLine = resetpointLine

        }
    }

    function pointLineCheck(){
        if(pointLine >player.center.y){
            if(player.alive){
                pointLine -= board.boxSize.y;
                score += 10
            }
            
        }
    }


    function checkRanOver(){
        for(car of board.cars){
            if(detecting.objectCollision(player.radius, player.center, car.rectangle)){
                player.death()
                smashedSound.play();
                timer = startingTime;
                pointLine = resetpointLine

            }
        }
    }

    function checkLanding(){
        let hitLanding = false;
        for(object of board.waterObjects){
            if(detecting.objectInsideRect(player.center, object.rectangle)){
                if(object.death)
                {
                    player.death()
                    smashedSound.play();
                }
                player.changeSpeed(object.speed);
                hitLanding = true;
                onlog = true;
            }
            
        }
        if(!hitLanding){
            onlog = false;
            player.changeSpeed(0);
        }
    }

    function checkHome(elapsedTime){
        for(bush of board.bushes){
            if(detecting.objectInsideRect(player.center,bush.rectangle)){
                player.death();
                smashedSound.play();
                timer = startingTime;
                pointLine = resetpointLine

            }
        }
        if(!player.stopPlayer){
            flyTime += elapsedTime;
        }
        if(flyTime > 5000){
            board.setUpFly(randomHome, true)
            if(flyTime > 8000){
                board.setUpFly(randomHome, false)
                index = Math.floor(Math.random() * (lilyLocation.length -1))
                randomHome = lilyLocation[index];
                flyTime -= 8000;
            }
        }
        

        for(lily of board.lilies){
            graphics.drawRectangle(lily.rectangle)
            if(detecting.objectInsideRect(player.center,lily.rectangle) && !lily.reached){
                homeTime += elapsedTime;
                stopTimer = true;
                player.stop();
                if(lily.alligator){
                    player.death()
                    smashedSound.play();
                    player.go();
                    homeTime = 0;
                    stopTimer = false;
                    timer = startingTime
                    pointLine = resetpointLine;
                    return;
                }
                else{
                    backgroundSound.volume = 0.2;
                    if(homeTime>500){
                        particleExplosion.fire(player.center, 50)
                        winSound.play();
                    }
                    if(homeTime> 2000){
                        backgroundSound.volume = .5;
                        player.resetPlayer();
                        particleExplosion.reset()
                        score += board.homeReached(lily.num)
                        spliceLilyList(lily.num);
                        score += 50 + Math.floor(timer / 2)
                        homeTime = 0;
                        stopTimer = false;
                        timer = startingTime
                        pointLine = resetpointLine;
                        player.go();
                    }
                }
            }
        }
    }

    function spliceLilyList(num){
        let index = lilyLocation.indexOf(num)
        if(index > -1){
            lilyLocation.splice(index,1);
        }
    }

    function renderHomeVisits(){
        for(lily of board.lilies){
            if(lily.fly){
                let size={
                    width: lily.size.width/2,
                    height: lily.size.height/2,
                }
                graphics.drawTexture(
                    flyImage,
                    lily.center,
                    0,
                    size
                )
            }
            if(lily.alligator){
                let size={
                    width: lily.size.width/1.5,
                    height: lily.size.height/1.5,
                }
                graphics.drawTexture(
                    gatorImage,
                    lily.center,
                    0,
                    size
                )
            }
        }
    }

    function checkGameOver(){
        if(player.lives<0){
            gameOver = true;
        }
    }

    function checkWin(){
        if(board.lilies.length == 0){
            return
        }
        for(lily of board.lilies){
            if(!lily.reached){
                return;
            }
        }
        win = true;
        score += 1000 + player.lives * 2000
        setUp.updateHighScores(score);
    }

    function checkBounds(){
        if(!detecting.objectInsideRect(player.center, gameRect)){
            player.death();
            smashedSound.play();
            timer = startingTime;
            pointLine = resetpointLine

        }
        if(detecting.objectInsideRect(player.center, board.waterRectangle)){
            if(!onlog && !player.jumping){
                player.death();
                smashedSound.play();
                timer = startingTime;
                pointLine = resetpointLine

            }
        }
    }


    // Player control Functions 

    function froggerUp(elapsedTime){
        if(player.alive && !player.stopPlayer){
            player.up(elapsedTime);
            hop.play();
        }
        backgroundSound.play();
    }
    function froggerDown(elapsedTime){
        if(player.alive && !player.stopPlayer){
            player.down(elapsedTime);
            hop.play();
        }
    }
    function froggerLeft(elapsedTime){
        if(player.alive && !player.stopPlayer){
            player.left(elapsedTime);
            hop.play();
        }
    }
    function froggerRight(elapsedTime){
        if(player.alive && !player.stopPlayer){
            player.right(elapsedTime);
            hop.play();
        }
    }

   

    let api = {
        processInput: processInput,
        froggerUp : froggerUp,
        froggerDown: froggerDown,
        froggerLeft: froggerLeft,
        froggerRight: froggerRight,
        update: update,
        render: render,
    }
    return api;
}