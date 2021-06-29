import * as React from 'react'
import { Game } from './gameState'

export interface GameSession {
  games_played:number
  total_questions:number
  total_correct:number
  token:string | null
  saved_games: Game[]
}

const getGameTotalQsandCorrects = (game:Game) => {
    const totalCorrect = game.userAnswers.reduce((prev, answer) => {
      if(answer.correct){
        return prev + 1
      }
      return prev

    }, 0)
    const totalQuestions = game.userAnswers.length

  return {
    totalCorrect,
    totalQuestions
  }
}

const addGame = (sessionState:GameSession, game:Game) => {

  const { totalCorrect, totalQuestions } = getGameTotalQsandCorrects(game)

  return {
    ...sessionState,
    games_played: sessionState.games_played + 1,
    total_questions: sessionState.total_questions + totalQuestions,
    total_correct: sessionState.total_correct + totalCorrect,
    saved_games: [...sessionState.saved_games, game]
  }


}

export const useSessionState = (initial:GameSession) => {
  const [sessionState, sessionStateSet] = React.useState<GameSession>(initial);

  return {
    sessionState,
    addGame(game:Game){
      sessionStateSet(addGame(sessionState, game))
    },
    setToken(token:string){
      sessionStateSet({...sessionState, token})
    }
  }
}