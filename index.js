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
let trainingHistory = [];
let randomTime;

command.textContent = "Ready?";

startTraining.addEventListener("click", function(){
    totalRounds = Number(document.getElementById("rounds").value);

    if (totalRounds <= 0) {
        command.textContent = "Choose some rounds!";
    return;
    }
    
    currentRound = 0;
    reactionTimes = [];
    startTraining.disabled = true;
    nextRound();
});

function nextRound(){
    if (currentRound >= totalRounds){
        command.textContent = "Training Complete!";
        gameRound.textContent = "ROUND " + totalRounds + "/" + totalRounds;
        startTraining.disabled = false;
        waitforKey = false;
        avg.textContent = "AVERAGE: " + getAverageReactionTime() + " ms";
        const average = getAverageReactionTime();
        const bestTime = Math.min(...reactionTimes);

        trainingHistory.push({
            average: average,
            best: bestTime,
            rounds: totalRounds
        });

        displayHistory();

        avg.textContent = "AVERAGE: " + average + " ms";
        best.textContent = "BEST: " + bestTime + " ms";
        return;
    }

    waitforKey = false;
    command.textContent = "Wait...";

    randomTime = Math.random() * 2000 + 1000;

    setTimeout(function(){
        currentRound++;

        const randomIndex= Math.floor (Math.random() * moves.length);
        const randomMove = moves[randomIndex];

        command.textContent = randomMove;
        gameRound.textContent = "ROUND " + currentRound + "/" + totalRounds;

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

    last.textContent = "LAST: " + reactionTime + "ms";
    avg.textContent = "AVERAGE: " + 0 + "ms";
    const bestTime = Math.min(...reactionTimes);
    best.textContent = "BEST: " + bestTime + " ms";

    nextRound();
})

function displayHistory() {
    const history = document.getElementById("historyList");

    if (trainingHistory.length === 0) {
        history.innerHTML = "<p>No attempts yet</p>";
        return;
    }

    history.innerHTML = "";

    for (let i = 0; i < trainingHistory.length; i++) {
        const attempt = trainingHistory[i];
        const entry = document.createElement("p");

        entry.textContent =
            "Attempt " + (i + 1) +
            " - Average: " + attempt.average + " ms";

        history.appendChild(entry);
    }
}

resetTraining.addEventListener("click", function(){
    currentRound = 0;
    totalRounds = 0;
    waitforKey = false;
    reactionTimes = [];
    gameRound.textContent = "ROUND " + 0 + "/" + totalRounds;
    command.textContent = "Ready?";
    last.textContent = "LAST: " + 0 + "ms";
    avg.textContent = "AVERAGE: " + 0 + "ms";
    best.textContent = "BEST: " + bestTime + " ms";
    startTraining.disabled = false;
})

clearHistory.addEventListener("click", function(){
    trainingHistory = [];
    displayHistory();
})


