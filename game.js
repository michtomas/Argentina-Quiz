const question = document.getElementById("question")
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull")


let currentQuestion = {};
let acceptingAnswers = false
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "¿En que año asume por primera vez a la presidencia Juan Domingo Peron?",
        choice1: "1945",
        choice2: "1946",
        choice3: "1947",
        choice4: "1948",
        answer: 2
    },
    {
        question: "De las denominadas veinte verdades peronistas, ¿Cual es la primera?",
        choice1: "El peronismo es esencialmente popular. Todo círculo político es antipopular y, por lo tanto, no peronista.",
        choice2: "No existe para el peronismo más que una sola clase de personas: los que trabajan.",
        choice3: "Queremos una Argentina socialmente justa, económicamente libre y políticamente soberana.",
        choice4: "La verdadera democracia es aquella donde el gobierno hace lo que el pueblo quiere y defiende un solo interés: el del pueblo.",
        answer: 4
    },
    {
        question: "¿De que cuadro era hincha Peron?",
        choice1: "Racing",
        choice2: "River",
        choice3: "Boca",
        choice4: "Banfield",
        answer: 3
    },
];

//constants
const CORRECT_BOUNS=10;
const MAX_QUESTIONS =3;

startGame = () => {
    questionCounter =0;
    score=0;
    availableQuestions =[...questions];

    getNewQuestion();
}
getNewQuestion = () => {
    if(availableQuestions.length ===0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score)
        return window.location.assign("/end.html");
    }
    questionCounter++;
    progressText.innerText = `Pregunta ${questionCounter}/${MAX_QUESTIONS}`;
    //incrementar barra//
    progressBarFull.style.width = `${((questionCounter - 1)/MAX_QUESTIONS)*100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener("click", e=>{
        if(!acceptingAnswers) return;
        acceptingAnswers=false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
      
        const classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
      //no funciono el if comun no se porque//

      if(classToApply === "correct") {
          incremnetScore(CORRECT_BOUNS);
      }

        selectedChoice.parentElement.classList.add(classToApply);


        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion()
        }, 1000)

        });
});

incremnetScore = num => {
    score += num;
    scoreText.innerText = score;
}



startGame();