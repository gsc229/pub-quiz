import React, {useState} from 'react';
import { fetchQuizQuestions } from './API'
// Components
import QuestionCard from './components/QuestionCard';
// Types
import { Difficulty, QuestionState } from './API'
// Styles
import { GlobalStyle, Wrapper } from './App.style'


export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

const App = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[] | []>([]);
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const TOTAL_QUESTIONS = 10


  const startTrivia = async () => {
    
    setLoading(true)
    setGameOver(false)
    
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)

    if(newQuestions.success){
      setQuestions(newQuestions.data)
    } else {
      setQuestions([])
    }

    
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
    <>
      <GlobalStyle />
        <Wrapper>
        <h1>Pub Quiz</h1>
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
        choices={questions[number].choices}
        userAnswer={userAnswers[number]}
        callback={checkAnswer}
        />
        )}
        {!gameOver && !loading && userAnswers.length !== number && number !== TOTAL_QUESTIONS - 1 && (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>)}
        </Wrapper>
    </>
  );
}

export default App;
