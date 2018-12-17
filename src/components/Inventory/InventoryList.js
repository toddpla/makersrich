import React, { Component } from 'react';
import InventoryListItem from './InventoryListItem'
import InventoryListMiscItem from './InventoryListMiscItem'

class InventoryList extends Component {

  render() {

    return (
      <div id="inventory-list-box">
        <h1>Inventory</h1>
        {this.props.inventory.ruby.map((item, i) => <InventoryListItem key={i} item={item} handleSelect={this.props.handleSelect}/>)}
        {this.props.inventory.bean.map((item, i) => <InventoryListItem key={i} item={item} handleSelect={this.props.handleSelect}/>)}
        {this.props.inventory.key.map((item, i) => <InventoryListItem key={i} item={item} handleSelect={this.props.handleSelect}/>)}
        {this.props.inventory.miscellaneous.map((item, i) => <InventoryListItem key={i} item={item} handleSelect={this.props.handleSelect}/>)}
      </div>
    );
  }
}

export default InventoryList;
