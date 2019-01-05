import * as Types from './types'

// Set Environment
export function setCurrentView (view) {
  return async dispatch => {
    dispatch(setView(view))
  }
}

export function setView(view) {
  return {
    type: Types.SET_CURRENT_VIEW,
    payload: view
  }
}

// Set Environment
export function setSelectedEnvironment (env) {
  return async dispatch => {
    dispatch(setEnv(env))
  }
}

export function setEnv(env) {
  return {
    type: Types.SET_CURRENT_ENVIRONMENT,
    payload: env
  }
}

// Set Mnemonic Phrase Word Count
export function setMnemonicPhraseCount (count) {
  return async dispatch => {
    dispatch(setCount(count))
  }
}

export function setCount(count) {
  return {
    type: Types.SET_MNEMONIC_PHRASE_COUNT,
    payload: count
  }
}

//Set Encryption Key
export function setEncryptionKey (key) {
  return async dispatch => {
    dispatch(setKey(key))
  }
}

export function setKey(key) {
  return {
    type: Types.SET_ENCRYPTION_KEY,
    payload: key
  }
}