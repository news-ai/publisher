import React, { PropTypes } from 'react';
import { Link } from 'react-router';
// import { connect } from 'react-redux';

function truncate(num, decimalPoint) {
  return Math.floor(num * 100 * (10 ** decimalPoint)) / (10 ** decimalPoint);
}

function EntityListItem({name, main_type, entityScore}) {
  return (
    <div className='row entity-item'>
      <span className='eight columns'>{name}</span>
      <span className='two columns'>{main_type}</span>
      <span className='two columns'>{truncate(entityScore, 2)}</span>
    </div>
    );
}

EntityListItem.PropTypes = {
  name: PropTypes.string.isRequired,
  main_type: PropTypes.string.isRequired,
  entityScore: PropTypes.number.isRequired,
};

export default EntityListItem;