import { fetchData } from './index'
import { DEMO_10K_API_KEY, COINGECKO_BASE_ENDPOINT } from '@/settings/apiBaseEndPoint'

const ENDPOINTS = {
  SIMPLE: '/simple',
  PRICE: '/price',
  COINS: '/coins',
  MARKETS: '/markets'
}

const buildUrl = (endpoint: string, params = {}) => {
  const paramString = new URLSearchParams(params)
  return `${COINGECKO_BASE_ENDPOINT}${endpoint}?${paramString.toString()}&${DEMO_10K_API_KEY}`
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
