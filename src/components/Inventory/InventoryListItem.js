import React, { Component } from 'react';

class InventoryListItem extends Component {

  changeSelect = () => {
    this.props.handleSelect(this.props.item)
  }

  getType = () => {
    if(this.props.item.type === 'miscellaneous'){
      return this.props.item.properties[0].type + " miscellaneous-item"
    } else {
      return this.props.item.type
    }
  }

  render() {
    return (
      <div className="inventory-list-item" onClick={this.changeSelect}>
        <div className={this.getType()}></div>
      </div>
    );
  }

}

export default InventoryListItem;
