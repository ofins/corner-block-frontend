import { COINGECKO_BASE_ENDPOINT } from '@/settings/apiBaseEndPoint'
import { fetchData } from './index'

const ENDPOINTS = {
  SIMPLE: '/simple',
  PRICE: '/price',
  COINS: '/coins',
  MARKETS: '/markets'
}

const buildUrl = (endpoint: string, params = {}) => {
  console.log(import.meta.env.VITE_CG_API_KEY)
  const paramString = new URLSearchParams(params)
  return `${COINGECKO_BASE_ENDPOINT}${endpoint}?${paramString.toString()}&x_cg_demo_api_key=${
    import.meta.env.VITE_CG_API_KEY
  }`
}

export const getTickerPrice = (tickers: string, currency: string = 'usd') =>
  fetchData(
    buildUrl(`${ENDPOINTS.SIMPLE}${ENDPOINTS.PRICE}`, { ids: tickers, vs_currencies: currency })
  )

export const getTickerDetail = (ticker: string) =>
  fetchData(buildUrl(`${ENDPOINTS.COINS}/${ticker}`))

export const getMultiTickersDetail = (tickers: string, currency: string = 'usd') =>
  fetchData(
    buildUrl(`${ENDPOINTS.COINS}${ENDPOINTS.MARKETS}`, {
      vs_currency: currency,
      ids: tickers,
      sparkline: false,
      locale: 'en'
    })
  )
