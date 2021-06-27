import {useState, useEffect} from 'react';
// Components
import GameSetup from './components/GameSetup';
import Game from './components/Game';
// Types
import { fetchSessionToken, fetchCategories, CategoryObject }  from './API'
// Styles
import { GlobalStyle, Wrapper } from './App.style'

const App = () => {

  const [token, setToken] = useState<string | undefined>("")
  const [showGameSetup, setShowGameSetup] = useState<boolean>(true)
  const [gameNumber, setGameNumber] = useState<number>(1)
  const [categories, setCategories] = useState([] as CategoryObject[])
  const [category, setCategory] = useState({} as CategoryObject)
  const [difficulty, setDifficulty] = useState<string>("Various")
  const [totalQuestions, setTotalQuestions] = useState<number>(10)

  const queryString = `https://opentdb.com/api.php?token=${token}&amount=${totalQuestions ? totalQuestions : ""}&type=multiple&difficulty=${difficulty ? difficulty : ""}&category=${category.id ? category.id : ""}`

  useEffect(() => {
      
    // Call getNew Token if no token in local storage
    const getNewToken = async() => {
      const newToken = await fetchSessionToken()
      setToken(newToken.data?.token)
    }

    getNewToken()

    

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
      <Wrapper>
        <h1>Pub Quiz</h1>
        {!showGameSetup && 
        <ul className='info-list'>
          <li><h3>Game:&nbsp;&nbsp; <span>{gameNumber}</span></h3></li>
          <li><h3>Category:&nbsp;&nbsp; <span>{  category.name ? category.name : 'Various' }</span></h3></li>
          <li><h3>Difficulty:&nbsp;&nbsp; <span>{ difficulty ? difficulty.toUpperCase() : 'Various' }</span></h3></li>
          <li><h3>No. of Q's:&nbsp;&nbsp; <span>{ totalQuestions }</span></h3></li>
        </ul>}
        {showGameSetup && categories.length > 0 &&
        <GameSetup
        categories={categories}
        category={category}
        difficulty={difficulty}
        totalQuestions={totalQuestions}
        setShowGameSetup={setShowGameSetup}
        setCategory={setCategory}
        setGameNumber={setGameNumber}
        setDifficulty={setDifficulty}
        setTotalQuestions={setTotalQuestions}
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
