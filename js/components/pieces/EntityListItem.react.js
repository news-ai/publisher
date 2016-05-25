import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function truncate(num, decimalPoint) {
  return Math.floor(num * 100 * (10 ** decimalPoint)) / (10 ** decimalPoint);
}

function EntityListItem({name, id, entityScore}) {
  return (
    <Link to={'/entities/' + id}>
      <div className='row entity-item'>
        <span className='ten columns'>{name}</span>
        <span className='two columns'>{truncate(entityScore, 2)}</span>
      </div>
    </Link>
    );
}

EntityListItem.PropTypes = {
  name: PropTypes.string.isRequired,
  entityScore: PropTypes.number.isRequired,
};

export default EntityListItem;