const stageToName = {
  11: 'Fountain of Dreams',
  15: 'Pokemon Stadium',
  19: 'Battlefield',
  5: "Yoshi's story",
  25: 'Dream Land',
  20: 'Final Destination',
};

function parser(htmlResponse) {
  const bootstrappedDataRegex = /<script>window\.(bootstrappedData=.*?)<\/script>/g;
  const result = bootstrappedDataRegex.exec(htmlResponse);

  // this sets window.bootstrappedData
  eval('window.' + result[1]);

  const {
    CharacterStore,
    EntrantStore,
    SetStore,
  } = window.bootstrappedData.dehydratedState.context.dispatcher.stores;

  const { entrants } = EntrantStore;

  const { sets } = SetStore;
  const setObjects = Object.values(sets);

  const { character } = CharacterStore;

  const formattedSets = [];

  setObjects.forEach(set => {
    // console.log(set);

    if (!set.winnerId) {
      console.log(set);
    }

    if (!set.entrant1Id || !set.entrant2Id || !set.winnerId) {
      return null;
    }

    const games = set.games.map((game, gameIndex) => {
      const character1 =
        game.selections[set.entrant1Id].character[0].selectionValue;
      const character2 =
        game.selections[set.entrant2Id].character[0].selectionValue;

      return {
        number: gameIndex + 1,
        player1: entrants[set.entrant1Id].name,
        player1Character: character[character1].name,
        player2: entrants[set.entrant2Id].name,
        player2Character: character[character2].name,
        winner: entrants[game.winnerId].name,
        loser: entrants[game.loserId].name,
        stage: stageToName[game.stageId],
      };
    });

    formattedSets.push({
      id: set.id,
      roundText: set.fullRoundText,
      games,
      player1: entrants[set.entrant1Id].name,
      player1ID: set.entrant1Id,
      player2: entrants[set.entrant2Id].name,
      player2ID: set.entrant2Id,
      winner: entrants[set.winnerId].name,
      winnerID: set.winnerId,
      loser: entrants[set.loserId].name,
      loserID: set.loserId,
    });
  });

  return {
    sets: formattedSets,
  };
}

export default parser;
