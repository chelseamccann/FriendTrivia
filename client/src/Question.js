import React from 'react';
import './Question.css';
// import socketIOClient from 'socket.io-client';

// If correct answer was question clicked, add correct class to show styling, else add incorrect class for styling
function Question({question, acceptingAnswers, getNewQuestion, correct, setCorrect}){

    const questionTitle = question.question
    const choices = [{1: question.choice1}, {2: question.choice2}, {3: question.choice3}, {4: question.choice4}]
    const answer = question.answer

    const handleClick = (e) => {
        e.preventDefault();
        let selectedAnswer = parseInt(e.target.id)
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        
        const classToApply = selectedAnswer === answer ? "correct" : "incorrect";
        document.getElementById(selectedAnswer).classList.add(classToApply);
        // increment score if correct 
        if (classToApply === "correct"){
            setCorrect(correct + 1);
        }

        // set timeout to show css then go to next question
        setTimeout(() => {
            document.getElementById(selectedAnswer).classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    }


    return (
        <>
        <h2 className="q-title">{questionTitle}</h2>
        <ul>
        {choices.map((choice, idx) => (
            <li key={idx} className="choice">
                <button onClick={handleClick} className='btn choice' id={`${idx+1}`}>{choice[idx+1]}</button>
            </li>
            ))}
        </ul>
        </>
    )
}

export default Question;