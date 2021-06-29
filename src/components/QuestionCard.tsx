import { useState } from 'react'
// Context
import { useGameContext } from '../store/store'
// Styles 
import { Wrapper, ButtonWrapper } from './QuestionCard.style'
// Types
import { UserMCAnswer } from '../store/gameState'


const QuestionCard = () => {
  const { gameState, setNextQuestionNumber, submitAnswer, setGameOver, setSetupMode, clearGameResults } = useGameContext()
  const { questions, questionNumber, userAnswers, gameOver } = gameState
  const [pendingAnswer, setPendingAnswer] = useState<UserMCAnswer>({
    question: questions[questionNumber].question,
    correct: undefined,
    correctAnswer: undefined,
    submittedAnswer: undefined
  } as UserMCAnswer);
  

  console.log({gameOver})
  const handleChoiceClick = (choice:string) => {
    setPendingAnswer({
      ...pendingAnswer,
      submittedAnswer: choice
    })
  }

  const handleNextQuestion = () => {

    const next_num = questionNumber + 1

    if(next_num === questions.length){
      clearGameResults()
    } else {
      setNextQuestionNumber()
    }
  }

  const getBtnText = () => {
    const next_num = questionNumber + 1

    if(next_num === questions.length){
      return "Play Another?"
    } else {
      return "Next Question"
    }

  }

  return(
      <Wrapper>
        <p className="number">
          Question: { questionNumber + 1 } / { questions.length }
        </p>
        <p dangerouslySetInnerHTML={{ __html: questions[questionNumber].question }}/>
        <div className="answer-choices">
          {questions.length > 0 && questions[questionNumber].choices.map(choice =>(
            <ButtonWrapper
            selected={pendingAnswer.submittedAnswer === choice}
            correct={userAnswers[questionNumber] && choice === userAnswers[questionNumber].correctAnswer }
            userClicked={ userAnswers[questionNumber] && choice === userAnswers[questionNumber].submittedAnswer }
            key={choice}>
              <button 
              disabled={userAnswers.length === questionNumber + 1} 
              value={choice}  
              onClick={() => handleChoiceClick(choice)}>
                <span dangerouslySetInnerHTML={{ __html: choice}} />
              </button>
            </ButtonWrapper>
          ))}
        </div>
        <div className='submit-next-container'>
          {userAnswers.length === questionNumber && 
            <button
            className="submit"
            onClick={() => submitAnswer(pendingAnswer, questions[questionNumber])}>
              Submit
            </button>
          }
          {questionNumber === userAnswers.length - 1 && 
            <button
            className="next"
            onClick={handleNextQuestion}>
              {getBtnText()}
            </button>
          }
        </div>
      </Wrapper>
  )
}


export default QuestionCard
