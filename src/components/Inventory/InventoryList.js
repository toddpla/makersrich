import React, { Component } from 'react';
import InventoryListItem from './InventoryListItem'

class InventoryList extends Component {

  render() {

    return (
      <div id="inventory-list-box">
        <h1>Inventory</h1>
        {this.props.inventory.ruby.map((item, i) => <InventoryListItem key={i} item={item} handleMessage={this.props.handleMessage}/>)}
        {this.props.inventory.bean.map((item, i) => <InventoryListItem key={i} item={item} handleMessage={this.props.handleMessage}/>)}
        {this.props.inventory.key.map((item, i) => <InventoryListItem key={i} item={item} handleMessage={this.props.handleMessage}/>)}
      </div>
    );
  }

}

export default InventoryList;
