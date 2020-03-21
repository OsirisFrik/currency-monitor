import axios from 'axios'

const foreign = axios.create({
  baseURL: 'https://api.exchangeratesapi.io/'
})

foreign.interceptors.response.use((response) => response.data)

let getLast = (currency, currenciesComapre = []) => {
  if (typeof currenciesComapre[0] === 'object') currenciesComapre = currenciesComapre.map(e => e.code)

  return foreign({
    method: 'GET',
    url: '/latest',
    params: {
      base: currency,
      symbols: currenciesComapre.join()
    }
  })
}

export {
  getLast
}
