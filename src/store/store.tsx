import * as React from 'react'
import { useGameState, GameContext } from './gameState'



export const useGameContext = () => React.useContext(GameContext)!

const initialGameState = {
  gameOver: true,
  settingUp: true,
  currentQuestion: null,
  questionNumber: 1,
  userAnswers: [],
  questions: [],
  score: 0,
  settings: {
    difficulty: "",
    num_questions: 10,
    category: null
  }
}

export const GameProvider = ({ children }:{ children: React.ReactNode }) => (
  <GameContext.Provider value={ useGameState(initialGameState) }>
    { children }
  </GameContext.Provider>
)
