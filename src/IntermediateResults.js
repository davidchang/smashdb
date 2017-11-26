import React, { Component } from 'react';

const stageToName = {
  11: 'Fountain of Dreams',
  15: 'Pokemon Stadium',
  19: 'Battlefield',
  5: "Yoshi's story",
  25: 'Dream Land',
  20: 'Final Destination',
};

class IntermediateResults extends Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Full round text</th>
            <th>Game #</th>
            <th>Player 1</th>
            <th>Player 1 character</th>
            <th>Player 2</th>
            <th>Player 2 character</th>
            <th>Winner</th>
            <th>Loser</th>
            <th>Stage</th>
          </tr>
        </thead>
        <tbody>
          {this.props.sets.map(set => {
            if (!set.winnerId) {
              console.log(set);
            }

            if (!set.entrant1Id || !set.entrant2Id || !set.winnerId) {
              return null;
            }

            return set.games.map((game, gameIndex) => {
              const character1 =
                game.selections[set.entrant1Id].character[0].selectionValue;
              const character2 =
                game.selections[set.entrant2Id].character[0].selectionValue;

              return (
                <tr id={`${set.id}:${gameIndex}`}>
                  <td>{set.fullRoundText}</td>
                  <td>Game {gameIndex + 1}</td>
                  <td>{this.props.entrants[set.entrant1Id].name}</td>
                  <td>{this.props.characters[character1].name}</td>
                  <td>{this.props.entrants[set.entrant2Id].name}</td>
                  <td>{this.props.characters[character2].name}</td>
                  <td>{this.props.entrants[game.winnerId].name}</td>
                  <td>{this.props.entrants[game.loserId].name}</td>
                  <td>{stageToName[game.stageId]}</td>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    );
  }
}

export default IntermediateResults;
