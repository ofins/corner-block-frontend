import { mount } from '@vue/test-utils'
import { useTickerBlock } from './useBlock'
import { expect, it, describe } from 'vitest'

describe('useTickerBlock', () => {
  const wrapper = mount({
    template: '<div></div>',
    setup() {
      return useTickerBlock()
    }
  })
  const {
    tickerList,
    tickerList_medium,
    tickerList_small_one,
    toggleBlockDetail,
    blockDetailData,
    Ticker,
    LOCAL_STORAGE_TICKERLIST,
    compileAllTickerIdToString,
    handleToggleBlockDetail,
    setAllTickersDetail,
    editTickerListProperty,
    setAllTickerNames,
    saveToLocalStorage,
    submitEditTable
  } = wrapper.vm

  it('should have default values', () => {
    expect(tickerList).toBeDefined()
    expect(toggleBlockDetail).toBeFalsy()
    expect(blockDetailData).toBeUndefined()
    expect(Ticker).toBeDefined()
    expect(LOCAL_STORAGE_TICKERLIST).toBeDefined()
  })

  it('should compile ticker id into a string with only alphabets, dash, and commas', () => {
    expect(compileAllTickerIdToString(tickerList)).toMatch(/^[a-zA-Z,-]+$/)
  })

  
})
// await handleToggleBlockDetail(2)

// expect(toggleBlockDetail).toBeTruthy()
