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
    //this.handleSelection = this.handleSelection.bind(this)
  }

  componentDidMount () {
    console.log(`Launch View Component Did mount`)
  }

  render () {
    return (
      <div className={styles.encryptionKeyMainContainer}>
        <Card>
          <CardHeader>Step 2: Input password or key to encrypt mnemonic phrase</CardHeader>
          <CardBody>
            <CardText className={styles.encryptionKeyCardDescription}>
              12 word has 128 bits entropy while 24 words has 256 bits entropy. More entropy means harder to guess mnemonic phrase.
            </CardText>
            <Input />
          </CardBody>
        </Card>
      </div>
    )
  }

  async handleSelection() {
    event.preventDefault()
    this.props.setEncryptionKey(this.state.password2Value)
  }
}

export default connect(null, {
  setEncryptionKey
})(EncryptionKey)
