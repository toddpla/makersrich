import React, { Component } from 'react';
import { connect } from 'react-redux'
import { startAddInventoryItem } from '../../actions/auth'
import './shop.css'

import ShopList from './ShopList'
import ShopMessage from './ShopMessage'

class Shop extends Component {

  constructor(props) {
    super(props)
    this.state = {
      message: undefined,
      selected: undefined,
      buttonDisplay: 'none'
    }
  }

  handlePurchase = () => {
    console.log(this.state.selected);
    startAddInventoryItem(this.state.selected.type, this.state.selected)
  }

  handleSelect = (item) => {
    this.setState({
      message: item.properties[0].value,
      selected: item,
      buttonDisplay: ''
    })
  }

  render() {
    return (
      <div id="muxworthys-bonanza">
        <div className="popup-header">Welcome to Muxworthy's General Store!</div>
        <ShopList inventory={this.props.shop.inventory} handleSelect={this.handleSelect}/>
        <ShopMessage message={this.state.message} buttonDisplay={this.state.buttonDisplay} handlePurchase={this.handlePurchase}/>
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => ({
  startAddInventoryItem: (itemRef, item) => dispatch(startAddInventoryItem(itemRef,item))
})

const mapStateToProps = (state) => ({
  player: state.auth,
  shop: state.shop
})

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
