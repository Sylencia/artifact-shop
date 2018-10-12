import React, { PureComponent, Fragment } from 'react'
import TextField from '@material-ui/core/TextField'
import uniq from 'lodash/uniq'
import uniqWith from 'lodash/uniqWith'
import flatten from 'lodash/flatten'
import isEqual from 'lodash/isEqual'
import max from 'lodash/max'
import pick from 'lodash/pick'
import shortid from 'shortid'

import styles from './App.module.scss'

class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      total: 20,
      cardsBought: 3,
      costs: [],
      readyToShow: false,
    }
  }

  componentDidMount() {
    // Grab the manifest and find the items
    fetch('https://raw.githubusercontent.com/ottah/ArtifactDB/master/cards-manifest.json')
      .then(response => response.json())
      .then(data => {
        const isItemCard = card => card.Color === 'Yellow' && card.GoldCost > 0
        const pickedFields = [
          'Id',
          'Name',
          'ItemType',
          'GoldCost',
        ]
        const items = flatten(data.Sets.map(set =>
          set.Cards.filter(isItemCard).map(
            card => pick(card, pickedFields)
          )
        ))

        const costs = uniq(items.map(item => item.GoldCost))

        this.setState({
          items,
          costs,
          readyToShow: true })
      })
  }

  getPossibleOptions = (total, remainingItems, partial = []) => {
    const { costs } = this.state
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

    // No need to continue if you can't reach the remaining total
    // by putting in the most expensive cards. +1 is to account for hold
    if (total - sum > remainingItems * max(costs) + 1) {
      return
    }

    for (let i = 0; i < costs.length; ++i) {
      this.getPossibleOptions(total, remainingItems - 1, partial.concat(costs[i]))
    }
  }

  onTextChange = name => e => {
    this.setState({ [name]: e.target.value })
  }

  render() {
    const {
      total,
      cardsBought,
      readyToShow,
    } = this.state

    this.solutions = []
    this.heldSolutions = []
    this.getPossibleOptions(total, cardsBought)

    const solutions = uniqWith(this.solutions, isEqual)
    const heldSolutions = uniqWith(this.heldSolutions, isEqual)

    const solutionDisplay = solutions.map(sol =>
      <div key={shortid.generate()}>{sol.toString()}</div>
    )
    const heldSolDisplay = heldSolutions.map(sol =>
      <div key={shortid.generate()}>{`${sol.toString()} + Hold`}</div>
    )
    return (
      <div className={styles.app}>
        <div className={styles.appHeader}>
          { readyToShow ? (
            <Fragment>
              <TextField
                type="text"
                value={total}
                onChange={this.onTextChange('total')}
                label="Total cost"
                variant="outlined"
                className={styles.textField}
              />
              <TextField
                type="text"
                value={cardsBought}
                onChange={this.onTextChange('cardsBought')}
                label="Cards bought"
                variant="outlined"
                className={styles.textField}
              />
            </Fragment>
          ) : (
            <Fragment>Loading...</Fragment>
          )}
        </div>
        {`Solutions found: ${solutions.length + heldSolutions.length}`}
        {solutionDisplay}
        {heldSolDisplay}
      </div>
    )
  }
}

export default App
