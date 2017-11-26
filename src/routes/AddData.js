import React, { Component } from 'react';
import parser from './../parsers/smashGGParser';
import IntermediateResults from './../IntermediateResults';

class AddData extends Component {
  state = {
    loadingData: false,
    loadedData: null,
    name: '',
    url:
      'https://smash.gg/tournament/shine-2017/events/melee-singles/brackets?filter=%7B%22phaseId%22%3A146672%7D',
  };

  _onSubmit = e => {
    e.preventDefault();

    const { name, url } = this.state;

    if (!name || !url) {
      return;
    }

    this.setState({
      loadingData: true,
    });

    // https://smashdb-server.herokuapp.com/?url=${url}
    fetch(`https://smashdb-server.herokuapp.com/?url=${url}`)
      .then(response => {
        return response.text();
      })
      .then(response => {
        const parsed = parser(response);
        this.setState({
          loadingData: false,
          loadedData: {
            characters: parsed.characters,
            entrants: parsed.entrants,
            sets: parsed.sets,
          },
        });
      });
  };

  _onConfirm = () => {
    console.log('confirm!');
  };

  render() {
    const { loadingData, loadedData, name, url } = this.state;
    return (
      <div>
        {loadingData && <h1>Loading and Parsing Data</h1>}
        {!loadedData &&
        !loadingData && (
          <form>
            <div>
              <label htmlFor="name">Competition name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={e => this.setState({ name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="url">Competition url</label>
              <input
                type="text"
                id="url"
                value={url}
                onChange={e => this.setState({ url: e.target.value })}
              />
            </div>
            <div>
              <button type="submit" onClick={this._onSubmit}>
                Submit
              </button>
            </div>
          </form>
        )}
        {loadedData && (
          <section>
            <h1>Parsed data</h1>
            <div>
              <button onClick={() => this.setState({ loadedData: null })}>
                Go Back
              </button>
              <button onClick={this._onConfirm}>
                This looks good, save it to the DB
              </button>
            </div>
            <IntermediateResults
              characters={loadedData.characters}
              entrants={loadedData.entrants}
              sets={loadedData.sets}
            />
          </section>
        )}
      </div>
    );
  }
}

export default AddData;
