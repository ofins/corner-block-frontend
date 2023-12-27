import axios from 'axios'

import apiBaseEndPoint from '@/settings/apiBaseEndPoint'

const DEMO_10K_API_KEY = '&x_cg_demo_api_key=CG-Ss9UawjweBDXeWyuJXUcSHu3'

export const fetchData = async (params: string) => {
  return axios.get(apiBaseEndPoint + params + DEMO_10K_API_KEY)
}
