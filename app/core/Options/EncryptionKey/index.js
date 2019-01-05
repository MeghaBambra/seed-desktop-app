import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setMnemonicPhraseCount } from '../../../common/app/actions'

import styles from './style.css'

import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  InputGroup,
  InputGroupAddon,
  Button
} from 'reactstrap'

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap'

const list = [
  { caption: '12 word', bytes: '128', count: 12 }, { caption: '24 word', bytes: '256', count: 24 }
]

class EncryptionKey extends Component {
  constructor (props) {
    super()
    this.state = {
      dropdownOpen: false,
      selected: 0,
      wordLengthOptions: list
    }
    this.toggle = this.toggle.bind(this)
    this.handleSelection = this.handleSelection.bind(this)
  }

  componentDidMount () {
    console.log(`Launch View Component Did mount`)
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
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
            { this.renderSelection() }
          </CardBody>
        </Card>
      </div>
    )
  }

  renderSelection () {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret color='success'>
          { this.state.wordLengthOptions[this.state.selected].caption }
        </DropdownToggle>
        <DropdownMenu>
          { this.renderList() }
        </DropdownMenu>
      </ButtonDropdown>
    )
  }

  renderList() {
    return this.state.wordLengthOptions.map((option, index) => {
      return (
        <DropdownItem
          key = { index }
          style={{fontSize: '1rem'}}
          onClick={ ()=>{this.handleSelection(index)} }>
          { `${ option.caption }` }
        </DropdownItem>
      )
    })
  }

  async handleSelection(index) {
    event.preventDefault()
    this.setState({
      selected: index
    })
    this.props.setMnemonicPhraseCount(this.state.wordLengthOptions[index])
  }
}

export default connect(null, {
  setMnemonicPhraseCount
})(EncryptionKey)
