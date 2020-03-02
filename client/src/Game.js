import React, { useState, useEffect } from 'react';
import Question from './Question';
// import socketIOClient from 'socket.io-client';

// Begin game and fetch all questions from express, sending down each question to the child component to determine correctness
// To implement functionality to first take in questionnaire from user then utilize those questions in game
export const Game = () => {
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [fetched, setFetched] = useState(false);
  const [acceptingAnswers, setAcceptingAnswers] = useState(true);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [correct, setCorrect] = useState(1);
  const MAX_QUESTIONS = 3;

  // Fetch opening price and compare to find color to assign
  useEffect(() => {
    fetch("/questions", { method: 'GET' })
    .then(res => res.json())
    .then(res => {
      setAvailableQuestions(res)
      setCurrentQuestion(res[0])
      setFetched(true)
    })
  }, []);

  ///////////////////// Functionality for sockets to be added /////////////////////
  // useEffect(() => {
  //   const socket = socketIOClient(endpoint);
  //   setInterval(send(), 1000)
  //   socket.on('change question', (currentQuestion) => {
  //       currentQuestion
  //   })
  // }, [currentQuestion]);

  // sending sockets ///
  // const send = () => {
  //   const socket = socketIOClient(endpoint);
  //   socket.emit('change question', currentQuestion) // question has changed
  // };
  ////////////////////////////////////////////////////////////////////////////////////

  // function to get new question if there are any left / haven't hit max yet
  const getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        alert(`Game over! You got ${correct} right!`)
    };

    setQuestionCounter(questionCounter + 1)
    const questionIdx = Math.floor(Math.random() * availableQuestions.length);
    setCurrentQuestion(availableQuestions[questionIdx]);
    availableQuestions.splice(questionIdx, 1);
    setAcceptingAnswers(true);
    // send();
  };

  // const socket = socketIOClient(endpoint);

  return (
    fetched ? <Question question={currentQuestion} acceptingAnswers={acceptingAnswers} getNewQuestion={getNewQuestion} correct={correct} setCorrect={setCorrect} /> : <div></div>
  )
}

export default Game;