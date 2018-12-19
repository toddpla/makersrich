import React, { Component } from 'react';
import PlayersListItem from './PlayersListItem'

export class PlayersList extends Component {

<<<<<<< HEAD
=======
  sortTable = (n) => {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("leaderboard-table")
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        console.log(x, y);
        if (Number(x.innerHTML) > Number(y.innerHTML)) {
          console.log("HERE");
          shouldSwitch = true;
        }
      } else if (dir == "desc") {
        if (Number(x.innerHTML) < Number(y.innerHTML)) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

handleSort = (n) => {
  this.sortTable(n)
}
>>>>>>> e51c29b0505db46bb729e30d97b6d641e185b7d6

  render() {
    return (
      <table id="leaderboard-table">
      <tbody>
        <tr className="leaderboard-table-headings">
<<<<<<< HEAD
          <th></th><th>Player</th><th>Cash</th><th>Rubies</th><th>Beans</th>
=======
          <th></th><th>Player</th><th onClick={() => this.handleSort(2)}>Cash</th><th onClick={() => this.handleSort(3)}>Rubies</th><th onClick={() => this.handleSort(4)}>Beans</th>
>>>>>>> e51c29b0505db46bb729e30d97b6d641e185b7d6
        </tr>
        {this.props.players.map((player, i) => <PlayersListItem {...player}/>)}
        </tbody>
      </table>
    );
  }
}

export default PlayersList;
