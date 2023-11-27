import { fetchData } from './index'

const GET_TICKERS_PRICES = '/simple/price?ids='
const SET_CURRENCY = '&vs_currencies='
const GET_TICKER_DETAIL = '/coins/'

export const getTickerPrice = (tickers: string, currency: string) =>
  fetchData(GET_TICKERS_PRICES + tickers + SET_CURRENCY + currency)

export const getTickerDetail = (ticker: string) => fetchData(GET_TICKER_DETAIL + ticker)
