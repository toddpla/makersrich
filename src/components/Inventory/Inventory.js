import React from 'react'
import { connect } from 'react-redux'

import InventoryList from './InventoryList'
import InventoryMessage from './InventoryMessage'

export class Inventory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: undefined
    }
  }

  handleSelect = (item) => {
    this.setState({selected: item})
    console.log(this.state);
  }

  render() {
    return (
      <div id="inventory-box">
        <InventoryList inventory={this.props.player.inventory} handleSelect={this.handleSelect}/>
        <InventoryMessage selected={this.state.selected} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  player: state.auth
})

export default connect(mapStateToProps)(Inventory)
