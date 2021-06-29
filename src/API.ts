import { MCQuestion } from './store/gameState'


export const baseUrl = 'https://opentdb.com'
export const baseQueryStr = 'https://opentdb.com/api.php?'

/* FETCH QUESTIONS */
export const fetchQuizQuestions = async(queryString:string):Promise<{success: boolean; data: MCQuestion[]}> => {
  console.log({queryString})
  const data = await (await fetch(queryString)).json()
  console.log({data})

  if (data.response_code === 0){
    return { success: true, data: data.results }
  }

  return { success: false, data: [] }

}

/* FETCH TOKEN */
export const fetchSessionToken = async():Promise<{ success:boolean, data?:{ response_code:number, response_message:string, token:string } }> => {

  const endpoint = 'https://opentdb.com/api_token.php?command=request'

  const data: { response_code:number, response_message:string, token:string } = await (await fetch(endpoint)).json()

  localStorage.setItem('token', data.token)

  if(data && data.token) return { success: true, data }
  console.log("token data: ", data)
  return { success: false }

}

export type CategoryObject = {
  id: number
  name: string
}


/* FETCH CATEGORIES */
export const fetchCategories = async(): Promise<{ success:boolean, data?:{ trivia_categories:CategoryObject[] }}> => {

  const endpoint = 'https://opentdb.com/api_category.php?command=request'

  const data = await (await fetch(endpoint)).json()
  console.log({data})
  localStorage.setItem('trivia_categories', JSON.stringify(data.trivia_categories))

  if(data && data.trivia_categories) return { success: true, data }

  return { success: false  }

}