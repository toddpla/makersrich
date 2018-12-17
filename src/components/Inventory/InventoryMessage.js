import React, { Component } from 'react';

class InventoryMessage extends Component {

  handleMessage = () => {
    if(this.props.selected === undefined){
      return
    }
    if(this.props.selected.type === 'miscellaneous'){
      return console.log(this.props.selected);
      // return this.props.selected.properties[0].value
    }
    if (this.props.selected.properties && this.props.selected.properties[0].value) {
       return this.props.selected.properties[0].value
    } else {
      return `This is a ${this.props.selected.type}`
    }
  }

  render() {
    return (
      <div id="inventory-item-message">
        <h1>Information</h1>
        <p>{this.handleMessage()}</p>
      </div>
    );
  }

}

export default InventoryMessage;
