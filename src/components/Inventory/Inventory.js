import React from 'react'
import { connect } from 'react-redux'
import styled from "styled-components"
import InvPic from './Inventory.png'
import InventoryList from './InventoryList'

export class Inventory extends React.Component {

  render() {
    console.log(this.props.player.inventory);
    return (
      <div>
        <InventoryList inventory={this.props.player.inventory}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  player: state.auth
})

export default connect(mapStateToProps)(Inventory)
