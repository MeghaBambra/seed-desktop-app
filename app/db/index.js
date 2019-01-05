import NeDB from 'nedb'
import * as encryption from '../services/security/encryption'
import * as locking from '../services/authentication/locking'

import {
  DATABASE_PATH,
  DOCUMENT_TYPE_USER_INFO,
  APP_VERSION
} from './constants'

let db = null

export const databaseExists = async () => {
  await locking.unlock({ password: DATABASE_PATH})
  db = new NeDB({ filename: DATABASE_PATH, autoload: true })

  return new Promise((resolve, reject) => {
    db.findOne({ type: DOCUMENT_TYPE_USER_INFO }, (err, doc) => {
      if (err) {
        reject(err)
        return
      }

      if (!doc) {
        resolve({
          exists: false
        })
      } else {
        resolve({
          exists: true,
          pin: doc.pin,
          appVersion: doc.appVersion
        })
      }
    })
  })
}

export const initialize = async () => {
  db = new NeDB({ filename: DATABASE_PATH, autoload: true })
  return new Promise((resolve, reject) => {
    db.findOne({ type: DOCUMENT_TYPE_USER_INFO }, (err, doc) => {
      if (err) {
        reject(err)
        return
      }

      if (!doc) {
        const newDoc = { type: DOCUMENT_TYPE_USER_INFO, data:{ tokens: { chainNode: '', api: ''}}, appVersion: APP_VERSION }
        db.insert(newDoc, (err, newDocument) => {
          if (err) {
            reject(err)
            return
          }

          resolve({
            accounts: newDocument.data,
            exists: false
          })
        })
      } else {
        resolve({
          data: doc.data,
          exists: true
        })
      }
    })
  })
}

export const setChainNodeAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    db.update({ type: DOCUMENT_TYPE_USER_INFO }, { $set: { 'data.tokens.chainNode': token }},
      { returnUpdatedDocs: true, multi: false }, (err, numReplaced, affectedDocuments) => {
      if (err) {
        reject(err)
        return
      }
      resolve(affectedDocuments.accounts)
    })
  })
}

export const getChainNodeAccessToken = () => {
  return new Promise((resolve, reject) => {
    db.findOne({ type: DOCUMENT_TYPE_USER_INFO }, (err, doc) => {
      if (err) {
        reject(err)
        return
      }
      if (doc) {
        const token = doc.data.tokens.chainNode
        resolve({
          token: token,
          exists: token.length > 0
        })
      } else {
        resolve({
          exists: false
        })
      }
    })
  })
}

export const setAPIAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    db.update({ type: DOCUMENT_TYPE_USER_INFO }, { $set: { 'data.tokens.api': token }},
      { returnUpdatedDocs: true, multi: false }, (err, numReplaced, affectedDocuments) => {
      if (err) {
        reject(err)
        return
      }
      resolve(affectedDocuments.accounts)
    })
  })
}

export const getAPIAccessToken = () => {
  return new Promise((resolve, reject) => {
    db.findOne({ type: DOCUMENT_TYPE_USER_INFO }, (err, doc) => {
      if (err) {
        reject(err)
        return
      }
      if (doc) {
        const token = doc.data.tokens.api
        resolve({
          token: token,
          exists: token.length > 0
        })
      } else {
        resolve({
          exists: false
        })
      }
    })
  })
}

export const clearAllUserInfo = () => {
  return new Promise(async (resolve, reject) => {
    await locking.destroy()
    resolve()
  })
}
