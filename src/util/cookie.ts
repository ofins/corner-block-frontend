import Cookies from 'universal-cookie'

const cookies = new Cookies()

enum CookiesKey {
  GeneralSetting = 'general-setting'
}

const date = new Date()

const expirationDate = date.setDate(date.getDate() + 90)

const defaultMaxAge = 7776000

const defaultOptions = {
  maxAge: 7776000,
  path: '/',
  secure: true
}

export const setGeneralSetting = (val: object) =>
  cookies.set(CookiesKey.GeneralSetting, val, defaultOptions)

export const getGeneralSetting = () => {
  return cookies.get(CookiesKey.GeneralSetting)
}
