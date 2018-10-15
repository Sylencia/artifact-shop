import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'

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
  state = {
    isOpen: true,
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.isOpen }))
  }

  render() {
    const { cost, itemList, classes } = this.props
    const { isOpen } = this.state

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
          <ListItem button>
            <ListItemText inset primary="Sent mail" />
          </ListItem>
          <ListItem button>
            <ListItemText inset primary="Drafts" />
          </ListItem>
          <ListItem button onClick={this.handleClick}>
            <ListItemText inset primary="Inbox" />
          </ListItem>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Starred" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
    )
  }
}

ItemList.propTypes = {
  cost: PropTypes.string.isRequired,
  itemList: PropTypes.shape().isRequired,
}

export default withStyles(styles)(ItemList)
