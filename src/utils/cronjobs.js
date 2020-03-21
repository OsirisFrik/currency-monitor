import EventEmmiter from 'events'
import { currencies } from './database'
import { getLast } from './requests'

const event = new EventEmmiter()
const jobs = {}

function initCron () {
  currencies.on('insert', (newDoc, insertAt) => {
    loadCurrencies()
  })

  currencies.on('remove', () => {
    loadCurrencies()
  })

  loadCurrencies()

  return event
}

function loadCurrencies () {
  currencies.find().then(data => {
    console.log(data)
    for (let i = 0; i < data.length; i++) {
      if (data[i].showInNotification) request(data[i])

      if (jobs[data[i]._id]) clearInterval(jobs[data[i]._id])

      jobs[data[i]._id] = setInterval(() => {
        request(data[i])
      }, 60000)
    }
  }).catch(err => console.log(err))
}

function request (currency) {
  getLast(currency.code, currency.compare.map(e => e.code)).then(value => {
    if (currency.showInNotification) event.emit('currency-update', value)
  }).catch(err => {
    console.log(err.data)
  })
}

export default initCron
