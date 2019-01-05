import { createReducer } from '../utils'
import * as Types from './types'

export const INITIAL_STATE = {
  currentView: Types.LAUNCH,
  envSelected: Types.DEVELOPMENT,
  mnemonicPhraseCount: { caption: '12 word', bytes: '128', count: 12 },
  encryptionKey: '',
  error: false
}

export function setCurrentView (state, payload) {
  return {
    ...state,
    currentView: payload
  }
}

export function setSelectedEnvironment (state, payload) {
  return {
    ...state,
    envSelected: payload
  }
}

export function setMnemonicPhraseCount (state, payload) {
  return {
    ...state,
    mnemonicPhraseCount: payload
  }
}

export function setEncryptionKey (state, payload) {
  return {
    ...state,
    encryptionKey: payload
  }
}

const reducers = {
  [Types.SET_CURRENT_ENVIRONMENT]: setSelectedEnvironment,
  [Types.SET_MNEMONIC_PHRASE_COUNT]: setMnemonicPhraseCount,
  [Types.SET_ENCRYPTION_KEY]: setEncryptionKey,
}

export default createReducer(INITIAL_STATE, reducers)
