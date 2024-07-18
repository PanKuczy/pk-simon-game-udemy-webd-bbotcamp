// VARIABLES
var buttonColors = ["red", "blue", "green", "yellow"];
var gameState = "start";
var levelCounter = 0;
var randomColorCurrent = "";
var randomColorChain = [];
var playerClickChain = [];
var playerClickCounter = 0;

// EVENT LISTENERS
$(document).on("keydown", function(event){
    if (gameState==="start"){
        gameLevelNew();
    } else if (gameState==="over"){
        randomColorChain = [];
        levelCounter = 0;
        $("body").removeClass("game-over");
        $("h1").text("Level "+ levelCounter);
        gameLevelNew();
    };
});

$(".btn").on("click", function(){
    compareArrays(this.id);
});

//FUNCTIONS
function gameLevelNew(){
    gameState = "level";
    playerClickChain = [];
    playerClickCounter = 0;
    levelCounter++;
    $("h1").text("Level "+ levelCounter);
    randomizeButtons();
}

function gameOver(){
    gameState="over";
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    playSound("wrong");
}

function compareArrays (clickedButton){
    $("#"+clickedButton).addClass("pressed");
    setTimeout(function(){$("#"+clickedButton).removeClass("pressed");},300);
    playSound(clickedButton);
    playerClickChain.push(clickedButton);
    playerClickCounter++;
    if (playerClickChain[playerClickCounter-1] === randomColorChain[playerClickCounter-1] && playerClickCounter === levelCounter){
        setTimeout(function(){
            gameLevelNew();
        },1000);       
    } else if(playerClickChain[playerClickCounter-1] === randomColorChain[playerClickCounter-1]){
    } else {
        gameOver(); 
    }
}

function randomizeButtons (){
    randomColorCurrent = buttonColors[Math.floor(Math.random()*buttonColors.length)];
    $("#"+randomColorCurrent).css("opacity", "0.5");
    setTimeout(function(){$("#"+randomColorCurrent).css("opacity", "1")},300);
    playSound(randomColorCurrent);
    randomColorChain.push(randomColorCurrent);
}

function playSound (name){
    var audioCurrent = new Audio("./sounds/"+name+".mp3");
    audioCurrent.play();
}