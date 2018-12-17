import React, { Component } from 'react';

class InventoryMessage extends Component {

  handleMessage = () => {
    if (this.props.selected.properties && this.props.selected.properties[0].value) {
       return this.props.selected.properties[0].value
    } else {
      return `This is a ${this.props.selected.type}`
    }
  }

  getType = () => {
    if(this.props.selected.type === 'miscellaneous'){
      return this.props.selected.properties[0].type
    } else {
      return this.props.selected.type
    }
  }

  getName = () => {
    if(this.props.selected.type === 'miscellaneous'){
      return this.props.selected.properties[0].name
    } else {
      return this.props.selected.type
    }
  }

  render() {
    if(this.props.selected !== undefined){
      return (
        <div id="inventory-item-message">
          <h1>Information</h1>
          <div id="item-type">{this.getName()}</div>
          <div id="item-image" className={`shop-selected-item ${this.getType()}`}></div>
          <div>{this.handleMessage()}</div>
        </div>
      )
    } else {
      return (
        <div id="inventory-item-message">This is your inventory</div>
      )
    }
  }

}

export default InventoryMessage;
