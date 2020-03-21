import { ipcMain } from 'electron'

import currencies from './currencies'

ipcMain.on('currency-find', async (event, query = {}) => {
  let result = await currencies.find(query)

  event.returnValue = result
})

ipcMain.on('currency-findOne', async (event, query) => {
  let result = await currencies.findOne(query)

  event.returnValue = result
})

ipcMain.on('currency-insert', async (event, data) => {
  let result = await currencies.insert(data)

  event.returnValue = result
})

ipcMain.on('currency-remove', async (event, query) => {
  let result = await currencies.remove(query)

  event.returnValue = result
})

ipcMain.on('currency-update', async (event, { id, data }) => {
  let result = currencies.update({
    _id: id
  }, data)

  event.returnValue = result
})

ipcMain.on('currency-erase', async (event) => {
  let result = await currencies.remove({}, { multi: true })

  event.returnValue = result
})

export {
  currencies
}
