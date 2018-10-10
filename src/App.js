import React, { Component } from 'react';
import uniq from 'lodash/uniq'
import uniqWith from 'lodash/uniqWith'
import isEqual from 'lodash/isEqual'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    const consumables = [ 3, 3, 4, 5, 7, 10]
    const armor = [3,6,6,7,8,8,9,13,15,16,19,19,25]
    const weapons = [3,6,7,7,7,7,8,10,15,19,25]
    const accessories = [3,4,5,6,6,7,10,13,15,25]

    const combined = [...consumables, ...armor, ...weapons, ...accessories]
    this.costs = uniq(combined).sort((a, b) => a > b)
    this.solutions = []

    this.getPossibleOptions(22, 5)
    console.log(uniqWith(this.solutions, isEqual))
  }

  getPossibleOptions = (total, numItems, partial = []) => {
    const sum = partial.reduce((a, b) => a + b, 0)

    if(sum > total) {
      return
    }

    if(partial.length === numItems) {
      if (total === sum)
        this.solutions.push(partial.sort((a, b) => a > b))
      else {
        return
      }
    }

    for(let i = 0; i < this.costs.length; ++i) {
      this.getPossibleOptions(total, numItems, partial.concat(this.costs[i]))
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
