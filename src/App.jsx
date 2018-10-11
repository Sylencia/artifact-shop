import React, { PureComponent } from 'react'
import uniq from 'lodash/uniq'
import uniqWith from 'lodash/uniqWith'
import isEqual from 'lodash/isEqual'
import max from 'lodash/max'
import shortid from 'shortid'

import logo from './logo.svg'
import './App.css'

class App extends PureComponent {
  constructor(props) {
    super(props)

    this.solutions = []
    this.heldSolutions = []
    const consumables = [3, 3, 4, 5, 7, 10]
    const armor = [3, 6, 6, 7, 8, 8, 9, 13, 15, 16, 19, 19, 25]
    const weapons = [3, 6, 7, 7, 7, 7, 8, 10, 15, 19, 25]
    const accessories = [3, 4, 5, 6, 6, 7, 10, 13, 15, 25]

    const combined = [...consumables, ...armor, ...weapons, ...accessories]
    this.costs = uniq(combined).sort((a, b) => a > b)
    this.maxCost = max(this.costs)

    this.state = {
      total: 20,
      items: 3,
    }
  }

  componentDidMount() {
    // Grab the manifest
    fetch('https://raw.githubusercontent.com/ottah/ArtifactDB/master/cards-manifest.json')
      .then(response => response.json())
      .then(data => this.setState({ data }))
  }

  componentDidUpdate

  getPossibleOptions = (total, remainingItems, partial = []) => {
    const sum = partial.reduce((a, b) => a + b, 0)

    if (sum > total) {
      return
    }

    if (remainingItems === 0) {
      if (sum === Number(total)) {
        this.solutions.push(partial.sort((a, b) => a > b))
      } else if (sum === Number(total) - 1) {
        this.heldSolutions.push(partial.sort((a, b) => a > b))
      } else {
        return
      }
    }

    if (total - sum > remainingItems * this.maxCost) {
      return
    }

    for (let i = 0; i < this.costs.length; ++i) {
      this.getPossibleOptions(total, remainingItems - 1, partial.concat(this.costs[i]))
    }
  }

  onTotalChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { total, items } = this.state

    this.solutions = []
    this.heldSolutions = []
    this.getPossibleOptions(total, items)

    const solutions = uniqWith(this.solutions, isEqual)
    const heldSolutions = uniqWith(this.heldSolutions, isEqual)

    const solutionDisplay = solutions.map(sol => <div key={shortid.generate()}>{sol.toString()}</div>)
    const heldSolDisplay = heldSolutions.map(sol => <div key={shortid.generate()}>{`${sol.toString()} + Hold`}</div>)
    return (
      <div className="App">
        <div className="App-header">
          <input type="text" value={total} name="total" onChange={this.onTotalChange} />
          <input type="text" value={items} name="items" onChange={this.onTotalChange} />
          {`Solutions found: ${solutions.length + heldSolutions.length}`}
          {solutionDisplay}
          {heldSolDisplay}
        </div>
      </div>
    )
  }
}

export default App
