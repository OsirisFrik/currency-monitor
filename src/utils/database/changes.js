import Database from 'nedb-promises'
import path from 'path'
import { app } from 'electron'

const appPath = app.getPath('appData')

const changes = new Database({
  autoload: true,
  filename: path.join(appPath, 'currency-monitor/db/changes.db')
})

export default changes
