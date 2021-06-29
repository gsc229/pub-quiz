import { useGameContext, useSessionContext } from '../store/store'
// Types
import { CategoryObject, fetchQuizQuestions }  from '../API'
// Styles 
import { Wrapper } from './GameSetup.style'
import { ButtonWrapper } from './QuestionCard.style'

type Props = {
  categories: CategoryObject[]
}

const GameSetup = ({ 
  categories
}:Props) => {

  const { sessionState  } = useSessionContext()
  const { gameState, setGameSettings, startGame, getQueryString } = useGameContext()
  const { category, difficulty, num_questions } = gameState.settings


  const handleContinue = async() => {
    const queryString = getQueryString(sessionState.token) 
    const fetchNewQuestions = await fetchQuizQuestions(queryString)

    if(fetchNewQuestions.success){
      startGame(fetchNewQuestions.data)
    } else {
      alert("Something went wrong :(")
    }
  }
  
  return (
    <Wrapper>
      <h2>Game Setup</h2>
      <div className='container  setup-container'>
        <div className='row'>
          <select
          name="category"
          value={category ? category : ""}
          className="select" 
          onChange={(e) => setGameSettings(e.target.name, e.target.value)}>
            <option value="" >
              Select Category
            </option>
            {categories.length >0 && categories.map(category => (
              <option
              key={category.id} 
              value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className='row'>
          <select
          name="difficulty"
          value={difficulty ? difficulty : ""}
          className="select-difficulty" 
          onChange={(e) => setGameSettings(e.target.name, e.target.value)}>
            <option value="" >
              Select Difficulty
            </option>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
        </div>
        <div className='row'>
        <select
        name="num_questions"
        value={num_questions ? num_questions : ""}
        className="select" 
        onChange={(e) => setGameSettings(e.target.name, e.target.value)}>
            <option value={10} >
              # of Q's
            </option>
            {Array(50).fill(0).map((_, idx) => <option key={`numQ${idx + 1}`} value={idx + 1}>{idx + 1}</option>)}
          </select>
        </div>
        <ButtonWrapper
        correct={true}
        userClicked={true}
        >
          <button onClick={handleContinue}>
            Continue
          </button>
        </ButtonWrapper>
      </div>
    </Wrapper>
  )
}

export default GameSetup
