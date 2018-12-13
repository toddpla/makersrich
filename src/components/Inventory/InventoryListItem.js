import React, { Component } from 'react';
import './InventoryListItem.css'

class InventoryListItem extends Component {

  render() {
    console.log(this.props.item);
    return (
      <div className="inventory-list-item">
        <h3>{this.props.item.type}</h3>
        <p>{this.props.item.properties && this.props.item.properties[0].value}</p>
      </div>
    );
  }

}

export default InventoryListItem;
