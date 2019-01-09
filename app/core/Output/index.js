import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as mnemonic from '../../services/security/mnemonic'

import { setMnemonicPhraseCount } from '../../common/app/actions'
import { getMnemonicPhraseCount, getEncryptionKey, getSelectedEnvironment } from '../../common/app/selectors'

import styles from './style.css'

import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap'

const list = [
  { caption: '12 word', count: 12, keyLen: 16 },
  { caption: '15 word', count: 15, keyLen: 20 },
  { caption: '18 word', count: 18, keyLen: 24 },
  { caption: '24 word', count: 24, keyLen: 32 }
]

class Output extends Component {
  constructor (props) {
    super()
    this.state = {
      dropdownOpen: false,
      selected: 0,
      wordLengthOptions: list,
      phrase: ''
    }
  }

  async componentDidMount () {
    console.log(`Launch View Component Did mount`)
    const phrase = await mnemonic.generateGivenEntropy({ keyLen: this.props.phrase.keyLen })
    this.setState({ phrase })
    console.log(`Phrase: ${phrase}`)
  }

  render () {
    return (
      <div className={styles.outputMainContainer}>
        <Card>
          <CardHeader>{`${this.props.phrase.caption} mnemonic phrase`}</CardHeader>
          <CardBody>
            <CardText className={styles.mnemonicOptionsCardDescription}>
              { this.state.phrase }
            </CardText>
          </CardBody>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currenEnv: getSelectedEnvironment(state),
    phrase: getMnemonicPhraseCount(state),
    encryptionKey: getEncryptionKey(state)
  }
}

export default connect(mapStateToProps, {
  setMnemonicPhraseCount
})(Output)
