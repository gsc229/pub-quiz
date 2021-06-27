import React, {useState} from 'react'
import { fetchQuizQuestions } from '../API'
// Components
import QuestionCard from './QuestionCard';
// Types
import { QuestionState } from '../API'
// Styles

export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

type Props = {
  setGameNumber:React.Dispatch<React.SetStateAction<number>>
  setShowGameSetup: React.Dispatch<React.SetStateAction<boolean>>
  queryString: string
  totalQuestions:number
}

const Game = ( { setGameNumber, setShowGameSetup, queryString, totalQuestions }:Props ) => {
  
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionState[] | []>([]);
  const [number, setNumber] = useState<number>(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);

  console.log({ gameOver, questions , })
  const startTrivia = async () => {
    
    setLoading(true)
    setGameOver(false)
    
    const newQuestions = await fetchQuizQuestions(queryString)

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

    if(nextQuestion === totalQuestions) {
      setGameNumber(prev => prev + 1)
      return setGameOver(true)
    } 

    setNumber(nextQuestion)
  }

  const handleChangeSettings = () => {
    setShowGameSetup(true)
  }


  return (
    <div className='game-container'>
      {(gameOver || userAnswers.length === totalQuestions) &&
      <div className='start-edit-btns'>
        <button 
        className="start" 
        onClick={startTrivia}>
          Start
        </button>
        <button 
        onClick={handleChangeSettings}
        className="change-settings-btn">
          Change Settings
        </button>
      </div>}
      {!gameOver && <p className="score">Score: {score}</p>}
      {loading && <p className="loading">Loading Questions...</p>}
      {!loading && !gameOver && questions.length > 0 && (
      <QuestionCard 
      questionNr={number + 1} 
      totalQuestions={totalQuestions}
      question={questions[number].question}
      choices={questions[number].choices}
      userAnswer={userAnswers[number]}
      callback={checkAnswer}
      />
      )}
      {!gameOver && !loading && userAnswers.length !== number && number !== totalQuestions - 1 && (
      <button 
      className="next" 
      onClick={nextQuestion}>
        Next Question
      </button>)}
    </div>
  );
}

export default Game
