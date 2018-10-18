import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import Paper from '@material-ui/core/Paper'

import Item from 'Item'
import GoldIcon from 'assets/gold.png'
import styles from './ItemList.module.scss'

class ItemList extends PureComponent {
  render() {
    const {
      cost,
      itemList,
      items,
      addCb,
    } = this.props

    const mappedItems = itemList.items.map(id => {
      const itemInfo = items.find(item => item.Id === id)
      return (
        <Item
          info={itemInfo}
          key={shortid.generate()}
          addCb={addCb}
        />
      )
    })

    return (
      <Paper className={styles.itemList}>
        <List
          dense
          component="nav"
          subheader={(
            <ListSubheader component="div">
              <img className={styles.image} src={GoldIcon} alt="gold" />
              <div className={styles.cost}>{cost}</div>
            </ListSubheader>
          )}
        >
          {mappedItems}
        </List>
      </Paper>
    )
  }
}

ItemList.propTypes = {
  cost: PropTypes.number.isRequired,
  itemList: PropTypes.shape({}).isRequired,
  items: PropTypes.array.isRequired,
  addCb: PropTypes.func.isRequired,
}

export default ItemList
