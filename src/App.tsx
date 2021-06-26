import React, {useState, useEffect} from 'react';
import { fetchQuizQuestions } from './API'
// components
import QuestionCard from './components/QuestionCard';
// Types
import { Difficulty, QuestionState } from './API'

export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

const App = () => {

  

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const TOTAL_QUESTIONS = 10
  console.log({questions, userAnswers})

  const startTrivia = async () => {
    
    setLoading(true)
    setGameOver(false)
    
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)

    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)

  }

  const checkAnswer = (e:React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      const answer = e.currentTarget.value
      const correct = answer === questions[number].correct_answer
      if(correct) setScore(prev => prev += 1)

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }

      setUserAnswers(prev => [...prev, answerObject])

    }

  }

  const nextQuestion = () => {

    const nextQuestion = number + 1

    if(nextQuestion === TOTAL_QUESTIONS) {
      return setGameOver(true)
    } 

    setNumber(nextQuestion)
  }


  return (
    <div className="App">
      <h1>React Quiz</h1>
      {(gameOver || userAnswers.length === TOTAL_QUESTIONS) &&
      <button className="start" onClick={startTrivia}>
        Start
      </button>}
      {!gameOver && <p className="score">Score: {score}</p>}
      {loading && <p className="loading">Loading Questions...</p>}
      {!loading && !gameOver && (
      <QuestionCard 
      questionNr={number + 1} 
      totalQuestions={TOTAL_QUESTIONS}
      question={questions[number].question}
      answers={questions[number].answers}
      userAnswer={userAnswers[number]}
      callback={checkAnswer}
      />
      )}
      {!gameOver && !loading && userAnswers.length !== number && number !== TOTAL_QUESTIONS - 1 && (
      <button className="next" onClick={nextQuestion}>
        Next Question
      </button>)}
    </div>
  );
}

export default App;