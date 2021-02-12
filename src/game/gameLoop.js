
// Start of Game Loop
// Main Game Function.

let lastTimeStamp = performance.now();
let graphics = MyGame.graphics;
let setUp = MyGame.model.SetUp();
let game = MyGame.model.Game(MyGame.input, MyGame.objects, graphics, setUp);

function processInput(elapsedTime) {
    game.processInput(elapsedTime);
}

function update(elapsedTime) {
    game.update(elapsedTime)
}

function render() {
    game.render()    
}

function gameLoop(time) {
    let elapsedTime = time - lastTimeStamp;
    lastTimeStamp = time;

    processInput(elapsedTime);
    update(elapsedTime);
    render();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop)