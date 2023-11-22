import { getTickerPrice } from '@/api/ticker'

export const useTicker = () => {
  const fetchTickerPriceDataByName = async (tickerParams: string, currency: string) => {
    try {
      const response = await getTickerPrice(tickerParams, currency)
      if (response.status === 200) {
        return response.data
      } else {
        throw new Error(`status-code:${response.status}`)
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }

  return {
    fetchTickerPriceDataByName
  }
}
