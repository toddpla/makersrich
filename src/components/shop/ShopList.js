import React, { Component } from 'react';
import ShopItem from './ShopItem'


class ShopList extends Component {

  render() {
    return (
      <div id="shop-list-box">
      {this.props.inventory.map((item, i) => <ShopItem key={i} item={item} handleSelect={this.props.handleSelect}/>)}
      </div>
    );
  }

}

export default ShopList;
