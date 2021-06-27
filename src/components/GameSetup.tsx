import React from 'react'
// Bootstrap
// Types
import { CategoryObject }  from '../API'
// Styles 
import { Wrapper } from './GameSetup.style'
import { ButtonWrapper } from './QuestionCard.style'

type Props = {
  setShowGameSetup: React.Dispatch<React.SetStateAction<boolean>>
  setCategory: React.Dispatch<React.SetStateAction<CategoryObject>>
  setDifficulty: React.Dispatch<React.SetStateAction<string>>
  difficulty:string
  setTotalQuestions: React.Dispatch<React.SetStateAction<number>>
  totalQuestions: number
  setGameNumber:React.Dispatch<React.SetStateAction<number>>
  categories: CategoryObject[]
  category: CategoryObject
}

const GameSetup = ({ 
  setShowGameSetup, 
  setCategory, 
  setDifficulty, 
  setTotalQuestions, 
  setGameNumber, 
  categories,
  category,
  difficulty,
  totalQuestions

}:Props) => {


  const selectDifficulty = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value)
  }

  const handleContinue = () => {

    if(!category.name) {
      setCategory({ ...category, name: 'Various' })
    }

    if(!difficulty || difficulty === 'Various') {
      setDifficulty('')
    }

    setShowGameSetup(false)
    
  }

  const handleCategorySelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = categories.find(category => category.name === e.currentTarget.value) || {} as CategoryObject
    setCategory(selectedCategory)
  }
  console.log({ category }, typeof category, category.name)
  return (
    <Wrapper>
      <h2>Game Setup</h2>
      <div className='container  setup-container'>
        <div className='row'>
          <select 
          value={category.name}
          className="select" 
          onChange={handleCategorySelect}>
            <option value="" >
              Select Category
            </option>
            {categories.length >0 && categories.map(category => (
              <option
              key={category.id} 
              value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className='row'>
          <select 
          value={difficulty}
          className="select-difficulty" 
          onChange={selectDifficulty}>
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
        value={totalQuestions}
        className="select" 
        onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setTotalQuestions(parseInt(e.currentTarget.value))}>
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
