import React, { Component } from 'react'
import styles from './style.css'
import MnemonicOptions from './MnemonicOptions'

class Options extends Component {
  constructor (props) {
    super()
  }

  componentDidMount () {
    console.log(`Launch View Component Did mount`)
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
