import React, { Component } from 'react'
import styles from './style.css'
import MnemonicOptions from './MnemonicOptions'
import * as mnemonic from '../../services/security/mnemonic'

class Options extends Component {
  constructor (props) {
    super()
  }

  async componentDidMount () {
    console.log(`Launch View Component Did mount`)
    const phrase = await mnemonic.generateGivenEntropy()
    console.log(`Phrase: ${phrase}`)
  }

  render () {
    return (
      <div className={styles.optionsMainContainer}>
        <MnemonicOptions />
      </div>
    )
  }

  renderPasswordForm() {
    return (
      <div className={styles.launchPasswordForm}>
        <div className={styles.launchEnvWidgetLabel}>
          Enter Password
        </div>
        <InputGroup>
          <Input
              type='password'
              name='password'
              id='password'/>
          <InputGroupAddon addonType='append'>
            <Button>Login</Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    )
  }

}

export default Options
