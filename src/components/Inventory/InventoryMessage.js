import React, { Component } from 'react';

class InventoryMessage extends Component {

  render() {
    return (
      <div id="inventory-item-message">
        <h1>Information</h1>
        <p>{this.props.message}</p>

      </div>
    );
  }

}

export default InventoryMessage;
