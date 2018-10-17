import React from 'react'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import TooltipIcon from '@material-ui/icons/Info'

import styles from './Item.module.scss'

const Item = ({ info }) => (
  <ListItem button>
    <ListItemText primary={info.Name} />
    <ListItemSecondaryAction>
      <Tooltip
        classes={{ 'tooltip': styles.tooltip }}
        placement="left"
        title={info.Abilities[0].Text}
      >
        <IconButton aria-label="Tooltip">
          <TooltipIcon />
        </IconButton>
      </Tooltip>
    </ListItemSecondaryAction>
  </ListItem>
)

Item.propTypes = {
  info: PropTypes.shape().isRequired,
}

export default Item
