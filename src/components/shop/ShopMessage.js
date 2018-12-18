import React, { Component } from 'react';

class ShopMessage extends Component {

  render() {
    if(this.props.item !== undefined){
      return (
        <div id="shop-message-box">
          <div id="item-type">{this.props.item.properties[0].name}</div>
          <div id="item-image" className={`shop-selected-item ${this.props.item.properties[0].type}`}></div>
          <div id="muxworthys-opinion">{this.props.item.properties[0].value}</div>
          <div id="item-price">Price: {this.props.item.properties[0].price}Cash</div>

          <div id="purchase-item-button" onClick={this.props.handlePurchase}>BUY</div>
        </div>
      )
    }
    return (
      <div id="shop-message-box">
        <div id="muxworthys-opinion">Welcome to my shop! Take a look at my fineee as wares</div>
      </div>
    )
  }
}

export default ShopMessage;
