import React, { Component } from 'react';

class IntermediateResults extends Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Full round text</th>
            <th>Player 1</th>
            <th>Player 2</th>
            <th>Winner</th>
            <th>Loser</th>
            <th>Game 1</th>
            <th>Game 2</th>
            <th>Game 3</th>
            <th>Game 4</th>
            <th>Game 5</th>
          </tr>
        </thead>
        <tbody>
          {this.props.sets.map(set => (
            <tr key={`${set.id}`}>
              <td>{set.roundText}</td>
              <td>{set.player1}</td>
              <td>{set.player2}</td>
              <td>{set.winner}</td>
              <td>{set.loser}</td>
              {set.games.map(game => (
                <td key={game.number}>
                  <div>
                    {game.player1} - {game.player1Character} vs  {game.player2}{' '}
                    - {game.player2Character} on {game.stage}
                  </div>
                  <div>
                    <b>{game.winner}</b> won
                  </div>
                  <div>
                    <b>{game.loser}</b> lost
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default IntermediateResults;
