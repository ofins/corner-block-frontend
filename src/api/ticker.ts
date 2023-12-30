import { fetchData } from './index'
import { SERVER_BASE_ENDPOINT } from '@/settings/apiBaseEndPoint'

const GET_TICKER_PRICE_API = '/tickers/prices'
const GET_TICKER_DETAIL = '/tickers/details'
const GET_MULTI_TICKER_DETAILS = '/tickers/details/multi'

const buildUrl = (endpoint: string, params = {}) => {
  const paramString = new URLSearchParams(params)
  return `${SERVER_BASE_ENDPOINT}${endpoint}?${paramString.toString()}`
}

export const getTickerPrice = (tickers: string, currency: string = 'usd') =>
  fetchData(buildUrl(GET_TICKER_PRICE_API, { ids: tickers, vs_currencies: currency }))

export const getTickerDetail = (ticker: string) =>
  fetchData(buildUrl(`${GET_TICKER_DETAIL}`, { ticker: ticker }))

export const getMultiTickersDetail = (tickers: string, currency: string = 'usd') =>
  fetchData(
    buildUrl(`${GET_MULTI_TICKER_DETAILS}`, {
      vs_currency: currency,
      ids: tickers,
      sparkline: false,
      locale: 'en'
    })
  )
