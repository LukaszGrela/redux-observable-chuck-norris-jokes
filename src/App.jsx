import React, { Component } from 'react';
import './App.css';
import JokeControllerConnected from './components/JokeControllerConnected';
import JokesConnected from './components/JokesConnected';

import store from './store/store';
import { fetchJokes } from './store/actions/jokes-action';

class App extends Component {
  componentDidMount = () => {
    /** start fetching */
    store.dispatch(fetchJokes());
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Chuck Norris Jokes</h1>
          <JokeControllerConnected isPolling />
        </header>
        <div className="App-intro">
          <JokesConnected />
        </div>
      </div>
    );
  }
}

export default App;
