import {useState, useEffect} from 'react';
import { useGameContext, useSessionContext } from './store/store'
// Components
import GameSetup from './components/GameSetup';
import Game from './components/Game';
// Types
import { fetchSessionToken, fetchCategories, CategoryObject }  from './API'
// Styles
import { GlobalStyle, Wrapper } from './App.style'

const App = () => {

  const { sessionState, setToken } = useSessionContext()
  const { games_played, total_correct, total_questions, token } = sessionState
  const { gameState, getQueryString } = useGameContext()

  
  const [showGameSetup, setShowGameSetup] = useState<boolean>(true)
  const [gameNumber, setGameNumber] = useState<number>(1)
  const [categories, setCategories] = useState([] as CategoryObject[])
  const [category, setCategory] = useState({} as CategoryObject)
  const [difficulty, setDifficulty] = useState<string>("Various")
  const [totalQuestions, setTotalQuestions] = useState<number>(10)

  const queryString = getQueryString(token)

  
  const getNewToken = async() => {
    const newToken = await fetchSessionToken()
    console.log({newToken})
    setToken(newToken.data?.token)
  }

  const checkToken = async(token:string) => {

    const testResult = await(await fetch(`https://opentdb.com/api.php?amount=1&token=${token}`)).json()

    if(testResult.response_code === 3 || testResult.response_code === 4){
      return false
    }
    return true

  } 

  
  useEffect(() => {

    const lsToken:string | null = localStorage.getItem('token')
    // Check for token in local storage first and if it's fresh:
    if(lsToken){
      checkToken(lsToken)
      .then(tokenIsGood => {
        if(tokenIsGood){
          setToken(lsToken)
        } else {
          getNewToken()
        }
      })

      
    } else{
      // Call getNew Token if no token in local storage
      getNewToken()

    }

    const getCategories = async() => {
      let lsCategories = JSON.parse(localStorage.getItem('trivia_categories') || "[]" )
      
      if(lsCategories.length > 0){
        return setCategories(lsCategories)
      } else{
        const response = await fetchCategories()
        if(response.success){
          setCategories(response.data?.trivia_categories || [])
        }
      }
    }

    if(categories.length === 0) getCategories()

  }, [])

  return (
    <>
      <GlobalStyle />
      <pre style={{color: 'white'}}>{JSON.stringify({sessionState}, null, 2)}</pre>
      <pre style={{color: 'white'}}>{JSON.stringify({gameState}, null, 2)}</pre>
      <Wrapper>
        <h1>Pub Quiz</h1>
        {!showGameSetup && 
        <ul className='info-list'>
          <li><h3>Game:&nbsp;&nbsp; <span>{gameNumber}</span></h3></li>
          <li><h3>Category:&nbsp;&nbsp; <span>{  category.name ? category.name : 'Various' }</span></h3></li>
          <li><h3>Difficulty:&nbsp;&nbsp; <span>{ difficulty ? difficulty.toUpperCase() : 'Various' }</span></h3></li>
          <li><h3>No. of Q's:&nbsp;&nbsp; <span>{ totalQuestions }</span></h3></li>
        </ul>}
        {gameState.settingUp && categories.length > 0 &&
        <GameSetup
        categories={categories}
        />}
        {!showGameSetup &&
        <Game
        queryString={queryString}
        totalQuestions={totalQuestions}
        setGameNumber={setGameNumber}
        gameNumber={gameNumber}
        setShowGameSetup={setShowGameSetup}
        />}
    
      </Wrapper>
    </>
  );
}

export default App;
