import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import Chip from '@material-ui/core/Chip'

const Filter = ({ cards, deleteCb }) => {
  console.log(cards)
  if (isEmpty(cards)) {
    return <div />
  }

  return (
    <div>
      {cards.map(data => (
        <Chip
          key={data.Id}
          label={data.Name}
          onDelete={deleteCb(data)}
        />
      ))}
    </div>
  )
}

Filter.propTypes = {
  cards: PropTypes.shape({}).isRequired,
  deleteCb: PropTypes.func.isRequired,
}

export default Filter
