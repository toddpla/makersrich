import React, { Component } from 'react';

class ShopMessage extends Component {

  hasEnoughMoney = (price) => {
    return this.props.cash > price
  }

  render() {
    if(this.props.item !== undefined){
      return (
        <div id="shop-message-box">
          <div id="item-type">{this.props.item.properties[0].name}</div>
          <div id="item-image" className={`shop-selected-item ${this.props.item.properties[0].type}`}></div>
          <div id="muxworthys-opinion">{this.props.item.properties[0].value}</div>
          <div id="item-price">Price: {this.props.item.properties[0].price}Cash</div>
          {
            this.hasEnoughMoney(this.props.item.properties[0].price) ?
            <div id="purchase-item-button" onClick={this.props.handlePurchase}>BUY</div> :
            <div id="no-money-message">YOU GOT NO MONEY, BETTER GO DIGGIN'</div>
          }

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
