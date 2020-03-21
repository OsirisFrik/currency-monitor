import Database from 'nedb-promises'
import { app } from 'electron'
import path from 'path'

const appPath = app.getPath('appData')

const currencies = new Database({
  autoload: true,
  filename: path.join(appPath, 'currency-monitor/db/currencies.db')
})

export default currencies
