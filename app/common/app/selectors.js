export function getCurrentView (state) {
  return state.app.currentView
}

export function getSelectedEnvironment (state) {
  return state.app.envSelected
}

export function getMnemonicPhraseCount (state) {
  return state.app.mnemonicPhraseCount
}

export function getEncryptionKey (state) {
  return state.app.encryptionKey
}