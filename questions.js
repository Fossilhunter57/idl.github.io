const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

let questions = [
    {
        question : "How would you greet a friend?",
        imgSrc : "img/friend.png",
        choiceA : "A) Bonjour",
        choiceB : "B) Salut",
        choiceC : "C) Enchanté(e)",
        choiceD : "D) Au revoir",
        correct : "B"

    },{
        question : "How would you ask someone how they are doing?",
        imgSrc : "img/sunset.png",
        choiceA : "A) Au revoir",
        choiceB : "B) Ça va bien",
        choiceC : "C) Enchanté(e)",
        choiceD : "D) Comment ça va",
        correct : "D"
    },{
        question : "How would you say 'Nice to meet you' ",
        imgSrc : "img/handshake2.png",
        choiceA : "A) Merci",
        choiceB : "B) Enchanté(e)",
        choiceC : "C) Salut",
        choiceD : "D) Comment ça va",
        correct : "B"
      },{
        question : "How would you greet a stranger",
        imgSrc : "img/handshake.png",
        choiceA : "A) Bonjour",
        choiceB : "B) Au revoir",
        choiceC : "C) Bon journée",
        choiceD : "D) Salut",
        correct : "A"
      },{
        question : "How would you say 'Good day'",
        imgSrc : "img/sitting.png",
        choiceA : "A) Bon journée",
        choiceB : "B) Enchantée",
        choiceC : "C) Salut",
        choiceD : "D) Bonjour",
        correct : "A"
      },{
        question:  "How would you say 'Goodbye'",
        imgSrc : "img/waving.png",
        choiceA : "A) Comment ça va",
        choiceB : "B) Au revoir",
        choiceC : "C) Ça va bien",
        choiceD : "D) Bonjour",
        correct : "B"
          }
];


const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 20; // 20secs
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            clearInterval(TIMER);
            scoreRender();
        }
    }
}


function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        score++;
        answerIsCorrect();
    }else{
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        clearInterval(TIMER);
        scoreRender();
    }
}

function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

function scoreRender(){
    scoreDiv.style.display = "block";

    const scorePerCent = Math.round(100 * score/questions.length);

    let img = (scorePerCent >= 80) ? "5.png" :
              (scorePerCent >= 60) ? "4.png" :
              (scorePerCent >= 40) ? "3.png" :
              (scorePerCent >= 20) ? "2.png" :
              "1.png";

    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}