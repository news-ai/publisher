import React, { PropTypes } from 'react';
import { Link } from 'react-router';
// import { connect } from 'react-redux';

function truncate(num, decimalPoint) {
  return Math.floor(num * 100 * (10 ** decimalPoint)) / (10 ** decimalPoint);
}

function Entity({name, entityScore}) {
  return (
    <div className='row'>
      <span className='ten columns'>{name}</span>
      <span className='two columns'>{truncate(entityScore, 2)}</span>
    </div>
    );
}

// EntityList.PropTypes = {
//   id: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   url: PropTypes.string.isRequired,
//   header_image: PropTypes.string.isRequired,
//   basic_summary: PropTypes.array.isRequired,
// };

export default Entity;