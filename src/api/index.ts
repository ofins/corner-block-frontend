import axios from 'axios'

import apiBaseEndPoint from '@/settings/apiBaseEndPoint'

export const fetchData = async (params: string) => {
  return axios.get(apiBaseEndPoint + params)
}
