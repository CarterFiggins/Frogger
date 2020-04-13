

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
            return;
        }
        checkGameOver(elapsedTime)

        if(!win){
            board.update(elapsedTime);
            player.update(elapsedTime);
            // checkRanOver();
            checkHome(elapsedTime);
            if(player.alive){
                checkLanding();
                // checkBounds();
                checkTimesUp();
            }
            checkWin();
        }
        else{
            winTime += elapsedTime
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
        if(gameOver){
            graphics.drawText("GAME OVER", "Arial", 50, "White")
        }
        else{
            player.render();
        }
        board.renderCars();
        if(win){
            graphics.drawText("Level Completed", "Arial", 50, "White")
            stopTimer = true;
        }


    }

    function checkTimesUp(){
        if(timer < 0){
            player.death();
            timer = startingTime;
        }
    }


    function checkRanOver(){
        for(car of board.cars){
            if(detecting.objectCollision(player.radius, player.center, car.rectangle)){
                player.death()
                timer = startingTime;
            }
        }
    }

    function checkLanding(){
        let hitLanding = false;
        for(object of board.waterObjects){
            if(detecting.objectInsideRect(player.center, object.rectangle)){
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
                timer = startingTime;
            }
        }
        for(lily of board.lilies){
            graphics.drawRectangle(lily.rectangle)
            if(detecting.objectInsideRect(player.center,lily.rectangle) && !lily.reached){
                homeTime += elapsedTime;
                player.stop();
                stopTimer = true;
                if(homeTime> 3000){
                    player.resetPlayer();
                    player.go();
                    board.homeReached(lily.num)
                    score += 50 + Math.floor(timer / 2)
                    homeTime = 0;
                    stopTimer = false;
                    timer = startingTime
                }
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
        score += 1000 + player.lives * 20000
        setUp.updateHighScores(score);
    }

    function checkBounds(){
        if(!detecting.objectInsideRect(player.center, gameRect)){
            player.death();
            timer = startingTime;
        }
        if(detecting.objectInsideRect(player.center, board.waterRectangle)){
            if(!onlog && !player.jumping){
                player.death();
                timer = startingTime;
            }
        }
    }


    // Player control Functions 

    function froggerUp(elapsedTime){
        if(player.alive && !player.stopPlayer){
            player.up(elapsedTime);
        }
    }
    function froggerDown(elapsedTime){
        if(player.alive && !player.stopPlayer){
            player.down(elapsedTime);
        }
    }
    function froggerLeft(elapsedTime){
        if(player.alive && !player.stopPlayer){
            player.left(elapsedTime);
        }
    }
    function froggerRight(elapsedTime){
        if(player.alive && !player.stopPlayer){
            player.right(elapsedTime);
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