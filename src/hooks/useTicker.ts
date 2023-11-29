import { getTickerPrice, getTickerDetail } from '@/api/ticker'

export const useTicker = () => {
  const fetchTickerPriceDataByName = async (tickerParams: string, currency: string) => {
    try {
      const response = await getTickerPrice(tickerParams.toLowerCase(), currency)
      if (response.status !== 200) {
        throw new Error(`status-code:${response.status}`)
      }
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const fetchTickerDetailByName = async (ticker: string) => {
    try {
      const response = await getTickerDetail(ticker.toLowerCase())
      if (response.status !== 200) {
        throw new Error(`status-code:${response.status}`)
      }
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  return {
    fetchTickerPriceDataByName,
    fetchTickerDetailByName
  }
}
