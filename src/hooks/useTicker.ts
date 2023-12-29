import { getTickerPrice, getTickerDetail, getMultiTickersDetail } from '@/api/ticker'

export const useTicker = () => {
  const fetchData = async (requestFn: Function, ...params: any) => {
    try {
      const response = await requestFn(...params)
      if (response.status !== 200) throw new Error(`status-code:${response.status}`)
      else return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const fetchTickerPriceDataByName = async (tickerParams: string, currency: string) =>
    fetchData(getTickerPrice, tickerParams.toLowerCase(), currency)

  const fetchTickerDetailByName = async (ticker: string) =>
    fetchData(getTickerDetail, ticker.toLowerCase())

  const fetchMultiTickersDetailByName = async (tickers: string, currency: string) =>
    fetchData(getMultiTickersDetail, tickers.toLowerCase(), currency)

  return {
    fetchTickerPriceDataByName,
    fetchTickerDetailByName,
    fetchMultiTickersDetailByName
  }
}
