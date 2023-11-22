import { fetchData } from './index'

const GET_TICKERS_PRICES = '/simple/price?ids='
const SET_CURRENCY = '&vs_currencies='

export const getTickerPrice = (tickers: string, currency: string) =>
  fetchData(GET_TICKERS_PRICES + tickers + SET_CURRENCY + currency)
