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
  const { settingUp, settings } = gameState

  const queryString = getQueryString(token)

  // Local
  const [categories, setCategories] = useState<CategoryObject[]>([])
  
  const getNewToken = async() => {
    const newToken = await fetchSessionToken()
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
        {!settingUp && 
        <ul className='info-list'>
          <li><h3>Game:&nbsp;&nbsp; <span>{games_played + 1}</span></h3></li>
          <li><h3>Category:&nbsp;&nbsp; <span>{  settings.category ? settings.category : 'Various' }</span></h3></li>
          <li><h3>Difficulty:&nbsp;&nbsp; <span>{ settings.difficulty ? settings.difficulty.toUpperCase() : 'Various' }</span></h3></li>
          <li><h3>No. of Q's:&nbsp;&nbsp; <span>{ settings.num_questions }</span></h3></li>
        </ul>}
        {settingUp && <GameSetup categories={categories} />}
        {!settingUp && <Game />}
      </Wrapper>
    </>
  );
}

export default App;
