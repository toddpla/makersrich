import React from 'react'
import { connect } from 'react-redux'

import InventoryList from './InventoryList'
import InventoryMessage from './InventoryMessage'

export class Inventory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: undefined
    }
  }

  handleMessage = (message) => {
    this.setState({message: message})
  }

  render() {
    return (
      <div id="inventory-box">
        <InventoryList inventory={this.props.player.inventory} handleMessage={this.handleMessage}/>
        <InventoryMessage message={this.state.message} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  player: state.auth
})

export default connect(mapStateToProps)(Inventory)
