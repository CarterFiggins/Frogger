
// set up the games highScores and controls if none are there.
function game(){
    // if no highScores then set up
    if(localStorage.getItem('highScoresFrogger') == null){
        let highScores = [0,0,0,0,0];
        localStorage.setItem('highScoresFrogger', JSON.stringify(highScores));
    }
    // if no custom controls then sets up
    if(localStorage.getItem('controls')== null){
        let controls = {
            up: 'ArrowUp',
            right: 'ArrowRight',
            left: 'ArrowLeft',
            down: 'ArrowDown',
        };
        localStorage.setItem('controls', JSON.stringify(controls));
    }

}

game()