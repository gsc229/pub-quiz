import * as React from 'react'
import Game from '../components/Game'
import { baseQueryStr } from '../API'


export interface Game {
  gameOver: boolean
  settingUp: boolean
  currentQuestion: MCQuestion | null
  questionNumber:number
  userAnswers: UserMCAnswer[]
  questions: MCQuestion[]
  score: number
  settings: GameSetup
}

export interface GameSetup {
  category: number | null
  difficulty: string | null
  num_questions: number | null
}

export interface MCQuestion {
  category: string
  correct_answer: string
  difficulty: string
  choices: string[]
  question: string
  type: string
}

export interface UserMCAnswer {
  question: string
  user_answer: string
  correct: boolean
  correctAnswer: string
}

const checkAnwser = (userAnswer:string, question: MCQuestion) => {
  return userAnswer === question.correct_answer
}

const submitQuestion = (gameState: Game, answer: UserMCAnswer, question: MCQuestion ) => {
  const correct = checkAnwser(answer.user_answer, question)
  answer.correct = correct

  return {
    ...gameState,
    userAnswers: [...gameState.userAnswers, answer]
  }
}
const setGameSettings = (gameState: Game, key:string, value:number | string) => {
  
  return {
    ...gameState,
    settings: {
      ...gameState.settings,
      [key]: value
    }
  }
}

const startGame = (gameState:Game, questionSet: MCQuestion[]) => {
  return {
    ...gameState,
    score: 0,
    questionNumber: 1,
    gameOver: false,
    questions: questionSet
  }
}

const getQueryString = (gameState:Game, token: string | undefined) => {
  let queryString = baseQueryStr

  const { category, num_questions, difficulty } = gameState.settings
  
  if(category) queryString = baseQueryStr + `&category=${category}`
  if(num_questions) queryString = baseQueryStr + `&amount=${num_questions}`
  if(difficulty) queryString = baseQueryStr + `&difficulty=${difficulty}`
  // Token not required, but it prevents you from getting repeat questions in  the same session.
  if(token) queryString = baseQueryStr + `&token=${token}`

  return queryString
}

const nextQuestion = (gameState:Game) => {

  const nextQNum = gameState.questionNumber + 1 < gameState.questions.length
   ? 
   gameState.questionNumber + 1 
   : 
   gameState.questionNumber

  return {
    ...gameState,
    questionNumber: nextQNum
  }
}

// useGameState
export const useGameState = (initial:Game) => {
  const [gameState, gameStateSet] = React.useState<Game>(initial)
  
  return {
    gameState,
    getQueryString(token:string | undefined){
      return getQueryString(gameState, token)
    },
    startGame(questionSet:MCQuestion[]){
      gameStateSet(startGame(gameState, questionSet))
    },
    submitQuestion(answer:UserMCAnswer, question:MCQuestion){
      gameStateSet(submitQuestion(gameState, answer, question))
    },
    setGameSettings(key:string, value:string | number){
      gameStateSet(setGameSettings(gameState, key, value ))
    },
    nextQuestion(){
      gameStateSet(nextQuestion(gameState))
    },
    loadQuesions(newQuestions:MCQuestion[]){
      gameStateSet({ ...gameState, questions: newQuestions })
    }
  }
}

type UseGameStateType = ReturnType<typeof useGameState>

// Game Context
export const GameContext = React.createContext<UseGameStateType | null>(null)

