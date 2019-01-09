import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setEncryptionKey, setCurrentView } from '../../../common/app/actions'
import * as Types from '../../../common/app/types'
import styles from './style.css'

import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  Input,
  Button
} from 'reactstrap'

const ERR_MSG = {
  FIRST_FIELD_EMPTY: 'Please enter password in the first field.',
  PASSWORDS_DONT_MATCH: 'Passwords in both fields do not match.',
  NONE: ''
}

class EncryptionKey extends Component {
  constructor (props) {
    super()
    this.state = {
      password1Value: '',
      password2Value: '',
      passwordMatch: false,
      errorMessage: ERR_MSG.NONE
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.passwordValidation = this.passwordValidation.bind(this)
  }

  componentDidMount () {
    console.log(`Launch View Component Did mount`)
  }

  render () {
    return (
      <div className={styles.encryptionKeyMainContainer}>
        <Card>
          <CardHeader>Step 2: Input password or key to encrypt mnemonic phrase</CardHeader>
          <CardBody className={styles.encryptionKeyCardBody}>
            <div id={styles.encryptionKeyInputContainer}>
              <CardText>
                Enter an encryption password
              </CardText>
              <Input type='password' name='password1Value' id='password1Value'
              value={this.state.password1Value} onChange={this.handleChange} placeholder='Enter Encryption password'/>
            </div>
            <div id={styles.encryptionKeyInputContainer}>
              <CardText>
                Re-type password
              </CardText>
              <Input type='password' name='password2Value' id='password2Value'
              value={this.state.password2Value} onChange={this.handleChange} placeholder='Re-enter Encryption password'/>
            </div>
          </CardBody>
          { this.state.errorMessage.length !== 0 && this.renderErrorMsgContainer() }
        </Card>
        { this.renderSubmitButton() }
      </div>
    )
  }

  renderErrorMsgContainer() {
    return (
      <div className={styles.encryptionErrorContainer}>
        { this.state.errorMessage }
      </div>
    )
  }

  renderSubmitButton() {
    return (
      <Button color='primary' size='lg' className={styles.encryptionSubmitButton} onClick={()=> this.handleSubmit()}>
        Generate Encrypted Mnemonic
      </Button>
    )
  }

  handleSubmit() {
    event.preventDefault()
    if (this.state.password2Value.length > 0
        && this.state.password1Value.length > 0
        && (this.state.password1Value === this.state.password2Value)) {
          this.props.setEncryptionKey(this.state.password2Value)
          this.props.setCurrentView(Types.OUTPUT)
        }
  }

  handleChange (event) {
    const target = event.target
    const name = target.name
    var value = target.value
    this.passwordValidation(name, value)
    this.setState({
      [name]: value
    })
  }

  passwordValidation (name, value) {
    if (name === 'password2Value') {
      this.setState({ errorMessage: value !== this.state.password1Value ? ERR_MSG.PASSWORDS_DONT_MATCH : ERR_MSG.NONE })
    }

    if (name === 'password1Value') {
      this.setState({ errorMessage: value !== this.state.password2Value ? ERR_MSG.PASSWORDS_DONT_MATCH : ERR_MSG.NONE })
    }
  }
}

export default connect(null, {
  setEncryptionKey,
  setCurrentView
})(EncryptionKey)
