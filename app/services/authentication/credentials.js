import { setPassword, getPassword } from '../authentication/keychain'
import { create as createHash } from '../security/password'
//import config from '../../../config'

//TODO: Issues with getting production config variable in production build
const APP_IDENTIFIER = 'com.proofofcode'
const APP_NAME = 'Seed'
const ACCOUNT = `${APP_NAME}.verification`

const get = async () => {
  return getPassword(APP_IDENTIFIER, ACCOUNT)
}

export const verify = async (username, password) => {
  let storedHash = await get()

  let hash = await createHash({
    text: username + password,
    salt: APP_NAME
  })

  if (hash !== storedHash) {
    throw new Error('Invalid password')
  }

  let token = await createHash({
    text: hash + password,
    salt: APP_NAME
  })

  return token
}

export const update = async (username, password) => {
  let hash = await createHash({
    text: username + password,
    salt: APP_NAME
  })

  return setPassword(APP_IDENTIFIER, ACCOUNT, hash)
}

export const logout = async () => {
  return true
}
