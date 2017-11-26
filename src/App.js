import React, { Component } from 'react';
import logo from './logo.svg';
import { HashRouter, Route, Link } from 'react-router-dom';
import AddData from './routes/AddData';
import './App.css';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to="/addData">Add Data</Link>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/addData" component={AddData} />
      </div>
    );
  }
}

const RoutedApp = () => (
  <HashRouter>
    <App />
  </HashRouter>
);

export default RoutedApp;
