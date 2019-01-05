import electron from 'electron'
import path from 'path'

const appPath = (electron.app || electron.remote.app).getPath('appData')

export const DATABASE_PATH = path.join(appPath, 'Seed/Databases/user.db')
export const DOCUMENT_TYPE_USER_INFO = 'userInfo'
export const APP_VERSION = 'v0.1'
