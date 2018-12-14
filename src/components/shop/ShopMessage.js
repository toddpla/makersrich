import React, { Component } from 'react';

class ShopMessage extends Component {

  render() {
    return (
      <div id="shop-message-box">
        <p>{this.props.message}</p>
        <div id="purchase-item-button" onClick={this.props.handlePurchase}
        style={{
          display: `${this.props.buttonDisplay}`
        }}>BUY</div>
      </div>
    );
  }

}

export default ShopMessage;
