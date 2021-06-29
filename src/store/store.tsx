import * as React from 'react'
import { useGameState, GameContext } from './gameState'
import { useSessionState, SessionContext } from './sessionState'

export const useSessionContext = () => React.useContext(SessionContext)!

const initialSessionState = {
  games_played: 0,
  total_questions: 0,
  total_correct: 0,
  token: undefined,
  saved_games: []
}

export const SessionProvider = ({ children }:{ children: React.ReactNode }) => (
  <SessionContext.Provider value={useSessionState(initialSessionState)}>
    { children }
  </SessionContext.Provider>
)
  

export const useGameContext = () => React.useContext(GameContext)!

const initialGameState = {
  gameOver: true,
  settingUp: true,
  loading: false,
  gameError: null,
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
