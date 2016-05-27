import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function truncate(num, decimalPoint) {
  return Math.floor(num * 100 * (10 ** decimalPoint)) / (10 ** decimalPoint);
}

function EntityListItem({name, id, entityScore, toggleFollow, following}) {
  return (
    <div className='row'>
      <Link to={'/entities/' + id}>
        <div className='ten columns'>
        <div className='round-btn'>{name}</div>
        </div>
      </Link>
      <div className='two columns'>
        <span>{truncate(entityScore, 2)}</span>
        <i className='fa fa-plus fa-lg pull-right' style={{
          color: following[id] ? 'black' : 'lightgray',
        }} ariaHidden='true' onClick={ _ => toggleFollow(id)}></i>
      </div>
    </div>
    );
}

EntityListItem.PropTypes = {
  name: PropTypes.string.isRequired,
  entityScore: PropTypes.number.isRequired,
};

export default EntityListItem;