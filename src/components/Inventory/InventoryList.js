import React, { Component } from 'react';
import InventoryListItem from './InventoryListItem'

class InventoryList extends Component {

  render() {

    return (
      <div>
        {this.props.inventory.ruby.map((item, i) => <InventoryListItem key={i} item={item} />)}
        {this.props.inventory.bean.map((item, i) => <InventoryListItem key={i} item={item} />)}
        {this.props.inventory.key.map((item, i) => <InventoryListItem key={i} item={item} />)}
      </div>
    );
  }

}

export default InventoryList;

// let newArr = [];
//
// while(allItems.length) newArr.push(allItems.splice(0,2));

// <table>
//   <tbody>
//     {newArr.map((row, i) => (
//       <tr>
//         {row.map((cell, k) => (
//           <td>
//             {cell}
//           </td>
//         ))}
//       </tr>
//     ))}
//   </tbody>
// </table>
