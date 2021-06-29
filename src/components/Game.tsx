import { fetchQuizQuestions } from '../API'
// Context
import { useGameContext, useSessionContext } from '../store/store'
// Components
import QuestionCard from './QuestionCard';

const Game = () => {

  const { sessionState } = useSessionContext()
  const { gameState, setLoading, startGame, setSetupMode, getQueryString } = useGameContext()
  const { loading, questions, gameOver, score } = gameState
  const { games_played } = sessionState

  const handleStart = () => {
      const queryString = getQueryString(sessionState.token)
      console.log({queryString})
      setLoading(true)

      fetchQuizQuestions(queryString)
      .then(response => {
        if(response.success){
          startGame(response.data)
        } else{
          console.log({response})
        }
      })
      .catch(error => console.log({error}))

      setLoading(false)
  }

  return (
    <div className='game-container'>
      {/* <pre style={{color: 'white'}}>{JSON.stringify({gameState}, null, 2)}</pre> */}
      {(gameOver) &&
      <div className='start-edit-btns'>
        <button 
        className="start" 
        onClick={handleStart}>
          { games_played > 0 ? "Start Next Game" : "Start" }
        </button>
        <button 
        onClick={() => setSetupMode(true)}
        className="change-settings-btn">
          Change Settings
        </button>
      </div>}
      {!gameOver && !loading && <p className="score">Score: {score}</p>}
      {loading && <p className="loading">Loading Questions...</p>}
      {!loading && !gameOver && questions.length > 0 && (
      <QuestionCard />
      )}
    </div>
  );
}

export default Game
