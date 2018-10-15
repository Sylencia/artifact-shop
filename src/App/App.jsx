import React, { PureComponent, Fragment } from 'react'
import TextField from '@material-ui/core/TextField'
import uniq from 'lodash/uniq'
import uniqWith from 'lodash/uniqWith'
import flatten from 'lodash/flatten'
import flattenDeep from 'lodash/flattenDeep'
import isEqual from 'lodash/isEqual'
import keyBy from 'lodash/keyBy'
import max from 'lodash/max'
import pick from 'lodash/pick'
import shortid from 'shortid'

import ItemList from '../ItemList'

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
          'Abilities',
        ]
        const items = flatten(data.Sets.map(set =>
          set.Cards.filter(isItemCard).map(
            card => pick(card, pickedFields)
          )
        ))

        const costs = uniq(items.map(item => item.GoldCost))

        const itemCostMap = keyBy(costs.map(cost => {
          const filteredItems = items.filter(item => item.GoldCost === cost)
          return {
            cost,
            items: filteredItems.map(item => item.Id),
          }
        }), 'cost')

        this.setState({
          items,
          costs,
          itemCostMap,
          readyToShow: true })
      })
  }

  getPossibleOptions = ({ total, remainingItems, partial = [], solutions, heldSolutions }) => {
    const { costs } = this.state
    const sum = partial.reduce((a, b) => a + b, 0)

    if (sum > total) {
      return
    }

    if (remainingItems === 0) {
      if (sum === Number(total)) {
        solutions.push(partial.sort((a, b) => a - b))
      } else if (sum === Number(total) - 1) {
        heldSolutions.push(partial.sort((a, b) => a - b))
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
      this.getPossibleOptions({
        total,
        remainingItems: remainingItems - 1,
        partial: partial.concat(costs[i]),
        solutions,
        heldSolutions,
      })
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
      itemCostMap,
      items,
    } = this.state

    const solutions = []
    const heldSolutions = []
    this.getPossibleOptions({
      total,
      remainingItems: cardsBought,
      solutions,
      heldSolutions,
    })

    const uniqueSolutions = uniqWith(solutions, isEqual)
    const uniqueHeldSolutions = uniqWith(heldSolutions, isEqual)
    const uniqueCosts = uniq(flattenDeep(uniqueSolutions)).sort((a, b) => a - b)

    const costDisplay = uniqueCosts.map(cost => (
      <ItemList
        cost={cost}
        itemList={itemCostMap[cost]}
        items={items}
        key={shortid.generate()}
      />
    ))

    const solutionDisplay = uniqueSolutions.map(sol =>
      <div key={shortid.generate()}>{sol.toString()}</div>
    )
    const heldSolDisplay = uniqueHeldSolutions.map(sol =>
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
        <div className={styles.costDisplay}>
          {costDisplay}
        </div>
        {`Solutions found: ${uniqueSolutions.length + uniqueHeldSolutions.length}`}
        {solutionDisplay}
        {heldSolDisplay}
      </div>
    )
  }
}

export default App
