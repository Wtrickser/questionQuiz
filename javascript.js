//loops through the questions 
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var pageContent = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>";
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        pageContent += buttonCode
    }


    document.getElementById("quizBody").innerHTML = pageContent;
}
//
var questions = [{
        title: "what color is grass?",
        choices: ["Red?", "Blue?", "Green?", "Yellow?"],
        answer: "Green?"
    },
    {
        title: "What is the first word of this sentence?",
        choices: ["What?", "First?", "Sentence?", "Word?"],
        answer: "What?"
    },
    {
        title: "What is the last word of this sentence?",
        choices: ["What?", "Sentence?", "Last?", "Word?"],
        answer: "Sentence?"
    },
    {
        title: "How many words in this question?",
        choices: ["7?", "5?", "4?", "6?"],
        answer: "6?"
    },
    {
        title: "How many questions have be asked?",
        choices: ["5?", "4?", "8?", "3?"],
        answer: "5?"
    }
]

//setting the numerical variables for the functions.. scores and timers.. 
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//starts the countdown timer once user clicks the 'start' button
function start() {

    timeLeft = 75;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        //proceed to end the game function when timer is below 0 at any time
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);

    next();
}

//stop the timer to end the game 
function endGame() {
    clearInterval(timer);

    var pageContent = `<h2>End!</h2>
    <h3>You got a ` + score + ` /100!</h3>
    <input type="text" id="name" placeholder="First name">
    <button onclick="setScore()">Set score!</button>`;

    document.getElementById("quizBody").innerHTML = pageContent;
}

//store the scores on local storage
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName", document.getElementById('name').value);
    getScore();
}


function getScore() {
    var pageContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>

`;

    document.getElementById("quizBody").innerHTML = pageContent;
}

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName", "");

    resetGame();
}

//reset the game 
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var pageContent = `<h1>✨Question Quiz✨</h1><h3>✨Click to Start✨</h3><button onclick="start()">Start!</button>`;

    document.getElementById("quizBody").innerHTML = pageContent;
}

//deduct 15seconds from the timer if user chooses an incorrect answer
function incorrect() {
    timeLeft -= 15;
    next();
}

//increases the score by 20points if the user chooses the correct answer
function correct() {
    score += 20;
    next();
}
