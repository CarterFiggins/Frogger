
// gets scores from browses localStorage.

highScores = JSON.parse(localStorage.getItem('highScoresFrogger'));
for(let i in highScores){
    document.getElementById('' + i).innerHTML += highScores[i];
}

