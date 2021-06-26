import { shuffleArray } from './utils'

export type Question = {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
}

export type QuestionState = Question & { choices: string[] }

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard"
}

type DataReturn = {
  success: boolean,
  data?: object
}

export const fetchQuizQuestions = async(amount: number, difficulty: Difficulty):Promise<DataReturn> => {

  const endpoint = `https://opentdb.com/api.php?amount=${amount}&type=multiple&difficulty=${difficulty}`

  const data = await (await fetch(endpoint)).json()

  if (data){

    const shuffledData = data.results.map((question: Question) => (
      {
        ...question,
        choices: shuffleArray([...question.incorrect_answers, question.correct_answer])
      }
    ))

    return { success: true, data: shuffledData }

  }

  return { success: false }
  
}


export const fetchSessionToken = async(): Promise<DataReturn> => {

  const endpoint = 'https://opentdb.com/api_token.php?command=request'

  const data: { response_code: number, response_message: string, token: string } = await (await fetch(endpoint)).json()

  localStorage.setItem('token', data.token)

  if(data && data.token) return { success: true, data }

  return { success: false }

}

export const fetchCategories = async(): Promise<DataReturn> => {

  const endpoint = 'https://opentdb.com/api_category.php?command=request'

  const data: { trivia_categories: [] } = await (await fetch(endpoint)).json()

  localStorage.setItem('trivia_categories', JSON.stringify(data.trivia_categories))

  if(data && data.trivia_categories) return { success: true, data }

  return { success: false }

}