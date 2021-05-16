import axios, { Method, AxiosResponse } from 'axios'

export function apiRequest (method:Method, url:string, data:any) {
  return axios.request({ method, url, data })
}

export async function apiRequestPost (context:any, url:string, requestData:any) {
  const response: AxiosResponse = await apiRequest('POST', url, requestData)
  console.log('context apiRequestPost', context)
  if (!response.data.success) {
    console.log(response.data)
  }

  return response.data
}
