
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level =  0;

$("#enter").on("click",function (){
    if(!started){
        $("#level-title").text("Level " + level);
        $("#enter").hide();
        nextSequence();
        started = true;
    }
})


$(".btn").on("click", function (){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    
    checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
            
        }
    }
    else{
        playSound("wrong");
        animateGameOver();
        $("h1").text("Game Over, Press The Button to Restart");
        startOver();
        
    }
}

function startOver(){
    gamePattern = [];
    started = false;
    level = 0;
    $("#enter").show();

}


function nextSequence() {
    userClickedPattern = []
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
}



function playSound(name){
    var sound = new Audio("./sounds/" + name + ".mp3")
    sound.play();

}

function animatePress(currentColor){
    var currentColorID = "#" + currentColor
    $(currentColorID).addClass("pressed");
    setTimeout(function (){
        $(currentColorID).removeClass("pressed");
    }, 100);
}

function animateGameOver(){ 
    $("body").addClass("game-over");
    setTimeout(function (){
        $("body").removeClass("game-over");
    }, 200);
}












