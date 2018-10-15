import React from 'react'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const Item = ({ info }) => (
  <ListItem button>
    <ListItemText primary={info.Name} secondary={info.Abilities[0].Text} />
  </ListItem>
)

Item.propTypes = {
  info: PropTypes.shape().isRequired,
}

export default Item
