import axios from 'axios'

export const fetchData = async (params: string) => {
  return axios.get(params)
}
