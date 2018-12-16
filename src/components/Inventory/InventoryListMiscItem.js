import React, { Component } from 'react';

class InventoryListMiscItem extends Component {

  changeMessage = () => {
      this.props.handleMessage(this.props.item.properties.message)
  }

  render() {
    return (
      <div className="inventory-list-item" onClick={this.changeMessage}>
        <div className={`miscellaneous-item ${this.props.item.properties.type}`}></div>
      </div>
    );
  }

}

export default InventoryListMiscItem;
