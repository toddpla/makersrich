import React, { Component } from 'react';

class InventoryListItem extends Component {

  changeMessage = () => {
    if (this.props.item.properties && this.props.item.properties[0].value) {
      this.props.handleMessage(this.props.item.properties[0].value)
    } else {
      this.props.handleMessage(`This is a ${this.props.item.type}`)
    }
  }

  render() {
    console.log(this.props.item);
    return (
      <div className="inventory-list-item" onClick={this.changeMessage}>
        <div className={this.props.item.type}></div>
      </div>
    );
  }

}

export default InventoryListItem;
