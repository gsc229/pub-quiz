import * as React from 'react'
import Game from '../components/Game'
import { baseQueryStr } from '../API'


export interface Game {
  gameOver:boolean
  settingUp:boolean
  loading:boolean
  gameError:string | null
  currentQuestion:MCQuestion | null
  questionNumber:number
  userAnswers:UserMCAnswer[]
  questions:MCQuestion[]
  score:number
  settings:GameSetup
}

export interface GameSetup {
  category:number | null
  difficulty:string | null
  num_questions:number | null,
  type:string | null
}

export interface MCQuestion {
  category:string
  correct_answer:string
  difficulty:string
  choices:string[]
  question:string
  type:string
}

export interface UserMCAnswer {
  question:string
  submittedAnswer:string | undefined
  correct:boolean | undefined
  correctAnswer:string | undefined
}

const checkAnwser = (userAnswer:string | undefined, question: MCQuestion) => {
  return userAnswer === question.correct_answer
}

const setCurrentQuestion = (gameState: Game, question: MCQuestion) => {
  return{
    ...gameState,
    currentQuestion: question
  }
}

const submitAnswer = (gameState: Game, answer: UserMCAnswer, question: MCQuestion ) => {
  const correct = checkAnwser(answer.submittedAnswer, question)
  answer.correct = correct
  answer.correctAnswer = question.correct_answer
  let score = gameState.score
  if(answer.correct){
    score+=1
  }

  return {
    ...gameState,
    score,
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
    questionNumber: 0,
    gameOver: false,
    questions: questionSet,
    userAnswers: []
  }
}

const clearGameResults = (gameState:Game) => {
  return {
    ...gameState,
    score: 0,
    questionNumber: 0,
    questions: [],
    userAnswers: [],
    settingUp: true,
    gameOver: true
  }
}

const getQueryString = (gameState:Game, token: string | undefined) => {
  let queryString = baseQueryStr

  const { category, num_questions, difficulty, type } = gameState.settings

  if(category) queryString = queryString + `&category=${category}`
  if(num_questions){
    queryString = queryString + `&amount=${num_questions}`
  } else {
    queryString = queryString + `&amount=10`
  }
  if(difficulty) queryString = queryString + `&difficulty=${difficulty}`
  if(type) queryString = queryString + `&type=${type}`
  // Token not required, but it prevents you from getting repeat questions in  the same session.
  if(token) queryString = queryString + `&token=${token}`

  return queryString
}

const setNextQuestionNumber = (gameState:Game) => {

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
    setSetupMode(bool:boolean){
      console.log("setSetupMode: ", {bool})
      gameStateSet({...gameState, settingUp: bool})
    },
    startGame(questionSet:MCQuestion[]){
      gameStateSet(startGame(gameState, questionSet))
    },
    clearGameResults(){
      gameStateSet(clearGameResults(gameState))
    },
    setCurrentQuestion(question:MCQuestion){
      gameStateSet(setCurrentQuestion(gameState, question))
    },
    submitAnswer(answer:UserMCAnswer, question:MCQuestion){
      gameStateSet(submitAnswer(gameState, answer, question))
    },
    setGameSettings(key:string, value:string | number){
      gameStateSet(setGameSettings(gameState, key, value ))
    },
    setNextQuestionNumber(){
      gameStateSet(setNextQuestionNumber(gameState))
    },
    setLoading(bool:boolean){
      gameStateSet({...gameState, loading: bool})
    },
    loadQuesions(newQuestions:MCQuestion[]){
      gameStateSet({ ...gameState, questions: newQuestions })
    },
    setGameOver(bool:boolean){
      console.log("setGameOver: ",{bool})
      return gameStateSet({...gameState, gameOver: bool})
    }
  }
}

type UseGameStateType = ReturnType<typeof useGameState>

// Game Context
export const GameContext = React.createContext<UseGameStateType | null>(null)

