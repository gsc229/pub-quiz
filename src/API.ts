import { Resolver } from 'dns'
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



export const fetchQuizQuestions = async(queryString:string):Promise<{success: boolean; data: QuestionState[]}> => {
  console.log({queryString})
  const data = await (await fetch(queryString)).json()
  console.log({data})
  if (data){

    const shuffledData = data.results.map((question: Question) => (
      {
        ...question,
        choices: shuffleArray([...question.incorrect_answers, question.correct_answer])
      }
    ))
    
    console.log({shuffledData})
    return { success: true, data: shuffledData }

  }

  return { success: false, data: [] }

}


export const fetchSessionToken = async():Promise<{ success:boolean, data?:{ response_code: number, response_message: string, token: string } }> => {

  const endpoint = 'https://opentdb.com/api_token.php?command=request'

  const data: { response_code: number, response_message: string, token: string } = await (await fetch(endpoint)).json()

  localStorage.setItem('token', data.token)

  if(data && data.token) return { success: true, data }
  console.log("token data: ", data)
  return { success: false }

}

export type CategoryObject = {
  id: number
  name: string
}

export const fetchCategories = async(): Promise<{ success:boolean, data?:{ trivia_categories:CategoryObject[] }}> => {

  const endpoint = 'https://opentdb.com/api_category.php?command=request'

  const data = await (await fetch(endpoint)).json()
  console.log({data})
  localStorage.setItem('trivia_categories', JSON.stringify(data.trivia_categories))

  if(data && data.trivia_categories) return { success: true, data }

  return { success: false  }

}