import React from 'react'
// Types 
import { AnswerObject } from '../App'
// Styles 
import { Wrapper, ButtonWrapper } from './QuestionCard.style'

type Props = {
  question: string
  choices: string[]
  callback: (e:React.MouseEvent<HTMLButtonElement>) => void
  userAnswer: AnswerObject | undefined
  questionNr: number
  totalQuestions: number
}


const QuestionCard = ({ question, choices, callback, userAnswer, questionNr, totalQuestions }: Props) => {

      return(
      <Wrapper>
        <p className="number">
          Question: { questionNr } / { totalQuestions }
        </p>
        <p dangerouslySetInnerHTML={{ __html: question }}/>
        <div>
          {choices.map(choice =>(
            <ButtonWrapper 
            correct={ userAnswer?.correctAnswer === choice}
            userClicked={ choice === userAnswer?.answer }
            key={choice}>
              <button disabled={userAnswer !== undefined} value={choice}  onClick={callback}>
                <span dangerouslySetInnerHTML={{ __html: choice}} />
              </button>
            </ButtonWrapper>
          ))}
        </div>
      </Wrapper>
      )
}


export default QuestionCard
