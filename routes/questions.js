var express = require("express");
var router = express.Router();

let questionBank = [
    {
        question: "What is Node.js?",
        choice1: "A JavaScript environment",
        choice2: "A backend framework",
        choice3: "A frontend framework",
        choice4: "A programming language",
        answer: 1
    },
    {
        question: "What is React.js?",
        choice1: "A JavaScript environment",
        choice2: "A backend framework",
        choice3: "A programming language",
        choice4: "A JavaScript library",
        answer: 4
    },
    {
        question: "What is Ruby on Rails?",
        choice1: "A JavaScript environment",
        choice2: "A backend framework",
        choice3: "A programming language",
        choice4: "A JavaScript library",
        answer: 2
    },
    {
        question: "What is Flask?",
        choice1: "A JavaScript environment",
        choice2: "A backend framework",
        choice3: "A frontend framework",
        choice4: "A programming language",
        answer: 2
    }
]

router.get("/", function(req, res, next) {
    res.json(questionBank);
});

module.exports = router;