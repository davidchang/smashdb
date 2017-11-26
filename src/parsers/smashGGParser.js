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

  return {
    characters: character,
    entrants,
    sets: setObjects,
  };
}

export default parser;
