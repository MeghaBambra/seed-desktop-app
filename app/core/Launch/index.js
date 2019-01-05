import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setSelectedEnvironment } from '../../common/app/actions'
import * as Types from '../../common/app/types'

import mainLogo from './logo-brand.png'
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

const environments = [
  Types.DEVELOPMENT, Types.STAGING, Types.PRODUCTION
]

class Launch extends Component {
  constructor (props) {
    super()
    this.state = {
      dropdownOpen: false,
      selected: 0,
      envList: environments
    }
    this.goToApp = this.goToApp.bind(this)
  }

  render () {
    return (
      <div className={styles.launchMainContainer}>
        <div className={styles.launchContentContainer}>
          <img src={mainLogo} className={styles.launchLogoContainer} alt='' />
          <div className={styles.launchLabel}>Offline Mnemonic Tool</div>
          { this.renderOptions() }
        </div>
      </div>
    )
  }

  renderOptions () {
    return (
      <div id={styles.launchCTAContainer}>
        <Button color='info' onClick={() => this.goToApp()}>Create</Button>{' '}
        <Button outline color='info'>Recover</Button>
      </div>
    )
  }

  goToApp() {
    event.preventDefault()
    this.props.history.push('/app')
  }

}

export default connect(null, {
  setSelectedEnvironment
})(Launch)