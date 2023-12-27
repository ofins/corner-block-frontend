import { fetchData } from './index'
import { DEMO_10K_API_KEY } from '@/settings/apiBaseEndPoint'

const GET_TICKERS_PRICES = '/simple/price?ids='
const SET_CURRENCY = '&vs_currencies='
const GET_TICKER_DETAIL = '/coins/'
const GET_MULTI_TICKERS_DETAIL = '/markets?vs_currency=usd&ids='
const NO_SPARKLINE_LOCALE_EN = '&sparkline=false&locale=en'

export const getTickerPrice = (tickers: string, currency: string = 'usd') =>
  fetchData(GET_TICKERS_PRICES + tickers + SET_CURRENCY + currency + '&' + DEMO_10K_API_KEY)

export const getTickerDetail = (ticker: string) =>
  fetchData(GET_TICKER_DETAIL + ticker + '?' + DEMO_10K_API_KEY)

export const getMultiTickersDetail = (tickers: string, currency: string = 'usd') =>
  fetchData(
    GET_TICKER_DETAIL +
      GET_MULTI_TICKERS_DETAIL +
      tickers +
      NO_SPARKLINE_LOCALE_EN +
      '&' +
      DEMO_10K_API_KEY
  )
