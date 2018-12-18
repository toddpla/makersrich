import React, { Component } from 'react';
import './Inventory.css'

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
        <div className="inventory-item-message">
          <h1>Information</h1>
          <div id="inventory-item-type"><h2>{this.getName()}</h2></div>
          <div id="inventory-item-image" className={`inventory-selected-item ${this.getType()}`}></div>
          <div className="item-message">{this.handleMessage()}</div>
        </div>
      )
    } else {
      return (
        <div className="inventory-item-message"><h2>Click on your items to see more</h2></div>
      )
    }
  }

}

export default InventoryMessage;
