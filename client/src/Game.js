import React, { useState, useEffect } from 'react';
import './App.css';
import Question from './Question';
// import socketIOClient from 'socket.io-client';

export const Game = () => {
  // const endpoint = "localhost:4001";
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [fetched, setFetched] = useState(false);
  const [acceptingAnswers, setAcceptingAnswers] = useState(true);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [correct, setCorrect] = useState(1);
  const MAX_QUESTIONS = 3;
  // let score = 0;

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
  /////////////////////

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