const moves = ["PARRY", "LUNGE", "RIPOSTE", "ATTACK" ];
const startTraining = document.getElementById("start");
const resetTraining = document.getElementById("reset");
const clearHistory = document.getElementById("clear");
const command = document.getElementById("command");
const gameRound = document.getElementById("gameRound");
const last = document.getElementById("last");
const avg = document.getElementById("avg");
const best = document.getElementById("best");

let reactionStart = 0;
let currentRound = 0;
let totalRounds = 0;
let waitforKey = false;
let reactionTimes = [];
let randomTime;

command.textContent = "Ready?";

startTraining.addEventListener("click", function(){
    totalRounds = Number(document.getElementById("rounds").value);

    if (totalRounds <= 0) {
        command.textContent = "Choose some rounds!";
    return;
    }
    
    currentRound = 0
    reactionTimes = [];
    startTraining.disabled = true;
    nextRound();
});

function nextRound(){
    if (currentRound >= totalRounds){
        command.textContent = "Training Complete!";
        gameRound.textContent = totalRounds + "/" + totalRounds;
        startTraining.disabled = false;
        waitforKey = false;
        avg.textContent = "AVERAGE: " + getAverageReactionTime() + " ms";
        return;
    }

    waitforKey = false;
    command.textContent = "Wait..."

    randomTime = Math.random() * 2000 + 1000;

    setTimeout(function(){
        currentRound++;

        const randomIndex= Math.floor (Math.random() * moves.length);
        const randomMove = moves[randomIndex];

        command.textContent = randomMove;
        gameRound.textContent = currentRound + "/" + totalRounds;

        reactionStart = Date.now();
        waitforKey = true;
    }, randomTime);
}

function getAverageReactionTime() {
    if (reactionTimes.length === 0) {
            return 0;
        }

        const total = reactionTimes.reduce(function(sum, time) {
            return sum + time;
        }, 0);

        return Math.round(total / reactionTimes.length);
    }

document.addEventListener("keydown", function (event) {
    if (event.repeat || waitforKey === false) {
        return;
    }

    const reactionTime = Date.now() - reactionStart;
    reactionTimes.push(reactionTime);

    
    waitforKey = false;

    last.textContent = "LAST: " + reactionTime;
    avg.textContent = "AVERAGE: " + 0;
    const bestTime = Math.min(...reactionTimes);
    best.textContent = "BEST: " + bestTime + " ms";
    
    nextRound();
});



    
    

resetTraining.addEventListener("click", function(){
    console.log("Training Reseted")
})

clearHistory.addEventListener("click", function(){
    console.log("History Cleared")
})

