import { useState } from 'react'
// Context
import { useGameContext, useSessionContext } from '../store/store'
// Styles 
import { Wrapper, ButtonWrapper } from './QuestionCard.style'
// Types
import { UserMCAnswer, MCQuestion } from '../store/gameState'


const QuestionCard = () => {
  const { sessionState } = useSessionContext()
  const { gameState, setNextQuestionNumber, submitAnswer } = useGameContext()
  const { questions, questionNumber, userAnswers, score } = gameState
  const [pendingAnswer, setPendingAnswer] = useState<UserMCAnswer>({
    question: questions[questionNumber].question,
    correct: undefined,
    correctAnswer: undefined,
    user_answer: undefined
  } as UserMCAnswer);


  const handleChoiceClick = (choice:string) => {
    setPendingAnswer({
      ...pendingAnswer,
      user_answer: choice
    })
  }

  

  return(
      <Wrapper>
        <p className="number">
          Question: { questionNumber } / { questions.length }
        </p>
        <p dangerouslySetInnerHTML={{ __html: questions[questionNumber].question }}/>
        <div className="answer-choices">
          {questions[questionNumber].choices.map(choice =>(
            <ButtonWrapper 
            correct={ userAnswers.length === questionNumber && userAnswers[questionNumber].correct === true }
            userClicked={ choice === pendingAnswer.user_answer }
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
          <button
          className="submit"
          onClick={() => submitAnswer(pendingAnswer, questions[questionNumber])}>
            Submit
          </button>
          <button
          disabled={userAnswers.length - 1 !== questionNumber}
          className="next"
          onClick={() => setNextQuestionNumber}>
            Next Question
          </button>
        </div>
      </Wrapper>
  )
}


export default QuestionCard
