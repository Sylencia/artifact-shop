import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'

import Item from '../Item'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
})

class ItemList extends PureComponent {
  render() {
    const {
      cost,
      itemList,
      items,
      classes,
    } = this.props

    const mappedItems = itemList.items.map(id => {
      const itemInfo = items.find(item => item.Id === id)
      return (
        <Item info={itemInfo} key={shortid.generate()} />
      )
    })

    const subheaderString = `${cost} gold`
    return (
      <div className={classes.root}>
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

export default withStyles(styles)(ItemList)
