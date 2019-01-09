import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setEncryptionKey } from '../../../common/app/actions'

import styles from './style.css'

import {
  Input,
  InputGroup,
  Button
} from 'reactstrap'

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap'

class EncryptionKey extends Component {
  constructor (props) {
    super()
    this.state = {
      password1Value: '',
      password2Value: '',
      passwordMatch: false,
    }
    this.handleChange = this.handleChange.bind(this)
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
        </Card>
      </div>
    )
  }

  async handleSelection() {
    event.preventDefault()
    this.props.setEncryptionKey(this.state.password2Value)
  }

  handleChange (event) {
    const target = event.target
    const name = target.name
    var value = target.value
    console.log(`Text Change || ${value}`)
    this.setState({
      [name]: value
    })
  }
}

export default connect(null, {
  setEncryptionKey
})(EncryptionKey)
