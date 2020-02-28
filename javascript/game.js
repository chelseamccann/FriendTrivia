
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice"));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let correct = 0;
let incorrect = 0;

let questions = [
    {
        question: "What is his favorite color?",
        choice1: "Green",
        choice2: "Red",
        choice3: "Orange",
        choice4: "Purple",
        answer: 2
    },
    {
        question: "What are two of his favorite foods?",
        choice1: "Wings and oranges",
        choice2: "Ice cream and crackers",
        choice3: "Lasagna and chicken parm",
        choice4: "Pretzels and twix",
        answer: 3
    }
]

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    // console.log(availableQuestions);
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end page
        return window.location.assign("/end");
    }

    questionCounter++;
    const questionIdx = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIdx];
    question.innerText = currentQuestion.question;
    
    // iterating thru buttons to add innertext choices from selected question
    choices.forEach((choice, i) => { 
        i++;
        choice.id = i;
        choice.innerText = currentQuestion["choice"+i];
    });
    
    availableQuestions.splice(questionIdx, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.id;
    
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        document.getElementById(selectedAnswer).classList.add(classToApply);

        // increment score if correct 
        classToApply == "correct" ? correct++ : incorrect++; 
    
        setTimeout(() => {
            document.getElementById(selectedAnswer).classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

startGame();