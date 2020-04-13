
// Changes the keys used to control Rocket ship


let upKey = false;
let rightKey = false;
let leftKey = false;
let downKey = false;

document.addEventListener('keydown',updateKey);

let controls = JSON.parse(localStorage.getItem('controls'));
document.getElementById('up').innerHTML += "<span class = 'red'> '" +controls.up + "'</span>"; 
document.getElementById('right').innerHTML += "<span class = 'red'> '" + controls.right + "'</span>";
document.getElementById('left').innerHTML += "<span class = 'red'> '" + controls.left + "'</span>";
document.getElementById('down').innerHTML += "<span class = 'red'> '" + controls.down + "'</span>";


function upClick(){
    document.getElementById('newControls').innerHTML = "Enter a key for Up";
    upKey = true;

}
function rightClick(){
    document.getElementById('newControls').innerHTML = "Enter a key for Right";
    rightKey = true;

}
function leftClick(){
    document.getElementById('newControls').innerHTML = "Enter a key for Left";
    leftKey = true;

}
function downClick(){
    document.getElementById('newControls').innerHTML = "Enter a key for Down";
    downKey = true;

}


function updateKey(event){
    if(upKey){
        controls.up = event.key;
        localStorage.setItem("controls", JSON.stringify(controls));
        document.getElementById('newControls').innerHTML = "";
        thurstKey = false;
        document.location.reload();

    }
    if(rightKey){
        controls.right = event.key;
        localStorage.setItem("controls", JSON.stringify(controls));
        document.getElementById('newControls').innerHTML = "";
        rightKey = false;
        document.location.reload();

    }
    if(leftKey){
        controls.left = event.key;
        localStorage.setItem
        localStorage.setItem("controls", JSON.stringify(controls));
        document.getElementById('newControls').innerHTML = "";
        leftKey = false;
        document.location.reload();

    }
    if(downKey){
        controls.down = event.key;
        localStorage.setItem
        localStorage.setItem("controls", JSON.stringify(controls));
        document.getElementById('newControls').innerHTML = "";
        downKey = false;
        document.location.reload();

    }
}
