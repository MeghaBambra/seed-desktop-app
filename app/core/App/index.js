import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setSelectedEnvironment, setCurrentView } from '../../common/app/actions'
import { getSelectedEnvironment, getCurrentView } from '../../common/app/selectors'
import * as Types from '../../common/app/types'

import styles from './style.css'

import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

import Options from '../Options'

const environments = [
  Types.DEVELOPMENT, Types.STAGING, Types.PRODUCTION
]

class App extends Component {
  constructor (props) {
    super()
    this.state = {
      dropdownOpen: false,
      selected: 0,
      envList: environments
    }
    this.toggle = this.toggle.bind(this)
    this.handleSelection = this.handleSelection.bind(this)
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  async handleSelection(index) {
    event.preventDefault()
    this.setState({
      selected: index
    })
    this.props.setSelectedEnvironment(this.state.envList[index])
  }

  render () {
    return (
      <div className={styles.appMainContainer}>
        { this.renderStatusBar() }
        { this.renderContent() }
      </div>
    )
  }

  renderStatusBar () {
    return (
      <div className={styles.appStatusBarContainer}>
        <div className={styles.appStatusBarContainerCTA}>
          { this.renderEnvSelection() }
        </div>
      </div>
    )
  }

  renderEnvSelection () {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          { this.state.envList[this.state.selected] }
        </DropdownToggle>
        <DropdownMenu>
          { this.renderList() }
        </DropdownMenu>
      </ButtonDropdown>
    )
  }

  renderList() {
    return this.state.envList.map((env, index) => {
      return (
        <DropdownItem
          key = { index }
          style={{fontSize: '0.7rem'}}
          onClick={ ()=>{this.handleSelection(index)} }>
          { `${ env }` }
        </DropdownItem>
      )
    })
  }

  renderContent() {
    return (
      <div>
        <Options />
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    currenEnv: getSelectedEnvironment(state),
    currentView: getCurrentView(state)
  }
}

export default connect(mapStateToProps, {
  setSelectedEnvironment,
  setCurrentView
})(App)