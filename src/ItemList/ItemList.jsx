import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'

import Item from 'Item'
import styles from './ItemList.module.scss'

class ItemList extends PureComponent {
  render() {
    const {
      cost,
      itemList,
      items,
    } = this.props

    const mappedItems = itemList.items.map(id => {
      const itemInfo = items.find(item => item.Id === id)
      return (
        <Item info={itemInfo} key={shortid.generate()} />
      )
    })

    const subheaderString = `${cost} gold`
    return (
      <div className={styles.itemList}>
        <List
          component="nav"
          subheader={(
            <ListSubheader component="div">
              {subheaderString}
            </ListSubheader>
          )}
        >
          {mappedItems}
        </List>
      </div>
    )
  }
}

ItemList.propTypes = {
  cost: PropTypes.string.isRequired,
  itemList: PropTypes.shape().isRequired,
  items: PropTypes.shape().isRequired,
}

export default ItemList
